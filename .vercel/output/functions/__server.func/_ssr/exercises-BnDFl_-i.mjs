import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as REGIONS, n as EXERCISES, o as cn, t as Card } from "./exercises-CTcP8bmi.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AppFrame } from "./app-frame-DERlxj19.mjs";
import { t as Badge } from "./badge-qMXcKsqn.mjs";
import { t as PoseGlyph } from "./pose-glyph-CJ4xtsJu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exercises-BnDFl_-i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Library() {
	const [region, setRegion] = (0, import_react.useState)("full");
	const list = region === "full" ? EXERCISES : EXERCISES.filter((e) => e.regions.includes(region));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-xs tracking-[0.18em] text-muted-foreground uppercase",
			children: "Library"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl tracking-tight",
			children: "Choose a drill"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-lg text-sm text-muted-foreground",
			children: "Pick the joint that is bothering you. Each card opens setup, common mistakes, and a session you can run with a camera or the on-screen coach."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex gap-2 overflow-x-auto pb-2",
			children: REGIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setRegion(r.id),
				className: cn("h-10 shrink-0 rounded-full px-4 text-sm", region === r.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"),
				children: r.label
			}, r.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-3 sm:grid-cols-2",
			children: list.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/exercises/$id",
				params: { id: ex.id },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex h-full gap-4 p-4 transition-shadow hover:shadow-[var(--shadow-border-hover)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-[4.5rem] shrink-0 place-items-center rounded-lg bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoseGlyph, {
							id: ex.id,
							className: "h-14 w-11"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: ex.region }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: ex.difficulty })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1.5 font-display text-xl tracking-tight",
								children: ex.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: ex.short
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs tabular-nums text-muted-foreground",
								children: [
									ex.mode === "hold" ? `${ex.sets} × ${ex.target}s hold` : `${ex.sets} × ${ex.target} reps`,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mx-1",
										children: "·"
									}),
									ex.estimatedMin,
									" min"
								]
							})
						]
					})]
				})
			}, ex.id))
		})
	] });
}
//#endregion
export { Library as component };
