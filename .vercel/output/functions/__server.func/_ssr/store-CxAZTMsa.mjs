import { d as uid, r as EXERCISE_MAP } from "./exercises-CTcP8bmi.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-CxAZTMsa.js
var defaultProfile = () => ({
	name: "",
	focus: [],
	dailyGoalReps: 40,
	voiceEnabled: true,
	createdAt: (/* @__PURE__ */ new Date()).toISOString()
});
function demoSessions() {
	const ids = [
		"knee_squat",
		"glute_bridge",
		"shoulder_raise",
		"calf_raise",
		"back_stretch"
	];
	const out = [];
	for (let d = 6; d >= 1; d--) {
		const date = /* @__PURE__ */ new Date();
		date.setDate(date.getDate() - d);
		date.setHours(8 + d % 3, 15, 0, 0);
		const id = ids[d % ids.length];
		const def = EXERCISE_MAP[id];
		out.push({
			id: uid(),
			exerciseId: id,
			date: date.toISOString(),
			reps: def.mode === "hold" ? def.target : def.target * def.sets - d % 4,
			setsCompleted: def.sets,
			targetReps: def.mode === "hold" ? def.target * def.sets : def.target * def.sets,
			durationSec: 180 + d * 20,
			formScore: 78 + d * 7 % 18,
			painBefore: 4,
			painAfter: 3,
			topCue: d % 2 === 0 ? "Chest up — keep the back long" : null,
			source: "coach"
		});
	}
	return out;
}
var usePhysio = create()(persist((set, get) => ({
	profile: defaultProfile(),
	sessions: [],
	notes: [],
	setName: (name) => set({ profile: {
		...get().profile,
		name
	} }),
	setFocus: (focus) => set({ profile: {
		...get().profile,
		focus
	} }),
	setDailyGoal: (dailyGoalReps) => set({ profile: {
		...get().profile,
		dailyGoalReps
	} }),
	setVoice: (voiceEnabled) => set({ profile: {
		...get().profile,
		voiceEnabled
	} }),
	addSession: (s) => {
		const record = {
			...s,
			id: uid(),
			date: s.date ?? (/* @__PURE__ */ new Date()).toISOString()
		};
		set({ sessions: [...get().sessions, record] });
		return record;
	},
	addNote: (subject, message) => set({ notes: [...get().notes, {
		id: uid(),
		subject,
		message,
		date: (/* @__PURE__ */ new Date()).toISOString()
	}] }),
	seedDemo: () => set({ sessions: [...demoSessions(), ...get().sessions] }),
	resetAll: () => set({
		profile: defaultProfile(),
		sessions: [],
		notes: []
	})
}), {
	name: "physio-coach-v1",
	skipHydration: typeof window === "undefined"
}));
//#endregion
export { usePhysio as t };
