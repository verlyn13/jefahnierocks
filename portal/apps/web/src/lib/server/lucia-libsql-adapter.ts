import type { Adapter, DatabaseSession, DatabaseUser } from "lucia";
import type { Client } from "@libsql/client";

export class LibsqlAdapter implements Adapter {
	private client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	async deleteSession(sessionId: string): Promise<void> {
		await this.client.execute({
			sql: "DELETE FROM session WHERE id = ?",
			args: [sessionId]
		});
	}

	async deleteUserSessions(userId: string): Promise<void> {
		await this.client.execute({
			sql: "DELETE FROM session WHERE user_id = ?",
			args: [userId]
		});
	}

	async getSessionAndUser(
		sessionId: string
	): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
		const result = await this.client.execute({
			sql: `SELECT 
				s.id as session_id, 
				s.user_id, 
				s.expires_at,
				u.id as user_id,
				u.email,
				u.name
			FROM session s
			INNER JOIN user u ON s.user_id = u.id
			WHERE s.id = ?`,
			args: [sessionId]
		});

		if (result.rows.length === 0) {
			return [null, null];
		}

		const row = result.rows[0];
		
		const session: DatabaseSession = {
			id: row.session_id as string,
			userId: row.user_id as string,
			expiresAt: new Date(row.expires_at as string),
			attributes: {}
		};

		const user: DatabaseUser = {
			id: row.user_id as string,
			attributes: {
				email: row.email as string,
				name: row.name as string
			}
		};

		return [session, user];
	}

	async getUserSessions(userId: string): Promise<DatabaseSession[]> {
		const result = await this.client.execute({
			sql: "SELECT * FROM session WHERE user_id = ?",
			args: [userId]
		});

		return result.rows.map((row) => ({
			id: row.id as string,
			userId: row.user_id as string,
			expiresAt: new Date(row.expires_at as string),
			attributes: {}
		}));
	}

	async setSession(session: DatabaseSession): Promise<void> {
		await this.client.execute({
			sql: "INSERT INTO session (id, user_id, expires_at) VALUES (?, ?, ?)",
			args: [
				session.id,
				session.userId,
				session.expiresAt.toISOString()
			]
		});
	}

	async updateSessionExpiration(
		sessionId: string,
		expiresAt: Date
	): Promise<void> {
		await this.client.execute({
			sql: "UPDATE session SET expires_at = ? WHERE id = ?",
			args: [expiresAt.toISOString(), sessionId]
		});
	}

	async deleteExpiredSessions(): Promise<void> {
		await this.client.execute({
			sql: "DELETE FROM session WHERE expires_at < ?",
			args: [new Date().toISOString()]
		});
	}
}