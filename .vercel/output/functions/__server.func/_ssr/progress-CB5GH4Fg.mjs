import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as EXERCISES, o as cn, r as EXERCISE_MAP, s as formAverage, t as Card } from "./exercises-CTcP8bmi.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AppFrame } from "./app-frame-DERlxj19.mjs";
import { t as Badge } from "./badge-qMXcKsqn.mjs";
import { t as Button } from "./button-BKKHatmt.mjs";
import { t as usePhysio } from "./store-CxAZTMsa.mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-CB5GH4Fg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProgressPage() {
	const sessions = usePhysio((s) => s.sessions);
	const seedDemo = usePhysio((s) => s.seedDemo);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [range, setRange] = (0, import_react.useState)(7);
	const filtered = (0, import_react.useMemo)(() => {
		const cutoff = range === 0 ? 0 : Date.now() - range * 24 * 60 * 60 * 1e3;
		return sessions.filter((s) => filter === "all" ? true : s.exerciseId === filter).filter((s) => cutoff ? new Date(s.date).getTime() >= cutoff : true).sort((a, b) => +new Date(a.date) - +new Date(b.date));
	}, [
		sessions,
		filter,
		range
	]);
	const totalReps = filtered.reduce((n, s) => n + s.reps, 0);
	const form = formAverage(filtered);
	const avgPainDrop = (() => {
		const pairs = filtered.filter((s) => s.painBefore != null && s.painAfter != null);
		if (!pairs.length) return null;
		return pairs.reduce((n, s) => n + ((s.painBefore ?? 0) - (s.painAfter ?? 0)), 0) / pairs.length;
	})();
	const chart = filtered.map((s) => ({
		label: new Date(s.date).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric"
		}),
		reps: s.reps,
		form: s.formScore
	}));
	const week = lastDays(7).map((d) => {
		const key = d.toDateString();
		const daySessions = sessions.filter((s) => new Date(s.date).toDateString() === key);
		return {
			key,
			label: d.toLocaleDateString("en-US", { weekday: "narrow" }),
			n: daySessions.length
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-xs tracking-[0.18em] text-muted-foreground uppercase",
			children: "Progress"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl tracking-tight",
			children: "The work, plotted"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-lg text-sm text-muted-foreground",
			children: "Volume is useless without form. Filter a drill, watch both."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid grid-cols-3 gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
					label: "Reps",
					value: totalReps
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
					label: "Sessions",
					value: filtered.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
					label: "Form",
					value: form ? `${form}%` : "—"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			children: [
				7,
				30,
				0
			].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setRange(r),
				className: cn("h-9 rounded-full px-3 text-xs", range === r ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"),
				children: r === 0 ? "All" : `${r}d`
			}, r))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex gap-2 overflow-x-auto pb-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				active: filter === "all",
				onClick: () => setFilter("all"),
				children: "All drills"
			}), EXERCISES.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				active: filter === e.id,
				onClick: () => setFilter(e.id),
				children: e.title
			}, e.id))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-6 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs tracking-wide text-muted-foreground",
				children: "This week"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 gap-2",
				children: week.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("w-full rounded-md", d.n ? "bg-primary/80" : "bg-secondary"),
						style: { height: 8 + d.n * 14 }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] text-muted-foreground",
						children: d.label
					})]
				}, d.key))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mt-4 p-4",
			children: chart.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-56",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data: chart,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "repsFill",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "#c5cec4",
									stopOpacity: .35
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "#c5cec4",
									stopOpacity: 0
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "rgba(255,255,255,0.06)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "label",
								tick: {
									fill: "#8b938c",
									fontSize: 11
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: {
									fill: "#8b938c",
									fontSize: 11
								},
								axisLine: false,
								tickLine: false,
								width: 28
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								background: "#161a18",
								border: "1px solid #2a312d",
								borderRadius: 12,
								color: "#eef0ec"
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "reps",
								stroke: "#c5cec4",
								fill: "url(#repsFill)",
								strokeWidth: 2
							})
						]
					})
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-2 py-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl",
						children: "No sessions in this filter"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Complete a drill, or load a week of sample history to see the chart."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/exercises",
								children: "Start a drill"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: seedDemo,
							children: "Load sample week"
						})]
					})
				]
			})
		}),
		avgPainDrop != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-sm text-muted-foreground",
			children: [
				"Average pain change ",
				avgPainDrop > 0 ? "down" : avgPainDrop < 0 ? "up" : "flat",
				" ",
				Math.abs(avgPainDrop).toFixed(1),
				" points across these sessions."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-2",
			children: [...filtered].reverse().slice(0, 12).map((s) => {
				const def = EXERCISE_MAP[s.exerciseId];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex items-center justify-between gap-3 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: def?.title ?? s.exerciseId
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							new Date(s.date).toLocaleString(),
							" · ",
							s.reps,
							" counted · form ",
							s.formScore,
							"%"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: s.formScore >= 80 ? "good" : "warn",
						children: s.source
					})]
				}) }, s.id);
			})
		})
	] });
}
function Mini({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl tabular-nums tracking-tight",
			children: value
		})]
	});
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-9 shrink-0 rounded-full px-3 text-xs", active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"),
		children
	});
}
function lastDays(n) {
	const out = [];
	for (let i = n - 1; i >= 0; i--) {
		const d = /* @__PURE__ */ new Date();
		d.setHours(0, 0, 0, 0);
		d.setDate(d.getDate() - i);
		out.push(d);
	}
	return out;
}
//#endregion
export { ProgressPage as component };
