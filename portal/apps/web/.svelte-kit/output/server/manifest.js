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
		client: {start:"_app/immutable/entry/start.a6YKIiM3.js",app:"_app/immutable/entry/app.JayedpDV.js",imports:["_app/immutable/entry/start.a6YKIiM3.js","_app/immutable/chunks/m0gLTz_v.js","_app/immutable/chunks/BHMwHsqE.js","_app/immutable/chunks/CDWPIt_c.js","_app/immutable/entry/app.JayedpDV.js","_app/immutable/chunks/BjAhemba.js","_app/immutable/chunks/CDWPIt_c.js","_app/immutable/chunks/BHMwHsqE.js","_app/immutable/chunks/Bzak7iHL.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
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
