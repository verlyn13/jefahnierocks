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
		client: {start:"_app/immutable/entry/start.B4SXjR0T.js",app:"_app/immutable/entry/app.CpGpB739.js",imports:["_app/immutable/entry/start.B4SXjR0T.js","_app/immutable/chunks/CzE9q_nh.js","_app/immutable/chunks/-m8yyuFF.js","_app/immutable/chunks/Dqv5hy1p.js","_app/immutable/entry/app.CpGpB739.js","_app/immutable/chunks/Dp1pzeXC.js","_app/immutable/chunks/Dqv5hy1p.js","_app/immutable/chunks/-m8yyuFF.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CUNwvT8l.js","_app/immutable/chunks/DT6yfO3p.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
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
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/enter",
				pattern: /^\/enter\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/spaces",
				pattern: /^\/spaces\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/verify",
				pattern: /^\/verify\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
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
