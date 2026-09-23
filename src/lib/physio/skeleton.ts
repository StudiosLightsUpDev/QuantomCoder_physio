import type { ExerciseId, Landmark } from "./types";
import { easeInOut, lerp } from "./math";

function lm(x: number, y: number, vis = 0.99): Landmark {
  return { x, y, z: 0, visibility: vis };
}

type Joints = {
  nose: [number, number];
  lSh: [number, number];
  rSh: [number, number];
  lEl: [number, number];
  rEl: [number, number];
  lWr: [number, number];
  rWr: [number, number];
  lHip: [number, number];
  rHip: [number, number];
  lKn: [number, number];
  rKn: [number, number];
  lAn: [number, number];
  rAn: [number, number];
  lHeel: [number, number];
  rHeel: [number, number];
};

function fromJoints(j: Joints): Landmark[] {
  const out: Landmark[] = Array.from({ length: 33 }, () => lm(0.5, 0.5, 0.35));
  out[0] = lm(...j.nose);
  for (let i = 1; i <= 10; i++) {
    out[i] = lm(j.nose[0] + (i % 2 ? -0.015 : 0.015), j.nose[1] + 0.02, 0.7);
  }
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
  out[31] = lm(j.lAn[0] + 0.05, j.lAn[1]);
  out[32] = lm(j.rAn[0] + 0.05, j.rAn[1]);
  return out;
}

function mix(a: Joints, b: Joints, t: number): Joints {
  const p = (x: [number, number], y: [number, number]): [number, number] => [
    lerp(x[0], y[0], t),
    lerp(x[1], y[1], t),
  ];
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
    rHeel: p(a.rHeel, b.rHeel),
  };
}

const standSide: Joints = {
  nose: [0.52, 0.14],
  lSh: [0.48, 0.24],
  rSh: [0.54, 0.24],
  lEl: [0.46, 0.38],
  rEl: [0.56, 0.38],
  lWr: [0.45, 0.5],
  rWr: [0.57, 0.5],
  lHip: [0.48, 0.5],
  rHip: [0.54, 0.5],
  lKn: [0.5, 0.71],
  rKn: [0.56, 0.71],
  lAn: [0.5, 0.92],
  rAn: [0.56, 0.92],
  lHeel: [0.46, 0.96],
  rHeel: [0.52, 0.96],
};

const squatBottom: Joints = {
  nose: [0.42, 0.3],
  lSh: [0.38, 0.4],
  rSh: [0.44, 0.4],
  lEl: [0.34, 0.52],
  rEl: [0.46, 0.52],
  lWr: [0.32, 0.62],
  rWr: [0.48, 0.62],
  lHip: [0.34, 0.62],
  rHip: [0.4, 0.62],
  lKn: [0.6, 0.72],
  rKn: [0.66, 0.72],
  lAn: [0.5, 0.92],
  rAn: [0.56, 0.92],
  lHeel: [0.46, 0.96],
  rHeel: [0.52, 0.96],
};

const standFront: Joints = {
  nose: [0.5, 0.12],
  lSh: [0.38, 0.24],
  rSh: [0.62, 0.24],
  lEl: [0.34, 0.4],
  rEl: [0.66, 0.4],
  lWr: [0.32, 0.54],
  rWr: [0.68, 0.54],
  lHip: [0.42, 0.5],
  rHip: [0.58, 0.5],
  lKn: [0.42, 0.72],
  rKn: [0.58, 0.72],
  lAn: [0.42, 0.92],
  rAn: [0.58, 0.92],
  lHeel: [0.4, 0.96],
  rHeel: [0.56, 0.96],
};

const armsOut: Joints = {
  ...standFront,
  lEl: [0.2, 0.26],
  rEl: [0.8, 0.26],
  lWr: [0.06, 0.26],
  rWr: [0.94, 0.26],
};

const lieStraight: Joints = {
  nose: [0.16, 0.38],
  lSh: [0.26, 0.42],
  rSh: [0.28, 0.48],
  lEl: [0.24, 0.54],
  rEl: [0.3, 0.58],
  lWr: [0.22, 0.64],
  rWr: [0.28, 0.68],
  lHip: [0.5, 0.44],
  rHip: [0.52, 0.5],
  lKn: [0.72, 0.44],
  rKn: [0.72, 0.52],
  lAn: [0.9, 0.44],
  rAn: [0.9, 0.52],
  lHeel: [0.92, 0.48],
  rHeel: [0.92, 0.56],
};

const lieLegUp: Joints = {
  ...lieStraight,
  lKn: [0.62, 0.22],
  lAn: [0.72, 0.08],
  lHeel: [0.74, 0.12],
};

