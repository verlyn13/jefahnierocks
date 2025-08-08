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
		client: {start:"_app/immutable/entry/start.C4hU8_vQ.js",app:"_app/immutable/entry/app.DxTqNqpS.js",imports:["_app/immutable/entry/start.C4hU8_vQ.js","_app/immutable/chunks/BtP-D3gF.js","_app/immutable/chunks/BHMwHsqE.js","_app/immutable/chunks/CDWPIt_c.js","_app/immutable/entry/app.DxTqNqpS.js","_app/immutable/chunks/BjAhemba.js","_app/immutable/chunks/CDWPIt_c.js","_app/immutable/chunks/BHMwHsqE.js","_app/immutable/chunks/Bzak7iHL.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
