import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as calcStreak, c as getTodaysPlan, l as repsToday, s as formAverage, t as Card, u as sessionsToday } from "./exercises-CTcP8bmi.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as ArrowRight, l as Flame, o as Target } from "../_libs/lucide-react.mjs";
import { t as AppFrame } from "./app-frame-DERlxj19.mjs";
import { t as Badge } from "./badge-qMXcKsqn.mjs";
import { t as PoseGlyph } from "./pose-glyph-CJ4xtsJu.mjs";
import { t as Button } from "./button-BKKHatmt.mjs";
import { t as usePhysio } from "./store-CxAZTMsa.mjs";
import { t as Progress } from "./progress-CvDsjNY_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-h03qKFol.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const profile = usePhysio((s) => s.profile);
	const sessions = usePhysio((s) => s.sessions);
	const plan = getTodaysPlan(profile.focus);
	const today = sessionsToday(sessions);
	const reps = repsToday(sessions);
	const streak = calcStreak(sessions);
	const form = formAverage(sessions.slice(-8));
	const goal = profile.dailyGoalReps;
	const greeting = profile.name ? `Good to see you, ${profile.name}.` : "Your next session is ready.";
	const doneIds = new Set(today.map((s) => s.exerciseId));
	const next = plan.find((e) => !doneIds.has(e.id)) ?? plan[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs tracking-[0.18em] text-muted-foreground uppercase",
					children: "Today"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "max-w-xl font-display text-4xl leading-[1.1] font-medium tracking-tight sm:text-5xl",
					children: greeting
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground",
					children: "Camera coaching when you have it. A guided coach when you do not. Either way, every rep is counted with form cues you can hear."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 grid grid-cols-3 gap-2 sm:gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Reps today",
					value: reps,
					hint: `of ${goal}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Streak",
					value: streak,
					hint: "days",
					icon: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Form",
					value: form || "—",
					hint: form ? "avg %" : "after 1 session"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl tracking-tight",
						children: "Today’s protocol"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted-foreground tabular-nums",
						children: [
							doneIds.size,
							"/",
							plan.length,
							" done"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: doneIds.size / plan.length * 100,
					className: "mb-4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3",
					children: plan.map((ex, i) => {
						const complete = doneIds.has(ex.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/exercises/$id",
							params: { id: ex.id },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "flex items-center gap-4 p-3 transition-shadow duration-150 hover:shadow-[var(--shadow-border-hover)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid size-16 shrink-0 place-items-center rounded-lg bg-secondary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoseGlyph, {
											id: ex.id,
											className: "h-12 w-10"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] tracking-wide text-muted-foreground",
													children: String(i + 1).padStart(2, "0")
												}), complete ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "good",
													children: "Done"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: ex.difficulty })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate font-medium",
												children: ex.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "truncate text-sm text-muted-foreground",
												children: [
													ex.mode === "hold" ? `${ex.sets} × ${ex.target}s` : `${ex.sets} × ${ex.target}`,
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "mx-1.5",
														children: "·"
													}),
													ex.estimatedMin,
													" min"
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 shrink-0 text-muted-foreground" })
								]
							})
						}, ex.id);
					})
				}),
				next && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-4 w-full",
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/exercises/$id",
						params: { id: next.id },
						children: [doneIds.size ? "Continue protocol" : "Start first drill", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-12 items-center justify-center rounded-md bg-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-5 text-primary" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: "Daily volume"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							reps,
							" of ",
							goal,
							" quality reps. Form score beats empty volume."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: Math.min(100, reps / goal * 100),
					className: "sm:w-40"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/exercises",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "h-full p-5 transition-shadow hover:shadow-[var(--shadow-border-hover)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide text-muted-foreground uppercase",
							children: "Library"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-xl",
							children: "Eight drills, four joints"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Knee, shoulder, hip, back, ankle — each with setup, mistakes, and live cues."
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/progress",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "h-full p-5 transition-shadow hover:shadow-[var(--shadow-border-hover)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide text-muted-foreground uppercase",
							children: "History"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-xl",
							children: "See the week, not the guess"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Reps, form quality, and pain before vs after — filter by drill."
						})
					]
				})
			})]
		})
	] });
}
function Stat({ label, value, hint, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-3 sm:p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-wide text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 flex items-baseline gap-1 font-display text-2xl tabular-nums tracking-tight sm:text-3xl",
				children: [icon && typeof value === "number" && value > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "mr-0.5 size-4 self-center text-warn" }) : null, value]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-muted-foreground",
				children: hint
			})
		]
	});
}
//#endregion
export { Home as component };