const lieBent: Joints = {
  nose: [0.2, 0.42],
  lSh: [0.3, 0.5],
  rSh: [0.32, 0.56],
  lEl: [0.28, 0.64],
  rEl: [0.34, 0.68],
  lWr: [0.26, 0.76],
  rWr: [0.32, 0.8],
  lHip: [0.5, 0.52],
  rHip: [0.52, 0.56],
  lKn: [0.68, 0.38],
  rKn: [0.7, 0.42],
  lAn: [0.78, 0.62],
  rAn: [0.8, 0.66],
  lHeel: [0.76, 0.66],
  rHeel: [0.78, 0.7],
};

const bridgeTop: Joints = {
  nose: [0.22, 0.48],
  lSh: [0.32, 0.62],
  rSh: [0.34, 0.66],
  lEl: [0.3, 0.74],
  rEl: [0.36, 0.78],
  lWr: [0.28, 0.84],
  rWr: [0.34, 0.86],
  lHip: [0.52, 0.28],
  rHip: [0.54, 0.32],
  lKn: [0.7, 0.4],
  rKn: [0.72, 0.44],
  lAn: [0.8, 0.64],
  rAn: [0.82, 0.68],
  lHeel: [0.78, 0.68],
  rHeel: [0.8, 0.72],
};

const calfUp: Joints = {
  ...standSide,
  nose: [0.52, 0.1],
  lSh: [0.48, 0.2],
  rSh: [0.54, 0.2],
  lHip: [0.48, 0.46],
  rHip: [0.54, 0.46],
  lKn: [0.5, 0.66],
  rKn: [0.56, 0.66],
  lAn: [0.51, 0.86],
  rAn: [0.57, 0.86],
  lHeel: [0.5, 0.865],
  rHeel: [0.56, 0.865],
};

const sideLift: Joints = {
  ...standFront,
  lKn: [0.22, 0.6],
  lAn: [0.08, 0.58],
  lHeel: [0.06, 0.62],
};

const wallSit: Joints = {
  nose: [0.46, 0.26],
  lSh: [0.4, 0.36],
  rSh: [0.46, 0.36],
  lEl: [0.38, 0.5],
  rEl: [0.48, 0.5],
  lWr: [0.36, 0.62],
  rWr: [0.5, 0.62],
  lHip: [0.4, 0.58],
  rHip: [0.46, 0.58],
  lKn: [0.6, 0.72],
  rKn: [0.66, 0.72],
  lAn: [0.52, 0.92],
  rAn: [0.58, 0.92],
  lHeel: [0.48, 0.96],
  rHeel: [0.54, 0.96],
};

const catPose: Joints = {
  nose: [0.18, 0.42],
  lSh: [0.3, 0.5],
  rSh: [0.34, 0.52],
  lEl: [0.28, 0.66],
  rEl: [0.34, 0.68],
  lWr: [0.26, 0.8],
  rWr: [0.32, 0.82],
  lHip: [0.56, 0.32],
  rHip: [0.6, 0.34],
  lKn: [0.78, 0.52],
  rKn: [0.82, 0.54],
  lAn: [0.86, 0.7],
  rAn: [0.9, 0.72],
  lHeel: [0.88, 0.74],
  rHeel: [0.92, 0.76],
};

const cowPose: Joints = {
  nose: [0.16, 0.28],
  lSh: [0.32, 0.46],
  rSh: [0.36, 0.5],
  lEl: [0.3, 0.64],
  rEl: [0.36, 0.66],
  lWr: [0.28, 0.8],
  rWr: [0.34, 0.82],
  lHip: [0.58, 0.62],
  rHip: [0.62, 0.64],
  lKn: [0.72, 0.76],
  rKn: [0.76, 0.78],
  lAn: [0.84, 0.8],
  rAn: [0.88, 0.82],
  lHeel: [0.86, 0.84],
  rHeel: [0.9, 0.86],
};

function pingPong(t: number): number {
  const x = t % 1;
  return x < 0.5 ? easeInOut(x * 2) : easeInOut(2 - x * 2);
}

export function coachPose(exerciseId: ExerciseId, tMs: number, tempoMs: number): Landmark[] {
  const t = pingPong((tMs / Math.max(tempoMs, 800)) % 1);
  switch (exerciseId) {
    case "knee_squat":
      return fromJoints(mix(standSide, squatBottom, t));
    case "shoulder_raise":
      return fromJoints(mix(standFront, armsOut, t));
    case "hip_raise":
      return fromJoints(mix(lieStraight, lieLegUp, t));
    case "back_stretch":
      return fromJoints(mix(catPose, cowPose, t));
    case "glute_bridge":
      return fromJoints(mix(lieBent, bridgeTop, t));
    case "calf_raise":
      return fromJoints(mix(standSide, calfUp, t));
    case "side_leg_raise":
      return fromJoints(mix(standFront, sideLift, t));
    case "wall_sit":
      return fromJoints(wallSit);
    default:
      return fromJoints(standSide);
  }
}

export const POSE_CONNECTIONS: [number, number][] = [
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
  [28, 32],
];
