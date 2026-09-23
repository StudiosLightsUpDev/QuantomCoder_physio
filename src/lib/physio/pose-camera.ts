import type { Landmark } from "./types";

const SCRIPTS = [
  "https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/pose.js",
  "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3.1675466027/camera_utils.js",
];

declare global {
  interface Window {
    Pose?: new (opts: { locateFile: (f: string) => string }) => {
      setOptions: (o: Record<string, unknown>) => void;
      onResults: (cb: (r: { poseLandmarks?: Landmark[] }) => void) => void;
      send: (s: { image: HTMLVideoElement }) => Promise<void>;
      close: () => void;
    };
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.crossOrigin = "anonymous";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

export async function loadPoseLib() {
  for (const src of SCRIPTS) await loadScript(src);
  if (!window.Pose) throw new Error("Pose library missing");
}

export async function startCamera(video: HTMLVideoElement): Promise<MediaStream> {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
    audio: false,
  });
  video.srcObject = stream;
  video.playsInline = true;
  video.muted = true;
  await video.play();
  return stream;
}

export function stopStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((t) => t.stop());
}

export function createPose() {
  if (!window.Pose) throw new Error("Pose library missing");
  const pose = new window.Pose({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${file}`,
  });
  pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });
  return pose;
}
