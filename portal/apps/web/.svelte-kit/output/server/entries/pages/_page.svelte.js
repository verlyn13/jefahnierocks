import { F as noop, J as sanitize_props, K as rest_props, A as push, M as fallback, N as ensure_array_like, O as spread_attributes, P as clsx, Q as element, E as slot, R as bind_props, D as pop, S as spread_props, T as attr, I as escape_html, U as sanitize_slots, B as setContext, V as attr_style, W as copy_payload, X as assign_payload, Y as store_get, Z as attr_class, _ as stringify, $ as unsubscribe_stores } from "../../chunks/index2.js";
import { r as readable, w as writable, d as derived } from "../../chunks/index.js";
import { nanoid } from "nanoid";
import "clsx";
function createEventDispatcher() {
  return noop;
}
const pillars = [
  { id: "build", name: "Build", hue: 198, weight: 1 },
  { id: "research", name: "Research", hue: 271, weight: 1 },
  { id: "teach", name: "Teach", hue: 340, weight: 0.9 },
  { id: "ops", name: "Ops", hue: 45, weight: 0.8 },
  { id: "people", name: "People", hue: 160, weight: 0.7 }
];
const nodes = Array.from({ length: 28 }).map((_, i) => ({
  id: nanoid(6),
  pillarId: pillars[i % pillars.length].id,
  title: ["Docs", "Workflow", "Dataset", "Space", "Thread"][i % 5] + " " + (i + 1),
  kind: ["doc", "app", "data", "space", "thread"][i % 5],
  activity: Math.random(),
  updatedAt: Date.now() - Math.floor(Math.random() * 1e7)
}));
const rituals = [
  { id: "start-day", label: "Start Day", filter: { minActivity: 0.2 } },
  { id: "ship-review", label: "Ship Review", filter: { kinds: ["app", "doc"] } },
  { id: "deep-work", label: "Deep Work", filter: { pillars: ["build", "research"] } }
];
/**
 * @license lucide-svelte v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function Icon($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "name",
    "color",
    "size",
    "strokeWidth",
    "absoluteStrokeWidth",
    "iconNode"
  ]);
  push();
  let name = fallback($$props["name"], void 0);
  let color = fallback($$props["color"], "currentColor");
  let size = fallback($$props["size"], 24);
  let strokeWidth = fallback($$props["strokeWidth"], 2);
  let absoluteStrokeWidth = fallback($$props["absoluteStrokeWidth"], false);
  let iconNode = fallback($$props["iconNode"], () => [], true);
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && array.indexOf(className) === index;
  }).join(" ");
  const each_array = ensure_array_like(iconNode);
  $$payload.out.push(`<svg${spread_attributes(
    {
      ...defaultAttributes,
      ...$$restProps,
      width: size,
      height: size,
      stroke: color,
      "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      class: clsx(mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$sanitized_props.class))
    },
    null,
    void 0,
    void 0,
    3
  )}><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let [tag, attrs] = each_array[$$index];
    element($$payload, tag, () => {
      $$payload.out.push(`${spread_attributes({ ...attrs }, null, void 0, void 0, 3)}`);
    });
  }
  $$payload.out.push(`<!--]--><!---->`);
  slot($$payload, $$props, "default", {});
  $$payload.out.push(`<!----></svg>`);
  bind_props($$props, {
    name,
    color,
    size,
    strokeWidth,
    absoluteStrokeWidth,
    iconNode
  });
  pop();
}
function Play($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [["polygon", { "points": "6 3 20 12 6 21 6 3" }]];
  Icon($$payload, spread_props([
    { name: "play" },
    $$sanitized_props,
    {
      /**
       * @component @name Play
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cG9seWdvbiBwb2ludHM9IjYgMyAyMCAxMiA2IDIxIDYgMyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/play
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$payload2) => {
        $$payload2.out.push(`<!---->`);
        slot($$payload2, $$props, "default", {});
        $$payload2.out.push(`<!---->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Search($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["circle", { "cx": "11", "cy": "11", "r": "8" }],
    ["path", { "d": "m21 21-4.3-4.3" }]
  ];
  Icon($$payload, spread_props([
    { name: "search" },
    $$sanitized_props,
    {
      /**
       * @component @name Search
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSI4IiAvPgogIDxwYXRoIGQ9Im0yMSAyMS00LjMtNC4zIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/search
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$payload2) => {
        $$payload2.out.push(`<!---->`);
        slot($$payload2, $$props, "default", {});
        $$payload2.out.push(`<!---->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Sparkles($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "path",
      {
        "d": "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
      }
    ],
    ["path", { "d": "M20 3v4" }],
    ["path", { "d": "M22 5h-4" }],
    ["path", { "d": "M4 17v2" }],
    ["path", { "d": "M5 18H3" }]
  ];
  Icon($$payload, spread_props([
    { name: "sparkles" },
    $$sanitized_props,
    {
      /**
       * @component @name Sparkles
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOS45MzcgMTUuNUEyIDIgMCAwIDAgOC41IDE0LjA2M2wtNi4xMzUtMS41ODJhLjUuNSAwIDAgMSAwLS45NjJMOC41IDkuOTM2QTIgMiAwIDAgMCA5LjkzNyA4LjVsMS41ODItNi4xMzVhLjUuNSAwIDAgMSAuOTYzIDBMMTQuMDYzIDguNUEyIDIgMCAwIDAgMTUuNSA5LjkzN2w2LjEzNSAxLjU4MWEuNS41IDAgMCAxIDAgLjk2NEwxNS41IDE0LjA2M2EyIDIgMCAwIDAtMS40MzcgMS40MzdsLTEuNTgyIDYuMTM1YS41LjUgMCAwIDEtLjk2MyAweiIgLz4KICA8cGF0aCBkPSJNMjAgM3Y0IiAvPgogIDxwYXRoIGQ9Ik0yMiA1aC00IiAvPgogIDxwYXRoIGQ9Ik00IDE3djIiIC8+CiAgPHBhdGggZD0iTTUgMThIMyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/sparkles
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$payload2) => {
        $$payload2.out.push(`<!---->`);
        slot($$payload2, $$props, "default", {});
        $$payload2.out.push(`<!---->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Zoom_in($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["circle", { "cx": "11", "cy": "11", "r": "8" }],
    [
      "line",
      { "x1": "21", "x2": "16.65", "y1": "21", "y2": "16.65" }
    ],
    ["line", { "x1": "11", "x2": "11", "y1": "8", "y2": "14" }],
    ["line", { "x1": "8", "x2": "14", "y1": "11", "y2": "11" }]
  ];
  Icon($$payload, spread_props([
    { name: "zoom-in" },
    $$sanitized_props,
    {
      /**
       * @component @name ZoomIn
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSI4IiAvPgogIDxsaW5lIHgxPSIyMSIgeDI9IjE2LjY1IiB5MT0iMjEiIHkyPSIxNi42NSIgLz4KICA8bGluZSB4MT0iMTEiIHgyPSIxMSIgeTE9IjgiIHkyPSIxNCIgLz4KICA8bGluZSB4MT0iOCIgeDI9IjE0IiB5MT0iMTEiIHkyPSIxMSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/zoom-in
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$payload2) => {
        $$payload2.out.push(`<!---->`);
        slot($$payload2, $$props, "default", {});
        $$payload2.out.push(`<!---->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function CommandPalette($$payload, $$props) {
  push();
  let filteredItems;
  let open = fallback($$props["open"], false);
  let onSelect = $$props["onSelect"];
  let items = fallback($$props["items"], () => [], true);
  let placeholder = fallback($$props["placeholder"], "Search...");
  let searchQuery = "";
  filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
  if (open) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<div class="fixed inset-0 z-50 bg-black/40" role="dialog" aria-modal="true" tabindex="-1"><div class="fixed left-1/2 top-24 z-50 w-[680px] -translate-x-1/2 rounded-2xl border border-white/10 bg-black/80 p-2 shadow-2xl backdrop-blur"><input${attr("value", searchQuery)}${attr("placeholder", placeholder)} class="w-full bg-transparent px-4 py-3 text-white placeholder:text-white/50 focus:outline-none"/> <div class="max-h-[50vh] overflow-auto">`);
    if (filteredItems.length === 0) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<div class="px-4 py-8 text-center text-white/50">Nothing found.</div>`);
    } else {
      $$payload.out.push("<!--[!-->");
      const each_array = ensure_array_like(filteredItems);
      $$payload.out.push(`<!--[-->`);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        $$payload.out.push(`<button class="flex w-full items-center px-4 py-2 text-white hover:bg-white/10 cursor-pointer text-left">`);
        Zoom_in($$payload, { class: "mr-2 h-4 w-4" });
        $$payload.out.push(`<!----> ${escape_html(item.title)}</button>`);
      }
      $$payload.out.push(`<!--]-->`);
    }
    $$payload.out.push(`<!--]--></div></div></div>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]-->`);
  bind_props($$props, { open, onSelect, items, placeholder });
  pop();
}
function getTouchDistance(touch1, touch2) {
  const dx = touch1.clientX - touch2.clientX;
  const dy = touch1.clientY - touch2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}
const touchDistance = writable(0);
const tracking = writable(false);
readable({ x: 0, y: 0 }, (set) => {
  const updateCursorPosition = (e) => {
    set({ x: e.clientX, y: e.clientY });
  };
  const updateTouchPosition = (e) => {
    if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      touchDistance.set(distance);
      const touchPoint = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      set(touchPoint);
    } else if (e.touches.length === 1) {
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const touchPoint = { x, y };
      set(touchPoint);
      tracking.set(true);
    }
  };
  const onTouchStart = (e) => {
    updateTouchPosition(e);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchmove", updateTouchPosition);
  };
  const onTouchEnd = () => {
    tracking.set(false);
    touchDistance.set(0);
    window.removeEventListener("touchmove", updateTouchPosition);
  };
  document.addEventListener("mousemove", updateCursorPosition);
  window.addEventListener("touchstart", onTouchStart, true);
  return () => {
    window.removeEventListener("mousemove", updateCursorPosition);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", updateTouchPosition);
    window.removeEventListener("touchend", onTouchEnd);
  };
});
function createStore() {
  const data = /* @__PURE__ */ new Map();
  const { subscribe, set, update } = writable(data);
  const store = {
    subscribe,
    set,
    update,
    add: (item, key) => {
      update((currentData) => {
        currentData.set(key, item);
        return currentData;
      });
      return data;
    },
    get: (key) => {
      return data.get(key) || null;
    },
    getAll: () => {
      return Array.from(data.values());
    },
    delete: (key) => {
      let deleted = false;
      update((currentData) => {
        currentData.delete(key);
        deleted = true;
        return currentData;
      });
      return deleted;
    },
    count: () => data.size
  };
  return store;
}
createStore();
const arrowTuple = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
new Set(arrowTuple);
function Svelvet($$payload, $$props) {
  const $$slots = sanitize_slots($$props);
  push();
  let edgeStore;
  let mermaid = fallback($$props["mermaid"], "");
  let theme = fallback($$props["theme"], "light");
  let id = fallback($$props["id"], 0);
  let snapTo = fallback($$props["snapTo"], 0);
  let zoom = fallback($$props["zoom"], 1);
  let TD = fallback($$props["TD"], false);
  let editable = fallback($$props["editable"], true);
  let locked = fallback($$props["locked"], false);
  let width = fallback($$props["width"], 0);
  let height = fallback($$props["height"], 0);
  let minimap = fallback($$props["minimap"], false);
  let controls = fallback($$props["controls"], false);
  let toggle = fallback($$props["toggle"], false);
  let drawer = fallback($$props["drawer"], false);
  let contrast = fallback($$props["contrast"], false);
  let fitView = fallback($$props["fitView"], false);
  let selectionColor = fallback($$props["selectionColor"], "lightblue");
  let edgeStyle = fallback($$props["edgeStyle"], "bezier");
  let endStyles = fallback($$props["endStyles"], () => [null, null], true);
  let edge = fallback($$props["edge"], null);
  let disableSelection = fallback($$props["disableSelection"], false);
  let mermaidConfig = fallback($$props["mermaidConfig"], () => ({}), true);
  let translation = fallback($$props["translation"], () => ({ x: 0, y: 0 }), true);
  let trackpadPan = fallback($$props["trackpadPan"], false);
  let modifier = fallback($$props["modifier"], "meta");
  let raiseEdgesOnSelect = fallback($$props["raiseEdgesOnSelect"], false);
  let edgesAboveNode = fallback($$props["edgesAboveNode"], false);
  let title = fallback($$props["title"], "");
  let fixedZoom = fallback($$props["fixedZoom"], false);
  let pannable = fallback($$props["pannable"], true);
  const dispatch = createEventDispatcher();
  let graph = null;
  setContext("snapTo", snapTo);
  setContext("edgeStyle", edgeStyle);
  setContext("endStyles", endStyles);
  setContext("graphEdge", edge);
  setContext("raiseEdgesOnSelect", raiseEdgesOnSelect);
  setContext("edgesAboveNode", edgesAboveNode);
  setContext("graph", graph);
  function disconnect(source, target) {
    return;
  }
  $$slots.background;
  edgeStore = graph;
  if (edgeStore) {
    edgeStore.onEdgeChange((edge2, type) => {
      dispatch(type, {
        sourceAnchor: edge2.source,
        targetAnchor: edge2.target,
        sourceNode: edge2.source.node,
        targetNode: edge2.target.node
      });
    });
  }
  {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<div class="svelvet-temp svelte-xw3n4e"${attr_style("", {
      width: width ? width + "px" : "100%",
      height: height ? height + "px" : "100%"
    })}></div>`);
  }
  $$payload.out.push(`<!--]-->`);
  bind_props($$props, {
    mermaid,
    theme,
    id,
    snapTo,
    zoom,
    TD,
    editable,
    locked,
    width,
    height,
    minimap,
    controls,
    toggle,
    drawer,
    contrast,
    fitView,
    selectionColor,
    edgeStyle,
    endStyles,
    edge,
    disableSelection,
    mermaidConfig,
    translation,
    trackpadPan,
    modifier,
    raiseEdgesOnSelect,
    edgesAboveNode,
    title,
    fixedZoom,
    pannable,
    disconnect
  });
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  const q = writable("");
  const ritual = writable(null);
  const dark = writable(true);
  const filtered = derived([q, ritual], ([$q, $rit]) => {
    const r = rituals.find((x) => x.id === $rit);
    return nodes.filter((n) => {
      const text = n.title.toLowerCase();
      const qok = !$q || text.includes($q.toLowerCase());
      const rok = !r || (!r.filter.kinds || r.filter.kinds.includes(n.kind)) && (!r.filter.pillars || r.filter.pillars.includes(n.pillarId)) && (r.filter.minActivity == null || n.activity >= r.filter.minActivity);
      return qok && rok;
    });
  });
  let showCmd = false;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(rituals);
    $$payload2.out.push(`<div class="h-dvh w-dvw overflow-hidden bg-[color:var(--bg)]"${attr("data-theme", store_get($$store_subs ??= {}, "$dark", dark) ? "dark" : "light")}><div class="fixed left-4 top-4 z-40 flex gap-2"><button class="rounded-xl border border-white/10 px-3 py-2 backdrop-blur bg-black/20 text-white hover:bg-white/10 transition-colors">`);
    Search($$payload2, { class: "inline -mt-0.5 w-4 h-4" });
    $$payload2.out.push(`<!----> Aperture (⌘K)</button> <button class="rounded-xl border border-white/10 px-3 py-2 backdrop-blur bg-black/20 text-white hover:bg-white/10 transition-colors">`);
    Sparkles($$payload2, { class: "inline -mt-0.5 w-4 h-4" });
    $$payload2.out.push(`<!----> Theme</button></div> <div class="fixed right-4 top-4 z-40 rounded-xl border border-white/10 px-4 py-3 backdrop-blur-sm bg-black/20 text-white"><div class="text-sm opacity-80">Now</div> <div class="font-medium">Focus: <span class="opacity-80">${escape_html(rituals.find((x) => x.id === store_get($$store_subs ??= {}, "$ritual", ritual))?.label ?? "Free")}</span></div> <div class="text-xs opacity-70">Two threads warm • one promise due in 6h</div></div> <div class="fixed inset-x-0 bottom-4 z-40 mx-auto flex w-fit gap-2"><!--[-->`);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let r = each_array[$$index];
      $$payload2.out.push(`<button${attr_class(`rounded-2xl border px-4 py-2 backdrop-blur hover:shadow transition-all ${stringify(store_get($$store_subs ??= {}, "$ritual", ritual) === r.id ? "bg-white/20 border-white/30" : "bg-black/20 border-white/10")} text-white`)}>`);
      Play($$payload2, { class: "inline -mt-0.5 w-4 h-4" });
      $$payload2.out.push(`<!----> ${escape_html(r.label)}</button>`);
    }
    $$payload2.out.push(`<!--]--></div> <div class="absolute inset-0">`);
    Svelvet($$payload2, {
      nodes: store_get($$store_subs ??= {}, "$filtered", filtered).map((n, i) => ({
        id: n.id,
        position: { x: 200 + i % 7 * 180, y: 120 + Math.floor(i / 7) * 140 },
        data: {
          title: n.title,
          kind: n.kind,
          pillar: n.pillarId,
          activity: n.activity
        }
      })),
      edges: [],
      zoomable: true,
      pannable: true,
      fitView: true,
      minimap: false,
      controls: true,
      background: false,
      edgeStyle: "step",
      class: "h-full w-full"
    });
    $$payload2.out.push(`<!----></div> `);
    CommandPalette($$payload2, {
      items: store_get($$store_subs ??= {}, "$filtered", filtered),
      placeholder: "Search @pillars #topics $systems…",
      onSelect: (item) => {
        console.log("Selected:", item);
      },
      get open() {
        return showCmd;
      },
      set open($$value) {
        showCmd = $$value;
        $$settled = false;
      }
    });
    $$payload2.out.push(`<!----></div>`);
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
