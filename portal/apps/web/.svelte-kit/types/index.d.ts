type DynamicRoutes = {
	
};

type Layouts = {
	"/(app)": undefined;
	"/": undefined;
	"/api": undefined;
	"/api/auth": undefined;
	"/api/auth/check": undefined;
	"/api/auth/register": undefined;
	"/api/webauthn": undefined;
	"/api/webauthn/login": undefined;
	"/api/webauthn/login/finish": undefined;
	"/api/webauthn/login/start": undefined;
	"/api/webauthn/register": undefined;
	"/api/webauthn/register/finish": undefined;
	"/api/webauthn/register/start": undefined;
	"/enroll": undefined;
	"/enter": undefined;
	"/spaces": undefined;
	"/verify": undefined
};

export type RouteId = "/(app)" | "/" | "/api" | "/api/auth" | "/api/auth/check" | "/api/auth/register" | "/api/webauthn" | "/api/webauthn/login" | "/api/webauthn/login/finish" | "/api/webauthn/login/start" | "/api/webauthn/register" | "/api/webauthn/register/finish" | "/api/webauthn/register/start" | "/enroll" | "/enter" | "/spaces" | "/verify";

export type RouteParams<T extends RouteId> = T extends keyof DynamicRoutes ? DynamicRoutes[T] : Record<string, never>;

export type LayoutParams<T extends RouteId> = Layouts[T] | Record<string, never>;

export type Pathname = "/" | "/api" | "/api/auth" | "/api/auth/check" | "/api/auth/register" | "/api/webauthn" | "/api/webauthn/login" | "/api/webauthn/login/finish" | "/api/webauthn/login/start" | "/api/webauthn/register" | "/api/webauthn/register/finish" | "/api/webauthn/register/start" | "/enroll" | "/enter" | "/spaces" | "/verify";

export type ResolvedPathname = `${"" | `/${string}`}${Pathname}`;

export type Asset = "/CNAME" | "/favicon.svg";