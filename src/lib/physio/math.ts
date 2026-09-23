import type { Landmark } from "./types";

export function calculateAngle(p1: Landmark, p2: Landmark, p3: Landmark): number {
  const angle =
    Math.atan2(p3.y - p2.y, p3.x - p2.x) - Math.atan2(p1.y - p2.y, p1.x - p2.x);
  let degrees = Math.abs((angle * 180) / Math.PI);
  if (degrees > 180) degrees = 360 - degrees;
  return degrees;
}

export function visible(lm: Landmark | undefined, threshold = 0.45): boolean {
  if (!lm) return false;
  if (lm.visibility === undefined) return true;
  return lm.visibility >= threshold;
}

export function pickSide(
  landmarks: Landmark[],
  leftIdx: number,
  rightIdx: number,
): "left" | "right" {
  const l = landmarks[leftIdx]?.visibility ?? 0;
  const r = landmarks[rightIdx]?.visibility ?? 0;
  return l >= r ? "left" : "right";
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
