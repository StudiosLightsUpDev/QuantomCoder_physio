import "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl bg-card text-card-foreground shadow-[var(--shadow-border)]", className),
		...props
	});
}
var EXERCISES = [
	{
		id: "knee_squat",
		title: "Sit to stand",
		short: "Build knee strength without a machine.",
		description: "The most useful knee exercise you can do at home. Stand up from a seat, sit back down with control. Camera watches knee bend and whether your torso stays tall.",
		region: "knee",
		regions: [
			"knee",
			"hip",
			"full"
		],
		difficulty: "Foundation",
		mode: "reps",
		sets: 3,
		target: 10,
		restSec: 30,
		tempoMs: 2800,
		estimatedMin: 4,
		why: "Sit-to-stand transfers to getting out of a chair, climbing stairs, and reducing everyday knee load.",
		setup: [
			"Stand in front of a chair, feet under your shoulders.",
			"Step back until your hips, knees, and ankles are all in frame.",
			"Keep heels down. Lightly touch the chair — do not collapse onto it."
		],
		steps: [
			"Brace lightly through your middle. Chest stays open.",
			"Hinge the hips back and bend both knees as if sitting.",
			"Lower until thighs are near parallel, knees tracking over mid-foot.",
			"Drive through the heels to stand tall. Squeeze the glutes at the top."
		],
		mistakes: [
			"Knees caving inward",
			"Heels lifting",
			"Rounding the lower back on the way down",
			"Dropping too fast"
		],
		skipIf: "Skip if you have sharp front-of-knee pain, recent surgery without clearance, or cannot stand unassisted.",
		cues: {
			down: "Sit back",
			up: "Stand tall",
			hold: "Hold the depth"
		}
	},
	{
		id: "shoulder_raise",
		title: "Lateral raise",
		short: "Restore shoulder motion out to the side.",
		description: "Raise both arms to shoulder height with a soft elbow, then lower slowly. We watch the shoulder-torso angle and whether the elbow stays long.",
		region: "shoulder",
		regions: ["shoulder", "full"],
		difficulty: "Foundation",
		mode: "reps",
		sets: 3,
		target: 12,
		restSec: 25,
		tempoMs: 2600,
		estimatedMin: 4,
		why: "Side raises rebuild the deltoid and scapular control you need to reach a shelf or put on a jacket without hiking the shoulder.",
		setup: [
			"Stand tall, ribs stacked over pelvis.",
			"Arms hang by your sides, thumbs slightly forward.",
			"Leave space so both wrists stay in frame at the top."
		],
		steps: [
			"Float both arms out to the sides, leading with the elbows.",
			"Stop at shoulder height — do not shrug.",
			"Pause one beat. Lower in 2 seconds.",
			"Keep neck long. If it creeps up, reset."
		],
		mistakes: [
			"Shrugging toward the ears",
			"Bending the elbows past 30°",
			"Swinging with momentum",
			"Raising above the shoulder if it pinches"
		],
		skipIf: "Stop if you feel sharp pinch at the top of the shoulder or tingling down the arm.",
		cues: {
			down: "Lower slowly",
			up: "Raise to shoulder",
			hold: "Hold height"
		}
	},
	{
		id: "hip_raise",
		title: "Straight-leg raise",
		short: "Wake the hip flexors without loading the spine.",
		description: "Lie on your back and raise one straight leg. We track the shoulder-hip-knee line so the leg stays long and the pelvis stays quiet.",
		region: "hip",
		regions: [
			"hip",
			"knee",
			"full"
		],
		difficulty: "Foundation",
		mode: "reps",
		sets: 2,
		target: 8,
		restSec: 20,
		tempoMs: 3e3,
		estimatedMin: 5,
		why: "Straight-leg raises rebuild hip flexor endurance after inactivity and help the knee track when you walk.",
		setup: [
			"Lie on your back, one knee bent, the working leg long.",
			"Camera at your side, full body visible from shoulder to ankle.",
			"Press the resting foot into the floor to keep the pelvis still."
		],
		steps: [
			"Lock a soft knee on the working leg — do not hyperextend.",
			"Raise the leg until the foot is about hip height.",
			"Hold two seconds. Lower without letting it slam.",
			"Switch legs after the set."
		],
		mistakes: [
			"Bent knee on the working side",
			"Arching the lower back",
			"Using momentum",
			"Raising past the point the pelvis tips"
		],
		skipIf: "Avoid if you have an acute disc flare that worsens with a straight-leg raise, or a recent hip replacement without clearance.",
		cues: {
			down: "Lower the leg",
			up: "Raise the leg",
			hold: "Hold height"
		}
	},
	{
		id: "back_stretch",
		title: "Cat-cow",
		short: "Move the spine segment by segment.",
		description: "On all fours, you alternate a gentle dip (cow) and a rounded arch (cat). We read the shoulder-hip-knee angle to count slow cycles.",
		region: "back",
		regions: ["back", "full"],
		difficulty: "Foundation",
		mode: "reps",
		sets: 2,
		target: 10,
		restSec: 15,
		tempoMs: 4e3,
		estimatedMin: 3,
		why: "Cat-cow is a daily mobility drill for a stiff or desk-tired back. Slow breathing is the point, not range.",
		setup: [
			"Come to all fours, wrists under shoulders, knees under hips.",
			"Film from the side so the whole spine is visible.",
			"Spread the fingers. Neutral neck."
		],
		steps: [
			"Inhale: let the belly drop, lift the chest and tailbone (cow).",
			"Exhale: round the back, tuck the chin and pelvis (cat).",
			"Move one vertebra at a time. Four seconds per cycle.",
			"Stay out of end-range pain."
		],
		mistakes: [
			"Dumping into the low back on cow",
			"Holding the breath",
			"Locking the elbows",
			"Rushing the cycle"
		],
		skipIf: "Skip if all-fours position hurts the wrists or knees (pad them first) or if your clinician has limited spinal flexion.",
		cues: {
			down: "Dip (cow)",
			up: "Round (cat)",
			hold: "Breathe here"
		}
	},
	{
		id: "glute_bridge",
		title: "Glute bridge",
		short: "Hips up, ribs down — posterior chain.",
		description: "Lie on your back, knees bent, and lift the hips until you form a shoulder-hip-knee line. We watch hip extension and stop you from over-arching.",
		region: "hip",
		regions: [
			"hip",
			"back",
			"knee",
			"full"
		],
		difficulty: "Build",
		mode: "reps",
		sets: 3,
		target: 12,
		restSec: 30,
		tempoMs: 2800,
		estimatedMin: 5,
		why: "Bridges teach the glutes to extend the hip so the lower back stops doing the work when you stand and walk.",
		setup: [
			"Lie on your back, knees bent, feet under knees.",
			"Arms by your sides. Camera from the side.",
			"Gently flatten the low back before you lift."
		],
		steps: [
			"Press the floor away with the heels.",
			"Lift until shoulders, hips, and knees line up.",
			"Squeeze the glutes. Do not flare the ribs.",
			"Lower the hips with control, bone by bone."
		],
		mistakes: [
			"Over-arching the lumbar spine",
			"Pushing through the toes",
			"Knees falling in or out",
			"Holding the breath"
		],
		skipIf: "Stop if you get sharp lumbar pain at the top, or hamstring cramp you cannot ease by moving the feet closer.",
		cues: {
			down: "Lower the hips",
			up: "Lift the hips",
			hold: "Hold the line"
		}
	},
	{
		id: "calf_raise",
		title: "Calf raise",
		short: "Ankle strength for stairs and walking.",
		description: "Rise onto the balls of the feet, pause, lower the heels. We watch the heel lift and keep the knees quiet.",
		region: "ankle",
		regions: [
			"ankle",
			"knee",
			"full"
		],
		difficulty: "Foundation",
		mode: "reps",
		sets: 3,
		target: 15,
		restSec: 20,
		tempoMs: 2200,
		estimatedMin: 4,
		why: "Calf capacity is what lets you push off when you walk and control the descent on stairs.",
		setup: [
			"Stand tall, light fingertip support on a wall if needed.",
			"Feet hip-width. Camera from the side, ankles in frame.",
			"Equal weight through both feet."
		],
		steps: [
			"Rise onto the balls of both feet.",
			"Pause one second at the top without rocking forward.",
			"Lower the heels fully, with control.",
			"Keep knees soft, not locked back."
		],
		mistakes: [
			"Bouncing",
			"Rolling onto the outer foot",
			"Bending the knees to cheat height",
			"Cutting the lowering phase"
		],
		skipIf: "Avoid if you have an unhealed Achilles issue or cannot stand on the balls of your feet without sharp pain.",
		cues: {
			down: "Lower the heels",
			up: "Rise onto toes",
			hold: "Hold the rise"
		}
	},
	{
		id: "side_leg_raise",
		title: "Side leg raise",
		short: "Hip abductors that keep the pelvis level.",
		description: "Stand on one leg and lift the other out to the side. We read the torso-hip-ankle angle so you lift from the hip, not by leaning.",
		region: "hip",
		regions: [
			"hip",
			"knee",
			"full"
		],
		difficulty: "Build",
		mode: "reps",
		sets: 2,
		target: 10,
		restSec: 20,
		tempoMs: 2600,
		estimatedMin: 4,
		why: "Side hip strength stops the pelvis dropping when you walk — a common driver of knee and back irritation.",
		setup: [
			"Stand sideways to the camera, light hand on a chair.",
			"Working leg away from the support.",
			"Ribs stacked. Do not lean the torso."
		],
		steps: [
			"Lift the working leg out to the side, foot flexed.",
			"Stop around 30–45°. The torso stays still.",
			"Lower without touching down if you can.",
			"Switch sides after the set."
		],
		mistakes: [
			"Leaning the torso the other way",
			"Swinging the leg",
			"Turning the toes up (hip flexor cheat)",
			"Hiking the hip"
		],
		skipIf: "Skip if standing on one leg is unsafe without a rail, or if lateral hip pain is sharp.",
		cues: {
			down: "Lower the leg",
			up: "Lift to the side",
			hold: "Hold the lift"
		}
	},
	{
		id: "wall_sit",
		title: "Wall sit",
		short: "Isometric knee and quad endurance.",
		description: "Slide down a wall until the knees are near 90° and hold. We watch the knee angle and credit every clean second.",
		region: "knee",
		regions: [
			"knee",
			"hip",
			"full"
		],
		difficulty: "Control",
		mode: "hold",
		sets: 3,
		target: 20,
		restSec: 30,
		tempoMs: 8e3,
		estimatedMin: 4,
		why: "A wall sit builds the exact endurance you need to control a squat and to go down stairs without the quads shaking.",
		setup: [
			"Back against a wall, feet a step in front of you.",
			"Slide down until thighs are close to parallel.",
			"Camera from the side, full thigh visible."
		],
		steps: [
			"Knees track over mid-foot, about 90°.",
			"Weight in the heels. Do not press the knees inward.",
			"Breathe. Hold until the timer completes.",
			"Drive up the wall to rest."
		],
		mistakes: [
			"Knees shooting past the toes aggressively",
			"Holding breath",
			"Coming up as soon as it burns",
			"Sliding too low if the knee complains"
		],
		skipIf: "Do not hold through sharp knee pain. Come up 10° if the front of the knee bites.",
		cues: {
			down: "Bend to 90",
			up: "Stand to rest",
			hold: "Hold the sit"
		}
	}
];
var EXERCISE_MAP = Object.fromEntries(EXERCISES.map((e) => [e.id, e]));
var REGIONS = [
	{
		id: "full",
		label: "All"
	},
	{
		id: "knee",
		label: "Knee"
	},
	{
		id: "shoulder",
		label: "Shoulder"
	},
	{
		id: "hip",
		label: "Hip"
	},
	{
		id: "back",
		label: "Back"
	},
	{
		id: "ankle",
		label: "Ankle"
	}
];
var WEEKLY = [
	[
		"knee_squat",
		"glute_bridge",
		"calf_raise"
	],
	[
		"shoulder_raise",
		"wall_sit",
		"back_stretch"
	],
	[
		"hip_raise",
		"side_leg_raise",
		"glute_bridge"
	],
	[
		"knee_squat",
		"shoulder_raise",
		"calf_raise"
	],
	[
		"back_stretch",
		"wall_sit",
		"hip_raise"
	],
	[
		"glute_bridge",
		"side_leg_raise",
		"knee_squat"
	],
	[
		"calf_raise",
		"shoulder_raise",
		"back_stretch"
	]
];
function getTodaysPlan(focus, date = /* @__PURE__ */ new Date()) {
	const list = (WEEKLY[date.getDay()] ?? WEEKLY[0]).map((id) => EXERCISE_MAP[id]);
	if (!focus.length || focus.includes("full")) return list;
	const preferred = EXERCISES.filter((e) => e.regions.some((r) => focus.includes(r)));
	const merged = [...list.filter((e) => preferred.includes(e)), ...preferred];
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const e of merged) {
		if (seen.has(e.id)) continue;
		seen.add(e.id);
		out.push(e);
		if (out.length === 3) break;
	}
	return out.length ? out : list;
}
function isSameDay(iso, date = /* @__PURE__ */ new Date()) {
	const d = new Date(iso);
	return d.getFullYear() === date.getFullYear() && d.getMonth() === date.getMonth() && d.getDate() === date.getDate();
}
function repsToday(sessions, date = /* @__PURE__ */ new Date()) {
	return sessions.filter((s) => isSameDay(s.date, date)).reduce((n, s) => n + s.reps, 0);
}
function sessionsToday(sessions, date = /* @__PURE__ */ new Date()) {
	return sessions.filter((s) => isSameDay(s.date, date));
}
function calcStreak(sessions, date = /* @__PURE__ */ new Date()) {
	if (!sessions.length) return 0;
	const days = new Set(sessions.map((s) => new Date(s.date).toDateString()));
	let streak = 0;
	const cursor = new Date(date);
	if (!days.has(cursor.toDateString())) {
		cursor.setDate(cursor.getDate() - 1);
		if (!days.has(cursor.toDateString())) return 0;
	}
	while (days.has(cursor.toDateString())) {
		streak += 1;
		cursor.setDate(cursor.getDate() - 1);
	}
	return streak;
}
function formAverage(sessions) {
	if (!sessions.length) return 0;
	return Math.round(sessions.reduce((n, s) => n + s.formScore, 0) / sessions.length);
}
function uid() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
//#endregion
export { calcStreak as a, getTodaysPlan as c, uid as d, REGIONS as i, repsToday as l, EXERCISES as n, cn as o, EXERCISE_MAP as r, formAverage as s, Card as t, sessionsToday as u };
