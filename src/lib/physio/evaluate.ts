import type { EvalResult, ExerciseId, Landmark, Stage } from "./types";
import { calculateAngle, visible } from "./math";

const P = {
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
  R_HEEL: 30,
} as const;

const MIN_REP_GAP = 550;

function empty(partial: Partial<EvalResult> = {}): EvalResult {
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
    ...partial,
  };
}

function idx(left: boolean) {
  return left
    ? { sh: P.L_SHOULDER, el: P.L_ELBOW, wr: P.L_WRIST, hp: P.L_HIP, kn: P.L_KNEE, an: P.L_ANKLE, heel: P.L_HEEL }
    : { sh: P.R_SHOULDER, el: P.R_ELBOW, wr: P.R_WRIST, hp: P.R_HIP, kn: P.R_KNEE, an: P.R_ANKLE, heel: P.R_HEEL };
}

function missingFor(lm: Landmark[], needed: { idx: number; name: string }[]): string[] {
  return needed.filter((n) => !visible(lm[n.idx])).map((n) => n.name);
}

function sideByMinAngle(
  lm: Landmark[],
  score: (left: boolean) => number | null,
): boolean {
  const l = score(true);
  const r = score(false);
  if (l == null && r == null) return true;
  if (l == null) return false;
  if (r == null) return true;
  return l <= r;
}

