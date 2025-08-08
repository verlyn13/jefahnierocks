export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["CNAME","favicon.svg"]),
	mimeTypes: {".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.CSY4SAwy.js",app:"_app/immutable/entry/app.By0pVdsJ.js",imports:["_app/immutable/entry/start.CSY4SAwy.js","_app/immutable/chunks/DNltEPI8.js","_app/immutable/chunks/DjZzcfPQ.js","_app/immutable/chunks/gpp4IOM_.js","_app/immutable/chunks/C6Dy3d1M.js","_app/immutable/entry/app.By0pVdsJ.js","_app/immutable/chunks/Dp1pzeXC.js","_app/immutable/chunks/gpp4IOM_.js","_app/immutable/chunks/DjZzcfPQ.js","_app/immutable/chunks/C6Dy3d1M.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xhIG3T10.js","_app/immutable/chunks/Bvt_Lap0.js","_app/immutable/chunks/Drr5YdnY.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/auth/check",
				pattern: /^\/api\/auth\/check\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/check/_server.ts.js'))
			},
			{
				id: "/api/auth/logout",
				pattern: /^\/api\/auth\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/logout/_server.ts.js'))
			},
			{
				id: "/api/auth/magic-link",
				pattern: /^\/api\/auth\/magic-link\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/magic-link/_server.ts.js'))
			},
			{
				id: "/api/auth/magic-verify",
				pattern: /^\/api\/auth\/magic-verify\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/magic-verify/_server.ts.js'))
			},
			{
				id: "/api/auth/me",
				pattern: /^\/api\/auth\/me\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/me/_server.ts.js'))
			},
			{
				id: "/api/auth/passkeys",
				pattern: /^\/api\/auth\/passkeys\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/passkeys/_server.ts.js'))
			},
			{
				id: "/api/auth/recovery",
				pattern: /^\/api\/auth\/recovery\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/recovery/_server.ts.js'))
			},
			{
				id: "/api/auth/register",
				pattern: /^\/api\/auth\/register\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/register/_server.ts.js'))
			},
			{
				id: "/api/health",
				pattern: /^\/api\/health\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/health/_server.ts.js'))
			},
			{
				id: "/api/spaces/[spaceId]/messages",
				pattern: /^\/api\/spaces\/([^/]+?)\/messages\/?$/,
				params: [{"name":"spaceId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/spaces/_spaceId_/messages/_server.ts.js'))
			},
			{
				id: "/api/spaces/[spaceId]/promises",
				pattern: /^\/api\/spaces\/([^/]+?)\/promises\/?$/,
				params: [{"name":"spaceId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/spaces/_spaceId_/promises/_server.ts.js'))
			},
			{
				id: "/api/webauthn/login/finish",
				pattern: /^\/api\/webauthn\/login\/finish\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/webauthn/login/finish/_server.ts.js'))
			},
			{
				id: "/api/webauthn/login/start",
				pattern: /^\/api\/webauthn\/login\/start\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/webauthn/login/start/_server.ts.js'))
			},
			{
				id: "/api/webauthn/register/finish",
				pattern: /^\/api\/webauthn\/register\/finish\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/webauthn/register/finish/_server.ts.js'))
			},
			{
				id: "/api/webauthn/register/start",
				pattern: /^\/api\/webauthn\/register\/start\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/webauthn/register/start/_server.ts.js'))
			},
			{
				id: "/auth/magic",
				pattern: /^\/auth\/magic\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/enroll",
				pattern: /^\/enroll\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/enter",
				pattern: /^\/enter\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/recovery",
				pattern: /^\/recovery\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(app)/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(app)/spaces",
				pattern: /^\/spaces\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(app)/space/[slug]",
				pattern: /^\/space\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/verify",
				pattern: /^\/verify\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
