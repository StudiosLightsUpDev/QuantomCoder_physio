import type { Landmark } from "./types";
import { POSE_CONNECTIONS } from "./skeleton";

export function drawScene(
  ctx: CanvasRenderingContext2D,
  opts: {
    width: number;
    height: number;
    landmarks: Landmark[] | null;
    video?: HTMLVideoElement | null;
    mirror?: boolean;
    formOk: boolean;
    mode: "camera" | "coach";
  },
) {
  const { width, height, landmarks, video, mirror, formOk, mode } = opts;
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  if (mirror) {
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
  }

  if (mode === "camera" && video && video.readyState >= 2) {
    ctx.drawImage(video, 0, 0, width, height);
  } else {
    drawStudio(ctx, width, height);
  }

  if (landmarks) {
    const color = formOk ? "#c5cec4" : "#c47a6a";
    const glow = formOk ? "rgba(197,206,196,0.35)" : "rgba(196,122,106,0.4)";
    drawSkeleton(ctx, landmarks, width, height, color, glow);
  }

  ctx.restore();
}

function drawStudio(ctx: CanvasRenderingContext2D, w: number, h: number) {
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
  ctx.ellipse(w / 2, h * 0.9, w * 0.28, 18, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawSkeleton(
  ctx: CanvasRenderingContext2D,
  lm: Landmark[],
  w: number,
  h: number,
  color: string,
  glow: string,
) {
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = glow;
  ctx.lineWidth = 10;
  for (const [a, b] of POSE_CONNECTIONS) {
    const pa = lm[a];
    const pb = lm[b];
    if (!pa || !pb) continue;
    if ((pa.visibility ?? 1) < 0.3 || (pb.visibility ?? 1) < 0.3) continue;
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
    if ((pa.visibility ?? 1) < 0.3 || (pb.visibility ?? 1) < 0.3) continue;
    ctx.beginPath();
    ctx.moveTo(pa.x * w, pa.y * h);
    ctx.lineTo(pb.x * w, pb.y * h);
    ctx.stroke();
  }
  for (const p of lm) {
    if ((p.visibility ?? 1) < 0.35) continue;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(p.x * w, p.y * h, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}