export function createTracker(exerciseId: ExerciseId) {
  let stage: Stage = initialStage(exerciseId);
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

  function maybeRep(now: number): "rep" | "none" {
    if (!visitedWork) return "none";
    if (now - lastRepAt < MIN_REP_GAP) return "none";
    lastRepAt = now;
    visitedWork = false;
    return "rep";
  }

  function tick(landmarks: Landmark[] | undefined, now: number): EvalResult {
    if (!landmarks || landmarks.length < 33) {
      return empty({ stage, feedback: "No person detected" });
    }

    try {
      switch (exerciseId) {
        case "knee_squat": {
          const left = sideByMinAngle(landmarks, (L) => {
            const S = idx(L);
            if (!visible(landmarks[S.hp]) || !visible(landmarks[S.kn]) || !visible(landmarks[S.an]))
              return null;
            return calculateAngle(landmarks[S.hp], landmarks[S.kn], landmarks[S.an]);
          });
          const S = idx(left);
          const miss = missingFor(landmarks, [
            { idx: S.hp, name: "hip" },
            { idx: S.kn, name: "knee" },
            { idx: S.an, name: "ankle" },
            { idx: S.sh, name: "shoulder" },
          ]);
          if (miss.length) return empty({ stage, missing: miss, feedback: `Show your ${miss[0]}` });
          const angle = calculateAngle(landmarks[S.hp], landmarks[S.kn], landmarks[S.an]);
          const back = calculateAngle(landmarks[S.sh], landmarks[S.hp], landmarks[S.kn]);
          let feedback = stage === "up" ? "Sit back" : "Stand tall";
          let speak = true;
          let formOk = true;
          let formCue: string | null = null;
          let event: EvalResult["event"] = "none";

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
            angle, secondaryAngle: back, feedback, speak, stage, formOk, formCue,
            event, visibilityOk: true, missing: [], holdSeconds: 0,
          };
        }
        case "shoulder_raise": {
          const left = sideByMinAngle(landmarks, (L) => {
            const S = idx(L);
            if (!visible(landmarks[S.el]) || !visible(landmarks[S.sh]) || !visible(landmarks[S.hp]))
              return null;
            // larger angle = more raised; invert so min-picker still works by using negative
            return -calculateAngle(landmarks[S.el], landmarks[S.sh], landmarks[S.hp]);
          });
          const A = idx(left);
          const miss = missingFor(landmarks, [
            { idx: A.el, name: "elbow" },
            { idx: A.sh, name: "shoulder" },
            { idx: A.hp, name: "hip" },
            { idx: A.wr, name: "wrist" },
          ]);
          if (miss.length) return empty({ stage, missing: miss, feedback: `Show your ${miss[0]}` });
          const angle = calculateAngle(landmarks[A.el], landmarks[A.sh], landmarks[A.hp]);
          const elbow = calculateAngle(landmarks[A.sh], landmarks[A.el], landmarks[A.wr]);
          let feedback = stage === "down" ? "Raise to shoulder" : "Lower slowly";
          let speak = true;
          let formOk = true;
          let formCue: string | null = null;
          let event: EvalResult["event"] = "none";

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
            angle, secondaryAngle: elbow, feedback, speak, stage, formOk, formCue,
            event, visibilityOk: true, missing: [], holdSeconds: 0,
          };
        }
        case "hip_raise": {
          const left = sideByMinAngle(landmarks, (L) => {
            const S = idx(L);
            if (!visible(landmarks[S.sh]) || !visible(landmarks[S.hp]) || !visible(landmarks[S.kn]))
              return null;
            return calculateAngle(landmarks[S.sh], landmarks[S.hp], landmarks[S.kn]);
          });
          const S = idx(left);
          const miss = missingFor(landmarks, [
            { idx: S.sh, name: "shoulder" },
            { idx: S.hp, name: "hip" },
            { idx: S.kn, name: "knee" },
          ]);
          if (miss.length) return empty({ stage, missing: miss, feedback: `Show your ${miss[0]}` });
          const angle = calculateAngle(landmarks[S.sh], landmarks[S.hp], landmarks[S.kn]);
          let feedback = stage === "up" ? "Raise the leg" : "Lower the leg";
          let speak = true;
          let event: EvalResult["event"] = "none";
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
            angle, secondaryAngle: null, feedback, speak, stage, formOk: true, formCue: null,
            event, visibilityOk: true, missing: [], holdSeconds: 0,
          };
        }
        case "back_stretch": {
          const left = true;
          const S = idx(left);
          const miss = missingFor(landmarks, [
            { idx: S.sh, name: "shoulder" },
            { idx: S.hp, name: "hip" },
            { idx: S.kn, name: "knee" },
          ]);
          if (miss.length) return empty({ stage, missing: miss, feedback: `Show your ${miss[0]}` });
          const angle = calculateAngle(landmarks[S.sh], landmarks[S.hp], landmarks[S.kn]);
          let feedback = stage === "up" ? "Dip the spine (cow)" : "Round the spine (cat)";
          let speak = true;
          let event: EvalResult["event"] = "none";
          // All-fours: a rounded cat opens the hip; a dipped cow closes it.
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
            angle, secondaryAngle: null, feedback, speak, stage, formOk: true, formCue: null,
            event, visibilityOk: true, missing: [], holdSeconds: 0,
          };
        }
        case "glute_bridge": {
          const left = sideByMinAngle(landmarks, (L) => {
            const S = idx(L);
            if (!visible(landmarks[S.sh]) || !visible(landmarks[S.hp]) || !visible(landmarks[S.kn]))
              return null;
            return -calculateAngle(landmarks[S.sh], landmarks[S.hp], landmarks[S.kn]);
          });
          const S = idx(left);
          const miss = missingFor(landmarks, [
            { idx: S.sh, name: "shoulder" },
            { idx: S.hp, name: "hip" },
            { idx: S.kn, name: "knee" },
          ]);
          if (miss.length) return empty({ stage, missing: miss, feedback: `Show your ${miss[0]}` });
          const angle = calculateAngle(landmarks[S.sh], landmarks[S.hp], landmarks[S.kn]);
          let feedback = stage === "down" ? "Lift the hips" : "Lower the hips";
          let speak = true;
          let formOk = true;
          let formCue: string | null = null;
          let event: EvalResult["event"] = "none";
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
            angle, secondaryAngle: null, feedback, speak, stage, formOk, formCue,
            event, visibilityOk: true, missing: [], holdSeconds: 0,
          };
        }
        case "calf_raise": {
          const left = true;
          const S = idx(left);
          const miss = missingFor(landmarks, [
            { idx: S.kn, name: "knee" },
            { idx: S.an, name: "ankle" },
            { idx: S.heel, name: "heel" },
          ]);
          if (miss.length) return empty({ stage, missing: miss, feedback: `Show your ${miss[0]}` });
          const heelBelow = landmarks[S.heel].y - landmarks[S.an].y;
          const knee = calculateAngle(landmarks[S.hp], landmarks[S.kn], landmarks[S.an]);
          const angle = Math.round(Math.max(0, heelBelow * 1000));
          let feedback = stage === "down" ? "Rise onto toes" : "Lower the heels";
          let speak = true;
          let formOk = true;
          let formCue: string | null = null;
          let event: EvalResult["event"] = "none";
          if (heelBelow > 0.028) {
            if (stage === "up") event = maybeRep(now);
            feedback = event === "rep" ? "Good — full lower" : "Rise onto toes";
            stage = "down";
          } else if (heelBelow < 0.01) {
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
            angle, secondaryAngle: knee, feedback, speak, stage, formOk, formCue,
            event, visibilityOk: true, missing: [], holdSeconds: 0,
          };
        }
        case "side_leg_raise": {
          const left = sideByMinAngle(landmarks, (L) => {
            const S = idx(L);
            if (!visible(landmarks[S.sh]) || !visible(landmarks[S.hp]) || !visible(landmarks[S.an]))
              return null;
            return calculateAngle(landmarks[S.sh], landmarks[S.hp], landmarks[S.an]);
          });
          const S = idx(left);
          const miss = missingFor(landmarks, [
            { idx: S.sh, name: "shoulder" },
            { idx: S.hp, name: "hip" },
            { idx: S.an, name: "ankle" },
          ]);
          if (miss.length) return empty({ stage, missing: miss, feedback: `Show your ${miss[0]}` });
          const angle = calculateAngle(landmarks[S.sh], landmarks[S.hp], landmarks[S.an]);
          let feedback = stage === "down" ? "Lift to the side" : "Lower the leg";
          let speak = true;
          let formOk = true;
          let formCue: string | null = null;
          let event: EvalResult["event"] = "none";
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
          const torsoLean = Math.abs(landmarks[S.sh].x - landmarks[S.hp].x);
          if (torsoLean > 0.14 && stage === "up") {
            formOk = false;
            formCue = "Do not lean — lift from the hip";
            feedback = formCue;
            speak = true;
          }
          return {
            angle, secondaryAngle: null, feedback, speak, stage, formOk, formCue,
            event, visibilityOk: true, missing: [], holdSeconds: 0,
          };
        }
        case "wall_sit": {
          const S = idx(true);
          const miss = missingFor(landmarks, [
            { idx: S.hp, name: "hip" },
            { idx: S.kn, name: "knee" },
            { idx: S.an, name: "ankle" },
          ]);
          if (miss.length) {
            holdMs = 0;
            lastHoldCredit = 0;
            return empty({ stage, missing: miss, feedback: `Show your ${miss[0]}` });
          }
          const angle = calculateAngle(landmarks[S.hp], landmarks[S.kn], landmarks[S.an]);
          let feedback = "Bend to about 90°";
          let speak = true;
          let formOk = true;
          let formCue: string | null = null;
          let event: EvalResult["event"] = "none";
          const inRange = angle >= 72 && angle <= 120;
          if (inRange) {
            stage = "hold";
            if (lastHoldCredit === 0) lastHoldCredit = now;
            const prevHold = holdMs;
            holdMs += Math.min(120, Math.max(0, now - lastHoldCredit));
            lastHoldCredit = now;
            if (Math.floor(holdMs / 1000) > Math.floor(prevHold / 1000)) {
              event = "hold_second";
            }
            const sec = Math.floor(holdMs / 1000);
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
            angle, secondaryAngle: null, feedback, speak, stage, formOk, formCue,
            event, visibilityOk: true, missing: [], holdSeconds: Math.floor(holdMs / 1000),
          };
        }
        default:
          return empty({ feedback: "This drill is not wired yet." });
      }
    } catch {
      return empty({ stage, feedback: "Step into frame" });
    }
  }

  return { tick, reset, getStage: () => stage };
}

function initialStage(id: ExerciseId): Stage {
  switch (id) {
    case "shoulder_raise":
    case "glute_bridge":
    case "calf_raise":
    case "side_leg_raise":
    case "wall_sit":
      return "down";
    default:
      return "up";
  }
}
