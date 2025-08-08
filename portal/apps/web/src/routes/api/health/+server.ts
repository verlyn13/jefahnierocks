import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/server/db';

export const GET: RequestHandler = async () => {
	const rawUrl = process.env.TURSO_DATABASE_URL;
	const rawToken = process.env.TURSO_AUTH_TOKEN;
	const hasDbUrl = !!rawUrl;
	const hasAuthToken = !!rawToken;
	const urlLength = rawUrl?.length || 0;
	const tokenLength = rawToken?.length || 0;
	const urlStartsWith = rawUrl?.substring(0, 10) || 'undefined';
	const urlEndsWith = rawUrl ? rawUrl.substring(Math.max(0, rawUrl.length - 5)) : 'undefined';
	const urlHasWhitespace = rawUrl !== rawUrl?.trim();
	const tokenHasWhitespace = rawToken !== rawToken?.trim();
	const nodeEnv = process.env.NODE_ENV;
	
	let dbError = null;
	let dbConnected = false;
	
	try {
		const db = getDb();
		await db.execute('SELECT 1');
		dbConnected = true;
	} catch (error) {
		dbError = error?.message || 'Unknown error';
	}
	
	return json({
		status: 'checking',
		env: {
			NODE_ENV: nodeEnv,
			hasDbUrl,
			hasAuthToken,
			urlLength,
			tokenLength,
			urlStartsWith,
			urlEndsWith,
			urlHasWhitespace,
			tokenHasWhitespace
		},
		db: {
			connected: dbConnected,
			error: dbError
		}
	});
};