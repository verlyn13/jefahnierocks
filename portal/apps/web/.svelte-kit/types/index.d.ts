type DynamicRoutes = {
	"/api/spaces/[spaceId]": { spaceId: string };
	"/api/spaces/[spaceId]/messages": { spaceId: string };
	"/api/spaces/[spaceId]/promises": { spaceId: string };
	"/(app)/space/[slug]": { slug: string }
};

type Layouts = {
	"/(app)": { slug?: string };
	"/": { spaceId?: string; slug?: string };
	"/.vercel": undefined;
	"/api": { spaceId?: string };
	"/api/auth": undefined;
	"/api/auth/check": undefined;
	"/api/auth/logout": undefined;
	"/api/auth/magic-link": undefined;
	"/api/auth/magic-verify": undefined;
	"/api/auth/me": undefined;
	"/api/auth/passkeys": undefined;
	"/api/auth/recovery": undefined;
	"/api/auth/register": undefined;
	"/api/health": undefined;
	"/api/spaces": { spaceId?: string };
	"/api/spaces/[spaceId]": { spaceId: string };
	"/api/spaces/[spaceId]/messages": { spaceId: string };
	"/api/spaces/[spaceId]/promises": { spaceId: string };
	"/api/webauthn": undefined;
	"/api/webauthn/login": undefined;
	"/api/webauthn/login/finish": undefined;
	"/api/webauthn/login/start": undefined;
	"/api/webauthn/register": undefined;
	"/api/webauthn/register/finish": undefined;
	"/api/webauthn/register/start": undefined;
	"/auth": undefined;
	"/auth/magic": undefined;
	"/enroll": undefined;
	"/enter": undefined;
	"/recovery": undefined;
	"/(app)/settings": undefined;
	"/(app)/spaces": undefined;
	"/(app)/space": { slug?: string };
	"/(app)/space/[slug]": { slug: string };
	"/verify": undefined
};

export type RouteId = "/(app)" | "/" | "/.vercel" | "/api" | "/api/auth" | "/api/auth/check" | "/api/auth/logout" | "/api/auth/magic-link" | "/api/auth/magic-verify" | "/api/auth/me" | "/api/auth/passkeys" | "/api/auth/recovery" | "/api/auth/register" | "/api/health" | "/api/spaces" | "/api/spaces/[spaceId]" | "/api/spaces/[spaceId]/messages" | "/api/spaces/[spaceId]/promises" | "/api/webauthn" | "/api/webauthn/login" | "/api/webauthn/login/finish" | "/api/webauthn/login/start" | "/api/webauthn/register" | "/api/webauthn/register/finish" | "/api/webauthn/register/start" | "/auth" | "/auth/magic" | "/enroll" | "/enter" | "/recovery" | "/(app)/settings" | "/(app)/spaces" | "/(app)/space" | "/(app)/space/[slug]" | "/verify";

export type RouteParams<T extends RouteId> = T extends keyof DynamicRoutes ? DynamicRoutes[T] : Record<string, never>;

export type LayoutParams<T extends RouteId> = Layouts[T] | Record<string, never>;

export type Pathname = "/" | "/.vercel" | "/api" | "/api/auth" | "/api/auth/check" | "/api/auth/logout" | "/api/auth/magic-link" | "/api/auth/magic-verify" | "/api/auth/me" | "/api/auth/passkeys" | "/api/auth/recovery" | "/api/auth/register" | "/api/health" | "/api/spaces" | `/api/spaces/${string}` & {} | `/api/spaces/${string}/messages` & {} | `/api/spaces/${string}/promises` & {} | "/api/webauthn" | "/api/webauthn/login" | "/api/webauthn/login/finish" | "/api/webauthn/login/start" | "/api/webauthn/register" | "/api/webauthn/register/finish" | "/api/webauthn/register/start" | "/auth" | "/auth/magic" | "/enroll" | "/enter" | "/recovery" | "/settings" | "/spaces" | "/space" | `/space/${string}` & {} | "/verify";

export type ResolvedPathname = `${"" | `/${string}`}${Pathname}`;

export type Asset = "/CNAME" | "/favicon.svg";