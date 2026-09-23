import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as EXERCISE_MAP, t as Card } from "./exercises-CTcP8bmi.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as ArrowLeft, u as Check } from "../_libs/lucide-react.mjs";
import { t as AppFrame } from "./app-frame-DERlxj19.mjs";
import { t as Badge } from "./badge-qMXcKsqn.mjs";
import { t as PoseGlyph } from "./pose-glyph-CJ4xtsJu.mjs";
import { r as Route$1 } from "./router-BChQfB_1.mjs";
import { t as PainCheck } from "./pain-check-C7fLClI-.mjs";
import { t as Button } from "./button-BKKHatmt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exercises._id-3XoJjRI7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Brief() {
	const { id } = Route$1.useParams();
	const navigate = useNavigate();
	const ex = EXERCISE_MAP[id];
	const [pain, setPain] = (0, import_react.useState)(3);
	if (!ex) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "That drill is not in the library." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		className: "mt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/exercises",
			children: "Back to library"
		})
	})] });
	const start = (source) => {
		navigate({
			to: "/session/$id",
			params: { id: ex.id },
			search: {
				pain,
				source
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/exercises",
		className: "mb-6 inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Library"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 lg:grid-cols-[1fr_20rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: ex.region }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: ex.difficulty }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: ex.mode === "hold" ? `${ex.sets} × ${ex.target}s` : `${ex.sets} × ${ex.target}` })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl tracking-tight",
				children: ex.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground",
				children: ex.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-6 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid place-items-center bg-studio py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoseGlyph, {
						id: ex.id,
						className: "h-40 w-32"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-wide text-muted-foreground uppercase",
						children: "Why this exists"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed",
						children: ex.why
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: "Set up",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "space-y-2",
					children: ex.setup.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 text-sm leading-relaxed",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-primary" }), s]
					}, s))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: "The movement",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "space-y-2",
					children: ex.steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 text-sm leading-relaxed",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "w-5 shrink-0 tabular-nums text-muted-foreground",
							children: [i + 1, "."]
						}), s]
					}, s))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: "Common misses",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: ex.mistakes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "text-sm text-muted-foreground",
						children: ["— ", s]
					}, s))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-xs leading-relaxed text-muted-foreground",
				children: ex.skipIf
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "lg:sticky lg:top-20 lg:self-start",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg tracking-tight",
						children: "Ready to work"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							ex.estimatedMin,
							" minutes · ",
							ex.restSec,
							"s rest between sets"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PainCheck, {
							label: "Pain right now (optional)",
							value: pain,
							onChange: setPain
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6 w-full",
						size: "lg",
						onClick: () => start("camera"),
						children: "Start with camera"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-2 w-full",
						size: "lg",
						variant: "secondary",
						onClick: () => start("coach"),
						children: "Practice with coach"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs leading-relaxed text-muted-foreground",
						children: "Camera tracks your joints in the browser — nothing is uploaded. Coach mode runs a tempo skeleton so you can still complete the protocol."
					})
				]
			})
		})]
	})] });
}
function Block({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-display text-xl tracking-tight",
			children: title
		}), children]
	});
}
//#endregion
export { Brief as component };
