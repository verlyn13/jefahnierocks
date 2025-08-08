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
		client: {start:"_app/immutable/entry/start.CyP7drSi.js",app:"_app/immutable/entry/app.C9cR3jiL.js",imports:["_app/immutable/entry/start.CyP7drSi.js","_app/immutable/chunks/B2YQ2Lh6.js","_app/immutable/chunks/BG-_DFpo.js","_app/immutable/chunks/DNCvQT6k.js","_app/immutable/chunks/CGy5WkS1.js","_app/immutable/entry/app.C9cR3jiL.js","_app/immutable/chunks/CEGKcvF7.js","_app/immutable/chunks/DNCvQT6k.js","_app/immutable/chunks/C3-GYWKS.js","_app/immutable/chunks/BG-_DFpo.js","_app/immutable/chunks/CGy5WkS1.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/6KRrRGw_.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/(app)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 3 },
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
				id: "/api/auth/register",
				pattern: /^\/api\/auth\/register\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/register/_server.ts.js'))
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
				id: "/enroll",
				pattern: /^\/enroll\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/enter",
				pattern: /^\/enter\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/spaces",
				pattern: /^\/spaces\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/verify",
				pattern: /^\/verify\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
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
