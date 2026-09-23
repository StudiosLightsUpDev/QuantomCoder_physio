import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { o as cn, r as EXERCISE_MAP, t as Card } from "./exercises-CTcP8bmi.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Camera, n as VolumeX, p as ArrowLeft, r as Volume2, s as PersonStanding } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-qMXcKsqn.mjs";
import { n as Route } from "./router-BChQfB_1.mjs";
import { t as PainCheck } from "./pain-check-C7fLClI-.mjs";
import { t as Button } from "./button-BKKHatmt.mjs";
import { t as usePhysio } from "./store-CxAZTMsa.mjs";
import { t as Progress } from "./progress-CvDsjNY_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/session._id-DxHDJq-Q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function calculateAngle(p1, p2, p3) {
	const angle = Math.atan2(p3.y - p2.y, p3.x - p2.x) - Math.atan2(p1.y - p2.y, p1.x - p2.x);
	let degrees = Math.abs(angle * 180 / Math.PI);
	if (degrees > 180) degrees = 360 - degrees;
	return degrees;
}
function visible(lm, threshold = .45) {
	if (!lm) return false;
	if (lm.visibility === void 0) return true;
	return lm.visibility >= threshold;
}
function lerp(a, b, t) {
	return a + (b - a) * t;
}
function easeInOut(t) {
	return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
function lm(x, y, vis = .99) {
	return {
		x,
		y,
		z: 0,
		visibility: vis
	};
}
function fromJoints(j) {
	const out = Array.from({ length: 33 }, () => lm(.5, .5, .35));
	out[0] = lm(...j.nose);
	for (let i = 1; i <= 10; i++) out[i] = lm(j.nose[0] + (i % 2 ? -.015 : .015), j.nose[1] + .02, .7);
	out[11] = lm(...j.lSh);
	out[12] = lm(...j.rSh);
	out[13] = lm(...j.lEl);
	out[14] = lm(...j.rEl);
	out[15] = lm(...j.lWr);
	out[16] = lm(...j.rWr);
	out[23] = lm(...j.lHip);
	out[24] = lm(...j.rHip);
	out[25] = lm(...j.lKn);
	out[26] = lm(...j.rKn);
	out[27] = lm(...j.lAn);
	out[28] = lm(...j.rAn);
	out[29] = lm(...j.lHeel);
	out[30] = lm(...j.rHeel);
	out[31] = lm(j.lAn[0] + .05, j.lAn[1]);
	out[32] = lm(j.rAn[0] + .05, j.rAn[1]);
	return out;
}
function mix(a, b, t) {
	const p = (x, y) => [lerp(x[0], y[0], t), lerp(x[1], y[1], t)];
	return {
		nose: p(a.nose, b.nose),
		lSh: p(a.lSh, b.lSh),
		rSh: p(a.rSh, b.rSh),
		lEl: p(a.lEl, b.lEl),
		rEl: p(a.rEl, b.rEl),
		lWr: p(a.lWr, b.lWr),
		rWr: p(a.rWr, b.rWr),
		lHip: p(a.lHip, b.lHip),
		rHip: p(a.rHip, b.rHip),
		lKn: p(a.lKn, b.lKn),
		rKn: p(a.rKn, b.rKn),
		lAn: p(a.lAn, b.lAn),
		rAn: p(a.rAn, b.rAn),
		lHeel: p(a.lHeel, b.lHeel),
		rHeel: p(a.rHeel, b.rHeel)
	};
}
var standSide = {
	nose: [.52, .14],
	lSh: [.48, .24],
	rSh: [.54, .24],
	lEl: [.46, .38],
	rEl: [.56, .38],
	lWr: [.45, .5],
	rWr: [.57, .5],
	lHip: [.48, .5],
	rHip: [.54, .5],
	lKn: [.5, .71],
	rKn: [.56, .71],
	lAn: [.5, .92],
	rAn: [.56, .92],
	lHeel: [.46, .96],
	rHeel: [.52, .96]
};
var squatBottom = {
	nose: [.42, .3],
	lSh: [.38, .4],
	rSh: [.44, .4],
	lEl: [.34, .52],
	rEl: [.46, .52],
	lWr: [.32, .62],
	rWr: [.48, .62],
	lHip: [.34, .62],
	rHip: [.4, .62],
	lKn: [.6, .72],
	rKn: [.66, .72],
	lAn: [.5, .92],
	rAn: [.56, .92],
	lHeel: [.46, .96],
	rHeel: [.52, .96]
};
var standFront = {
	nose: [.5, .12],
	lSh: [.38, .24],
	rSh: [.62, .24],
	lEl: [.34, .4],
	rEl: [.66, .4],
	lWr: [.32, .54],
	rWr: [.68, .54],
	lHip: [.42, .5],
	rHip: [.58, .5],
	lKn: [.42, .72],
	rKn: [.58, .72],
	lAn: [.42, .92],
	rAn: [.58, .92],
	lHeel: [.4, .96],
	rHeel: [.56, .96]
};
var armsOut = {
	...standFront,
	lEl: [.2, .26],
	rEl: [.8, .26],
	lWr: [.06, .26],
	rWr: [.94, .26]
};
var lieStraight = {
	nose: [.16, .38],
	lSh: [.26, .42],
	rSh: [.28, .48],
	lEl: [.24, .54],
	rEl: [.3, .58],
	lWr: [.22, .64],
	rWr: [.28, .68],
	lHip: [.5, .44],
	rHip: [.52, .5],
	lKn: [.72, .44],
	rKn: [.72, .52],
	lAn: [.9, .44],
	rAn: [.9, .52],
	lHeel: [.92, .48],
	rHeel: [.92, .56]
};
var lieLegUp = {
	...lieStraight,
	lKn: [.62, .22],
	lAn: [.72, .08],
	lHeel: [.74, .12]
};
var lieBent = {
	nose: [.2, .42],
	lSh: [.3, .5],
	rSh: [.32, .56],
	lEl: [.28, .64],
	rEl: [.34, .68],
	lWr: [.26, .76],
	rWr: [.32, .8],
	lHip: [.5, .52],
	rHip: [.52, .56],
	lKn: [.68, .38],
	rKn: [.7, .42],
	lAn: [.78, .62],
	rAn: [.8, .66],
	lHeel: [.76, .66],
	rHeel: [.78, .7]
};
var bridgeTop = {
	nose: [.22, .48],
	lSh: [.32, .62],
	rSh: [.34, .66],
	lEl: [.3, .74],
	rEl: [.36, .78],
	lWr: [.28, .84],
	rWr: [.34, .86],
	lHip: [.52, .28],
	rHip: [.54, .32],
	lKn: [.7, .4],
	rKn: [.72, .44],
	lAn: [.8, .64],
	rAn: [.82, .68],
	lHeel: [.78, .68],
	rHeel: [.8, .72]
};
var calfUp = {
	...standSide,
	nose: [.52, .1],
	lSh: [.48, .2],
	rSh: [.54, .2],
	lHip: [.48, .46],
	rHip: [.54, .46],
	lKn: [.5, .66],
	rKn: [.56, .66],
	lAn: [.51, .86],
	rAn: [.57, .86],
	lHeel: [.5, .865],
	rHeel: [.56, .865]
};
var sideLift = {
	...standFront,
	lKn: [.22, .6],
	lAn: [.08, .58],
	lHeel: [.06, .62]
};
var wallSit = {
	nose: [.46, .26],
	lSh: [.4, .36],
	rSh: [.46, .36],
	lEl: [.38, .5],
	rEl: [.48, .5],
	lWr: [.36, .62],
	rWr: [.5, .62],
	lHip: [.4, .58],
	rHip: [.46, .58],
	lKn: [.6, .72],
	rKn: [.66, .72],
	lAn: [.52, .92],
	rAn: [.58, .92],
	lHeel: [.48, .96],
	rHeel: [.54, .96]
};
var catPose = {
	nose: [.18, .42],
	lSh: [.3, .5],
	rSh: [.34, .52],
	lEl: [.28, .66],
	rEl: [.34, .68],
	lWr: [.26, .8],
	rWr: [.32, .82],
	lHip: [.56, .32],
	rHip: [.6, .34],
	lKn: [.78, .52],
	rKn: [.82, .54],
	lAn: [.86, .7],
	rAn: [.9, .72],
	lHeel: [.88, .74],
	rHeel: [.92, .76]
};
var cowPose = {
	nose: [.16, .28],
	lSh: [.32, .46],
	rSh: [.36, .5],
	lEl: [.3, .64],
	rEl: [.36, .66],
	lWr: [.28, .8],
	rWr: [.34, .82],
	lHip: [.58, .62],
	rHip: [.62, .64],
	lKn: [.72, .76],
	rKn: [.76, .78],
	lAn: [.84, .8],
	rAn: [.88, .82],
	lHeel: [.86, .84],
	rHeel: [.9, .86]
};
function pingPong(t) {
	const x = t % 1;
	return x < .5 ? easeInOut(x * 2) : easeInOut(2 - x * 2);
}
function coachPose(exerciseId, tMs, tempoMs) {
	const t = pingPong(tMs / Math.max(tempoMs, 800) % 1);
	switch (exerciseId) {
		case "knee_squat": return fromJoints(mix(standSide, squatBottom, t));
		case "shoulder_raise": return fromJoints(mix(standFront, armsOut, t));
		case "hip_raise": return fromJoints(mix(lieStraight, lieLegUp, t));
		case "back_stretch": return fromJoints(mix(catPose, cowPose, t));
		case "glute_bridge": return fromJoints(mix(lieBent, bridgeTop, t));
		case "calf_raise": return fromJoints(mix(standSide, calfUp, t));
		case "side_leg_raise": return fromJoints(mix(standFront, sideLift, t));
		case "wall_sit": return fromJoints(wallSit);
		default: return fromJoints(standSide);
	}
}
var POSE_CONNECTIONS = [
	[11, 12],
	[11, 13],
	[13, 15],
	[12, 14],
	[14, 16],
	[11, 23],
	[12, 24],
	[23, 24],
	[23, 25],
	[25, 27],
	[27, 29],
	[27, 31],
	[24, 26],
	[26, 28],
	[28, 30],
	[28, 32]
];
function drawScene(ctx, opts) {
	const { width, height, landmarks, video, mirror, formOk, mode } = opts;
	ctx.save();
	ctx.clearRect(0, 0, width, height);
	if (mirror) {
		ctx.translate(width, 0);
		ctx.scale(-1, 1);
	}
	if (mode === "camera" && video && video.readyState >= 2) ctx.drawImage(video, 0, 0, width, height);
	else drawStudio(ctx, width, height);
	if (landmarks) drawSkeleton(ctx, landmarks, width, height, formOk ? "#c5cec4" : "#c47a6a", formOk ? "rgba(197,206,196,0.35)" : "rgba(196,122,106,0.4)");
	ctx.restore();
}
function drawStudio(ctx, w, h) {
	const g = ctx.createLinearGradient(0, 0, 0, h);
	g.addColorStop(0, "#141816");
	g.addColorStop(1, "#0c0f0d");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "rgba(238,240,236,0.05)";
	ctx.lineWidth = 1;
	const step = 48;
	for (let x = 0; x < w; x += step) {
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, h);
		ctx.stroke();
	}
	for (let y = 0; y < h; y += step) {
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(w, y);
		ctx.stroke();
	}
	ctx.fillStyle = "rgba(197,206,196,0.06)";
	ctx.beginPath();
	ctx.ellipse(w / 2, h * .9, w * .28, 18, 0, 0, Math.PI * 2);
	ctx.fill();
}
function drawSkeleton(ctx, lm, w, h, color, glow) {
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	ctx.strokeStyle = glow;
	ctx.lineWidth = 10;
	for (const [a, b] of POSE_CONNECTIONS) {
		const pa = lm[a];
		const pb = lm[b];
		if (!pa || !pb) continue;
		if ((pa.visibility ?? 1) < .3 || (pb.visibility ?? 1) < .3) continue;
		ctx.beginPath();
		ctx.moveTo(pa.x * w, pa.y * h);
		ctx.lineTo(pb.x * w, pb.y * h);
		ctx.stroke();
	}
	ctx.strokeStyle = color;
	ctx.lineWidth = 3.5;
	for (const [a, b] of POSE_CONNECTIONS) {
		const pa = lm[a];
		const pb = lm[b];
		if (!pa || !pb) continue;
		if ((pa.visibility ?? 1) < .3 || (pb.visibility ?? 1) < .3) continue;
		ctx.beginPath();
		ctx.moveTo(pa.x * w, pa.y * h);
		ctx.lineTo(pb.x * w, pb.y * h);
		ctx.stroke();
	}
	for (const p of lm) {
		if ((p.visibility ?? 1) < .35) continue;
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc(p.x * w, p.y * h, 4, 0, Math.PI * 2);
		ctx.fill();
	}
}
var P = {
	L_SHOULDER: 11,
	R_SHOULDER: 12,
	L_ELBOW: 13,
	R_ELBOW: 14,
	L_WRIST: 15,
	R_WRIST: 16,
	L_HIP: 23,
	R_HIP: 24,
	L_KNEE: 25,
	R_KNEE: 26,
	L_ANKLE: 27,
	R_ANKLE: 28,
	L_HEEL: 29,
	R_HEEL: 30
};
var MIN_REP_GAP = 550;
function empty(partial = {}) {
	return {
		angle: 0,
		secondaryAngle: null,
		feedback: "Step into frame",
		speak: false,
		stage: "up",
		formOk: true,
		formCue: null,
		event: "none",
		visibilityOk: false,
		missing: ["body"],
		holdSeconds: 0,
		...partial
	};
}
function idx(left) {
	return left ? {
		sh: P.L_SHOULDER,
		el: P.L_ELBOW,
		wr: P.L_WRIST,
		hp: P.L_HIP,
		kn: P.L_KNEE,
		an: P.L_ANKLE,
		heel: P.L_HEEL
	} : {
		sh: P.R_SHOULDER,
		el: P.R_ELBOW,
		wr: P.R_WRIST,
		hp: P.R_HIP,
		kn: P.R_KNEE,
		an: P.R_ANKLE,
		heel: P.R_HEEL
	};
}
function missingFor(lm, needed) {
	return needed.filter((n) => !visible(lm[n.idx])).map((n) => n.name);
}
function sideByMinAngle(lm, score) {
	const l = score(true);
	const r = score(false);
	if (l == null && r == null) return true;
	if (l == null) return false;
	if (r == null) return true;
	return l <= r;
}
function createTracker(exerciseId) {
	let stage = initialStage(exerciseId);
	let lastRepAt = 0;
	let holdMs = 0;
	let lastHoldCredit = 0;
	let visitedWork = false;
	function reset() {
		stage = initialStage(exerciseId);
		lastRepAt = 0;
		holdMs = 0;
		lastHoldCredit = 0;
		visitedWork = false;
	}
	function maybeRep(now) {
		if (!visitedWork) return "none";
		if (now - lastRepAt < MIN_REP_GAP) return "none";
		lastRepAt = now;
		visitedWork = false;
		return "rep";
	}
	function tick(landmarks, now) {
		if (!landmarks || landmarks.length < 33) return empty({
			stage,
			feedback: "No person detected"
		});
		try {
			switch (exerciseId) {
				case "knee_squat": {
					const S = idx(sideByMinAngle(landmarks, (L) => {
						const S = idx(L);
						if (!visible(landmarks[S.hp]) || !visible(landmarks[S.kn]) || !visible(landmarks[S.an])) return null;
						return calculateAngle(landmarks[S.hp], landmarks[S.kn], landmarks[S.an]);
					}));
					const miss = missingFor(landmarks, [
						{
							idx: S.hp,
							name: "hip"
						},
						{
							idx: S.kn,
							name: "knee"
						},
						{
							idx: S.an,
							name: "ankle"
						},
						{
							idx: S.sh,
							name: "shoulder"
						}
					]);
					if (miss.length) return empty({
						stage,
						missing: miss,
						feedback: `Show your ${miss[0]}`
					});
					const angle = calculateAngle(landmarks[S.hp], landmarks[S.kn], landmarks[S.an]);
					const back = calculateAngle(landmarks[S.sh], landmarks[S.hp], landmarks[S.kn]);
					let feedback = stage === "up" ? "Sit back" : "Stand tall";
					let speak = true;
					let formOk = true;
					let formCue = null;
					let event = "none";
					if (angle > 155) {
						if (stage === "down") event = maybeRep(now);
						feedback = event === "rep" ? "Good — that rep counts" : "Sit back";
						stage = "up";
					} else if (angle < 115) {
						visitedWork = true;
						feedback = "Stand tall";
						stage = "down";
					} else {
						feedback = stage === "up" ? "Keep sitting" : "Keep rising";
						speak = false;
					}
					if (stage === "down" && back < 85) {
						formOk = false;
						formCue = "Chest up — keep the back long";
						feedback = formCue;
						speak = true;
					}
					return {
						angle,
						secondaryAngle: back,
						feedback,
						speak,
						stage,
						formOk,
						formCue,
						event,
						visibilityOk: true,
						missing: [],
						holdSeconds: 0
					};
				}
				case "shoulder_raise": {
					const A = idx(sideByMinAngle(landmarks, (L) => {
						const S = idx(L);
						if (!visible(landmarks[S.el]) || !visible(landmarks[S.sh]) || !visible(landmarks[S.hp])) return null;
						return -calculateAngle(landmarks[S.el], landmarks[S.sh], landmarks[S.hp]);
					}));
					const miss = missingFor(landmarks, [
						{
							idx: A.el,
							name: "elbow"
						},
						{
							idx: A.sh,
							name: "shoulder"
						},
						{
							idx: A.hp,
							name: "hip"
						},
						{
							idx: A.wr,
							name: "wrist"
						}
					]);
					if (miss.length) return empty({
						stage,
						missing: miss,
						feedback: `Show your ${miss[0]}`
					});
					const angle = calculateAngle(landmarks[A.el], landmarks[A.sh], landmarks[A.hp]);
					const elbow = calculateAngle(landmarks[A.sh], landmarks[A.el], landmarks[A.wr]);
					let feedback = stage === "down" ? "Raise to shoulder" : "Lower slowly";
					let speak = true;
					let formOk = true;
					let formCue = null;
					let event = "none";
					if (angle < 35) {
						if (stage === "up") event = maybeRep(now);
						feedback = event === "rep" ? "Good — controlled lower" : "Raise to shoulder";
						stage = "down";
					} else if (angle > 72) {
						visitedWork = true;
						feedback = "Lower slowly";
						stage = "up";
					} else {
						feedback = stage === "down" ? "Raising" : "Lowering";
						speak = false;
					}
					if (stage === "up" && elbow < 145) {
						formOk = false;
						formCue = "Straighten the elbow";
						feedback = formCue;
						speak = true;
					}
					return {
						angle,
						secondaryAngle: elbow,
						feedback,
						speak,
						stage,
						formOk,
						formCue,
						event,
						visibilityOk: true,
						missing: [],
						holdSeconds: 0
					};
				}
				case "hip_raise": {
					const S = idx(sideByMinAngle(landmarks, (L) => {
						const S = idx(L);
						if (!visible(landmarks[S.sh]) || !visible(landmarks[S.hp]) || !visible(landmarks[S.kn])) return null;
						return calculateAngle(landmarks[S.sh], landmarks[S.hp], landmarks[S.kn]);
					}));
					const miss = missingFor(landmarks, [
						{
							idx: S.sh,
							name: "shoulder"
						},
						{
							idx: S.hp,
							name: "hip"
						},
						{
							idx: S.kn,
							name: "knee"
						}
					]);
					if (miss.length) return empty({
						stage,
						missing: miss,
						feedback: `Show your ${miss[0]}`
					});
					const angle = calculateAngle(landmarks[S.sh], landmarks[S.hp], landmarks[S.kn]);
					let feedback = stage === "up" ? "Raise the leg" : "Lower the leg";
					let speak = true;
					let event = "none";
					if (angle > 160) {
						if (stage === "down") event = maybeRep(now);
						feedback = event === "rep" ? "Good — switch if needed" : "Raise the leg";
						stage = "up";
					} else if (angle < 135) {
						visitedWork = true;
						feedback = "Lower the leg";
						stage = "down";
					} else {
						feedback = stage === "up" ? "Raising" : "Lowering";
						speak = false;
					}
					return {
						angle,
						secondaryAngle: null,
						feedback,
						speak,
						stage,
						formOk: true,
						formCue: null,
						event,
						visibilityOk: true,
						missing: [],
						holdSeconds: 0
					};
				}
				case "back_stretch": {
					const S = idx(true);
					const miss = missingFor(landmarks, [
						{
							idx: S.sh,
							name: "shoulder"
						},
						{
							idx: S.hp,
							name: "hip"
						},
						{
							idx: S.kn,
							name: "knee"
						}
					]);
					if (miss.length) return empty({
						stage,
						missing: miss,
						feedback: `Show your ${miss[0]}`
					});
					const angle = calculateAngle(landmarks[S.sh], landmarks[S.hp], landmarks[S.kn]);
					let feedback = stage === "up" ? "Dip the spine (cow)" : "Round the spine (cat)";
					let speak = true;
					let event = "none";
					if (angle > 125) {
						if (stage === "down") event = maybeRep(now);
						feedback = event === "rep" ? "Good cycle — breathe" : "Dip the spine (cow)";
						stage = "up";
					} else if (angle < 110) {
						visitedWork = true;
						feedback = "Round the spine (cat)";
						stage = "down";
					} else {
						feedback = stage === "up" ? "Dipping" : "Rounding";
						speak = false;
					}
					return {
						angle,
						secondaryAngle: null,
						feedback,
						speak,
						stage,
						formOk: true,
						formCue: null,
						event,
						visibilityOk: true,
						missing: [],
						holdSeconds: 0
					};
				}
				case "glute_bridge": {
					const S = idx(sideByMinAngle(landmarks, (L) => {
						const S = idx(L);
						if (!visible(landmarks[S.sh]) || !visible(landmarks[S.hp]) || !visible(landmarks[S.kn])) return null;
						return -calculateAngle(landmarks[S.sh], landmarks[S.hp], landmarks[S.kn]);
					}));
					const miss = missingFor(landmarks, [
						{
							idx: S.sh,
							name: "shoulder"
						},
						{
							idx: S.hp,
							name: "hip"
						},
						{
							idx: S.kn,
							name: "knee"
						}
					]);
					if (miss.length) return empty({
						stage,
						missing: miss,
						feedback: `Show your ${miss[0]}`
					});
					const angle = calculateAngle(landmarks[S.sh], landmarks[S.hp], landmarks[S.kn]);
					let feedback = stage === "down" ? "Lift the hips" : "Lower the hips";
					let speak = true;
					let formOk = true;
					let formCue = null;
					let event = "none";
					if (angle < 125) {
						if (stage === "up") event = maybeRep(now);
						feedback = event === "rep" ? "Good — ribs heavy" : "Lift the hips";
						stage = "down";
					} else if (angle > 150) {
						visitedWork = true;
						feedback = "Lower the hips";
						stage = "up";
						if (angle > 176) {
							formOk = false;
							formCue = "Stop short — do not flare the ribs";
							feedback = formCue;
						}
					} else {
						feedback = stage === "down" ? "Lifting" : "Lowering";
						speak = false;
					}
					return {
						angle,
						secondaryAngle: null,
						feedback,
						speak,
						stage,
						formOk,
						formCue,
						event,
						visibilityOk: true,
						missing: [],
						holdSeconds: 0
					};
				}
				case "calf_raise": {
					const S = idx(true);
					const miss = missingFor(landmarks, [
						{
							idx: S.kn,
							name: "knee"
						},
						{
							idx: S.an,
							name: "ankle"
						},
						{
							idx: S.heel,
							name: "heel"
						}
					]);
					if (miss.length) return empty({
						stage,
						missing: miss,
						feedback: `Show your ${miss[0]}`
					});
					const heelBelow = landmarks[S.heel].y - landmarks[S.an].y;
					const knee = calculateAngle(landmarks[S.hp], landmarks[S.kn], landmarks[S.an]);
					const angle = Math.round(Math.max(0, heelBelow * 1e3));
					let feedback = stage === "down" ? "Rise onto toes" : "Lower the heels";
					let speak = true;
					let formOk = true;
					let formCue = null;
					let event = "none";
					if (heelBelow > .028) {
						if (stage === "up") event = maybeRep(now);
						feedback = event === "rep" ? "Good — full lower" : "Rise onto toes";
						stage = "down";
					} else if (heelBelow < .01) {
						visitedWork = true;
						feedback = "Lower the heels";
						stage = "up";
					} else {
						feedback = stage === "down" ? "Rising" : "Lowering";
						speak = false;
					}
					if (knee < 150) {
						formOk = false;
						formCue = "Keep the knees quiet";
						feedback = formCue;
						speak = true;
					}
					return {
						angle,
						secondaryAngle: knee,
						feedback,
						speak,
						stage,
						formOk,
						formCue,
						event,
						visibilityOk: true,
						missing: [],
						holdSeconds: 0
					};
				}
				case "side_leg_raise": {
					const S = idx(sideByMinAngle(landmarks, (L) => {
						const S = idx(L);
						if (!visible(landmarks[S.sh]) || !visible(landmarks[S.hp]) || !visible(landmarks[S.an])) return null;
						return calculateAngle(landmarks[S.sh], landmarks[S.hp], landmarks[S.an]);
					}));
					const miss = missingFor(landmarks, [
						{
							idx: S.sh,
							name: "shoulder"
						},
						{
							idx: S.hp,
							name: "hip"
						},
						{
							idx: S.an,
							name: "ankle"
						}
					]);
					if (miss.length) return empty({
						stage,
						missing: miss,
						feedback: `Show your ${miss[0]}`
					});
					const angle = calculateAngle(landmarks[S.sh], landmarks[S.hp], landmarks[S.an]);
					let feedback = stage === "down" ? "Lift to the side" : "Lower the leg";
					let speak = true;
					let formOk = true;
					let formCue = null;
					let event = "none";
					if (angle > 165) {
						if (stage === "up") event = maybeRep(now);
						feedback = event === "rep" ? "Good — pelvis still" : "Lift to the side";
						stage = "down";
					} else if (angle < 150) {
						visitedWork = true;
						feedback = "Lower the leg";
						stage = "up";
					} else {
						feedback = stage === "down" ? "Lifting" : "Lowering";
						speak = false;
					}
					if (Math.abs(landmarks[S.sh].x - landmarks[S.hp].x) > .14 && stage === "up") {
						formOk = false;
						formCue = "Do not lean — lift from the hip";
						feedback = formCue;
						speak = true;
					}
					return {
						angle,
						secondaryAngle: null,
						feedback,
						speak,
						stage,
						formOk,
						formCue,
						event,
						visibilityOk: true,
						missing: [],
						holdSeconds: 0
					};
				}
				case "wall_sit": {
					const S = idx(true);
					const miss = missingFor(landmarks, [
						{
							idx: S.hp,
							name: "hip"
						},
						{
							idx: S.kn,
							name: "knee"
						},
						{
							idx: S.an,
							name: "ankle"
						}
					]);
					if (miss.length) {
						holdMs = 0;
						lastHoldCredit = 0;
						return empty({
							stage,
							missing: miss,
							feedback: `Show your ${miss[0]}`
						});
					}
					const angle = calculateAngle(landmarks[S.hp], landmarks[S.kn], landmarks[S.an]);
					let feedback = "Bend to about 90°";
					let speak = true;
					let formOk = true;
					let formCue = null;
					let event = "none";
					if (angle >= 72 && angle <= 120) {
						stage = "hold";
						if (lastHoldCredit === 0) lastHoldCredit = now;
						const prevHold = holdMs;
						holdMs += Math.min(120, Math.max(0, now - lastHoldCredit));
						lastHoldCredit = now;
						if (Math.floor(holdMs / 1e3) > Math.floor(prevHold / 1e3)) event = "hold_second";
						const sec = Math.floor(holdMs / 1e3);
						feedback = `Hold — ${sec}s`;
						speak = event === "hold_second" && sec > 0 && sec % 5 === 0;
					} else {
						lastHoldCredit = now;
						stage = "down";
						if (angle > 130) {
							feedback = "Slide lower — closer to 90°";
							formOk = false;
							formCue = feedback;
						} else if (angle < 68) {
							feedback = "Come up a little — too deep";
							formOk = false;
							formCue = feedback;
						} else {
							feedback = "Find the sit and hold";
							speak = false;
						}
					}
					return {
						angle,
						secondaryAngle: null,
						feedback,
						speak,
						stage,
						formOk,
						formCue,
						event,
						visibilityOk: true,
						missing: [],
						holdSeconds: Math.floor(holdMs / 1e3)
					};
				}
				default: return empty({ feedback: "This drill is not wired yet." });
			}
		} catch {
			return empty({
				stage,
				feedback: "Step into frame"
			});
		}
	}
	return {
		tick,
		reset,
		getStage: () => stage
	};
}
function initialStage(id) {
	switch (id) {
		case "shoulder_raise":
		case "glute_bridge":
		case "calf_raise":
		case "side_leg_raise":
		case "wall_sit": return "down";
		default: return "up";
	}
}
var SCRIPTS = ["https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/pose.js", "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3.1675466027/camera_utils.js"];
function loadScript(src) {
	return new Promise((resolve, reject) => {
		if (document.querySelector(`script[src="${src}"]`)) {
			resolve();
			return;
		}
		const s = document.createElement("script");
		s.src = src;
		s.async = true;
		s.crossOrigin = "anonymous";
		s.onload = () => resolve();
		s.onerror = () => reject(/* @__PURE__ */ new Error(`Failed to load ${src}`));
		document.head.appendChild(s);
	});
}
async function loadPoseLib() {
	for (const src of SCRIPTS) await loadScript(src);
	if (!window.Pose) throw new Error("Pose library missing");
}
async function startCamera(video) {
	const stream = await navigator.mediaDevices.getUserMedia({
		video: {
			facingMode: "user",
			width: { ideal: 640 },
			height: { ideal: 480 }
		},
		audio: false
	});
	video.srcObject = stream;
	video.playsInline = true;
	video.muted = true;
	await video.play();
	return stream;
}
function stopStream(stream) {
	stream?.getTracks().forEach((t) => t.stop());
}
function createPose() {
	if (!window.Pose) throw new Error("Pose library missing");
	const pose = new window.Pose({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${file}` });
	pose.setOptions({
		modelComplexity: 1,
		smoothLandmarks: true,
		minDetectionConfidence: .5,
		minTrackingConfidence: .5
	});
	return pose;
}
function speak(text, enabled) {
	if (!enabled || typeof window === "undefined" || !text) return;
	const synth = window.speechSynthesis;
	if (!synth) return;
	synth.cancel();
	const u = new SpeechSynthesisUtterance(text);
	u.lang = "en-US";
	u.rate = 1.05;
	u.pitch = 1;
	synth.speak(u);
}
function silence() {
	if (typeof window === "undefined") return;
	window.speechSynthesis?.cancel();
}
function SessionPage() {
	const { id } = Route.useParams();
	const search = Route.useSearch();
	const navigate = useNavigate();
	const ex = EXERCISE_MAP[id];
	const voiceDefault = usePhysio((s) => s.profile.voiceEnabled);
	const addSession = usePhysio((s) => s.addSession);
	const videoRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const poseRef = (0, import_react.useRef)(null);
	const rafRef = (0, import_react.useRef)(0);
	const trackerRef = (0, import_react.useRef)(createTracker(id ?? "knee_squat"));
	const lastSpeak = (0, import_react.useRef)("");
	const startedAt = (0, import_react.useRef)(Date.now());
	const formFrames = (0, import_react.useRef)({
		good: 0,
		total: 0
	});
	const cueCount = (0, import_react.useRef)({});
	const landmarksRef = (0, import_react.useRef)(null);
	const restUntil = (0, import_react.useRef)(0);
	const coachOrigin = (0, import_react.useRef)(Date.now());
	const lastHud = (0, import_react.useRef)(0);
	const phaseRef = (0, import_react.useRef)("live");
	const voiceRef = (0, import_react.useRef)(voiceDefault);
	const countRef = (0, import_react.useRef)(0);
	const setRef = (0, import_react.useRef)(0);
	const savedRef = (0, import_react.useRef)(false);
	const [mode, setMode] = (0, import_react.useState)(search.source ?? "coach");
	const [camError, setCamError] = (0, import_react.useState)(null);
	const [voice, setVoice] = (0, import_react.useState)(voiceDefault);
	const [phase, setPhase] = (0, import_react.useState)("live");
	const [setIdx, setSetIdx] = (0, import_react.useState)(0);
	const [count, setCount] = (0, import_react.useState)(0);
	const [hud, setHud] = (0, import_react.useState)({
		angle: 0,
		feedback: "Get ready",
		formOk: true,
		missing: []
	});
	const [restLeft, setRestLeft] = (0, import_react.useState)(0);
	const [painAfter, setPainAfter] = (0, import_react.useState)(search.pain ?? 3);
	const [formScore, setFormScore] = (0, import_react.useState)(90);
	voiceRef.current = voice;
	phaseRef.current = phase;
	countRef.current = count;
	setRef.current = setIdx;
	const target = ex?.target ?? 10;
	const sets = ex?.sets ?? 3;
	function beginRest() {
		if (setRef.current + 1 >= sets) {
			phaseRef.current = "done";
			setPhase("done");
			const { good, total } = formFrames.current;
			setFormScore(total ? Math.round(good / total * 100) : 90);
			silence();
			return;
		}
		phaseRef.current = "rest";
		setPhase("rest");
		restUntil.current = Date.now() + (ex?.restSec ?? 30) * 1e3;
		speak("Rest. Next set coming.", voiceRef.current);
	}
	function applyEval(result) {
		if (phaseRef.current !== "live") return;
		if (result.visibilityOk) {
			formFrames.current.total += 1;
			if (result.formOk) formFrames.current.good += 1;
		}
		if (result.formCue) cueCount.current[result.formCue] = (cueCount.current[result.formCue] ?? 0) + 1;
		if (result.event === "rep" || result.event === "hold_second") {
			const next = countRef.current + 1;
			countRef.current = next;
			setCount(next);
			if (next >= target) beginRest();
		}
		if (result.speak && result.feedback && result.feedback !== lastSpeak.current) {
			lastSpeak.current = result.feedback;
			speak(result.feedback, voiceRef.current);
		}
		const now = Date.now();
		if (now - lastHud.current > 80) {
			lastHud.current = now;
			setHud({
				angle: Math.round(result.angle),
				feedback: result.feedback,
				formOk: result.formOk,
				missing: result.missing
			});
		}
	}
	function paint() {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		drawScene(ctx, {
			width: canvas.width,
			height: canvas.height,
			landmarks: landmarksRef.current,
			video: videoRef.current,
			mirror: mode === "camera",
			formOk: hud.formOk,
			mode
		});
	}
	(0, import_react.useEffect)(() => {
		if (!ex) return;
		let cancelled = false;
		trackerRef.current = createTracker(ex.id);
		coachOrigin.current = Date.now();
		startedAt.current = Date.now();
		const stepCoach = () => {
			if (cancelled) return;
			const now = Date.now();
			const ph = phaseRef.current;
			if (ph === "rest") {
				const left = Math.max(0, Math.ceil((restUntil.current - now) / 1e3));
				setRestLeft(left);
				if (left <= 0) {
					setRef.current += 1;
					setSetIdx(setRef.current);
					countRef.current = 0;
					setCount(0);
					phaseRef.current = "live";
					setPhase("live");
					trackerRef.current.reset();
					coachOrigin.current = now;
					speak("Begin.", voiceRef.current);
				}
			} else if (ph === "live") {
				const t = now - coachOrigin.current;
				const pose = coachPose(ex.id, t, ex.tempoMs);
				landmarksRef.current = pose;
				applyEval(trackerRef.current.tick(pose, now));
			}
			paint();
			rafRef.current = requestAnimationFrame(stepCoach);
		};
		const start = async () => {
			if (mode !== "camera") {
				stepCoach();
				return;
			}
			try {
				await loadPoseLib();
				if (cancelled) return;
				const video = videoRef.current;
				if (!video) throw new Error("No video element");
				streamRef.current = await startCamera(video);
				const pose = createPose();
				poseRef.current = pose;
				pose.onResults((r) => {
					if (cancelled) return;
					const now = Date.now();
					const ph = phaseRef.current;
					if (ph === "rest") {
						const left = Math.max(0, Math.ceil((restUntil.current - now) / 1e3));
						setRestLeft(left);
						if (left <= 0) {
							setRef.current += 1;
							setSetIdx(setRef.current);
							countRef.current = 0;
							setCount(0);
							phaseRef.current = "live";
							setPhase("live");
							trackerRef.current.reset();
							speak("Begin.", voiceRef.current);
						}
					} else if (ph === "live") {
						landmarksRef.current = r.poseLandmarks ?? null;
						applyEval(trackerRef.current.tick(r.poseLandmarks, now));
					}
					if (video.videoWidth && canvasRef.current) {
						canvasRef.current.width = video.videoWidth;
						canvasRef.current.height = video.videoHeight;
					}
					paint();
				});
				const tick = async () => {
					if (cancelled) return;
					if (video.readyState >= 2) await pose.send({ image: video });
					rafRef.current = requestAnimationFrame(tick);
				};
				tick();
			} catch (err) {
				setCamError(err instanceof Error ? err.message : "Camera unavailable");
				setMode("coach");
			}
		};
		start();
		return () => {
			cancelled = true;
			cancelAnimationFrame(rafRef.current);
			poseRef.current?.close();
			poseRef.current = null;
			stopStream(streamRef.current);
			streamRef.current = null;
			silence();
		};
	}, [ex, mode]);
	if (!ex) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Unknown drill." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/exercises",
			children: "Library"
		})]
	});
	const topCue = Object.entries(cueCount.current).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
	const counted = setIdx * target + Math.min(count, target);
	const progressPct = counted / (sets * target) * 100;
	const unit = ex.mode === "hold" ? "s" : "";
	const saveAndLeave = (after) => {
		if (!savedRef.current) {
			savedRef.current = true;
			addSession({
				exerciseId: ex.id,
				reps: counted,
				setsCompleted: phase === "done" ? sets : setIdx + (count > 0 ? 1 : 0),
				targetReps: target * sets,
				durationSec: Math.round((Date.now() - startedAt.current) / 1e3),
				formScore,
				painBefore: search.pain ?? null,
				painAfter: after,
				topCue,
				source: mode
			});
		}
		navigate({ to: "/" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-studio text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-2 px-3 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => {
							if (phase === "done") saveAndLeave(painAfter);
							else {
								phaseRef.current = "done";
								setPhase("done");
								const { good, total } = formFrames.current;
								setFormScore(total ? Math.round(good / total * 100) : 90);
								silence();
							}
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Exit"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: ex.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-muted-foreground",
							children: [
								"Set ",
								Math.min(setIdx + 1, sets),
								" / ",
								sets
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": voice ? "Mute voice" : "Enable voice",
							onClick: () => {
								setVoice((v) => !v);
								if (voice) silence();
							},
							children: voice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "Toggle camera",
							onClick: () => {
								stopStream(streamRef.current);
								streamRef.current = null;
								setMode((m) => m === "camera" ? "coach" : "camera");
								setCamError(null);
							},
							children: mode === "camera" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonStanding, { className: "size-4" })
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto w-full max-w-3xl flex-1 px-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						ref: videoRef,
						className: "hidden",
						playsInline: true,
						muted: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
						ref: canvasRef,
						width: 640,
						height: 480,
						className: "aspect-[4/3] w-full rounded-xl bg-card object-cover shadow-[var(--shadow-border)]"
					}),
					phase === "rest" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-3 flex flex-col items-center justify-center rounded-xl bg-background/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-[0.18em] text-muted-foreground uppercase",
								children: "Rest"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-7xl tabular-nums",
								children: restLeft
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								className: "mt-4",
								onClick: () => {
									restUntil.current = Date.now();
								},
								children: "Skip rest"
							})
						]
					}),
					camError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: ["Camera unavailable — coach is running the tempo. ", camError]
					}),
					mode === "coach" && !camError && phase === "live" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Coach mode · follow the skeleton, or tap to count if you are ahead."
					})
				]
			}),
			phase !== "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto w-full max-w-3xl px-3 pt-4 pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: progressPct,
						className: "mb-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HudCell, {
								label: ex.mode === "hold" ? "Hold" : "Reps",
								value: `${Math.min(count, target)}${unit}`,
								hint: `target ${target}${unit}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HudCell, {
								label: "Cue",
								value: hud.feedback,
								hint: hud.formOk ? "Form ok" : "Fix this",
								warn: !hud.formOk
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HudCell, {
								label: "Angle",
								value: `${hud.angle}°`,
								hint: "working joint"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							className: "flex-1",
							onClick: () => {
								const next = countRef.current + 1;
								countRef.current = next;
								setCount(next);
								if (next >= target) beginRest();
							},
							children: ["Count ", ex.mode === "hold" ? "second" : "rep"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: beginRest,
							children: "End set"
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto w-full max-w-lg px-3 pt-4 pb-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "good",
							children: "Ready to save"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-3xl tracking-tight",
							children: "How did that feel?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: [
								counted,
								" counted · form ",
								formScore,
								"%"
							]
						}),
						topCue && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 rounded-md bg-secondary px-3 py-2 text-sm",
							children: ["Most frequent cue: ", topCue]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PainCheck, {
								label: "Pain after",
								value: painAfter,
								onChange: setPainAfter
							})
						}),
						search.pain != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: [
								"Pain ",
								search.pain,
								" → ",
								painAfter,
								painAfter < search.pain ? " — trending down." : painAfter > search.pain ? " — if it jumped, stop for today." : " — unchanged."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-6 w-full",
							size: "lg",
							onClick: () => saveAndLeave(painAfter),
							children: "Save and go home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							className: "mt-2 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/exercises/$id",
								params: { id: ex.id },
								children: "Repeat this drill"
							})
						})
					]
				})
			})
		]
	});
}
function HudCell({ label, value, hint, warn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-card px-3 py-3 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-wide text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-1 line-clamp-2 font-display text-lg leading-tight tracking-tight", warn && "text-destructive"),
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] text-muted-foreground",
				children: hint
			})
		]
	});
}
//#endregion
export { SessionPage as component };
