export type ExerciseId =
  | "knee_squat"
  | "shoulder_raise"
  | "hip_raise"
  | "back_stretch"
  | "glute_bridge"
  | "calf_raise"
  | "side_leg_raise"
  | "wall_sit";

export type BodyRegion = "knee" | "shoulder" | "hip" | "back" | "ankle" | "full";

export type CountingMode = "reps" | "hold";

export type Landmark = {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
};

export type Stage = "up" | "down" | "hold";

export type EvalEvent = "none" | "rep" | "hold_second";

export type EvalResult = {
  angle: number;
  secondaryAngle: number | null;
  feedback: string;
  speak: boolean;
  stage: Stage;
  formOk: boolean;
  formCue: string | null;
  event: EvalEvent;
  visibilityOk: boolean;
  missing: string[];
  holdSeconds: number;
};

export type ExerciseDef = {
  id: ExerciseId;
  title: string;
  short: string;
  description: string;
  region: BodyRegion;
  regions: BodyRegion[];
  difficulty: "Foundation" | "Build" | "Control";
  mode: CountingMode;
  sets: number;
  target: number;
  restSec: number;
  tempoMs: number;
  estimatedMin: number;
  why: string;
  setup: string[];
  steps: string[];
  mistakes: string[];
  skipIf: string;
  cues: { down: string; up: string; hold: string };
};

export type SessionRecord = {
  id: string;
  exerciseId: ExerciseId;
  date: string;
  reps: number;
  setsCompleted: number;
  targetReps: number;
  durationSec: number;
  formScore: number;
  painBefore: number | null;
  painAfter: number | null;
  topCue: string | null;
  source: "camera" | "coach";
};

export type FeedbackNote = {
  id: string;
  subject: string;
  message: string;
  date: string;
};

export type Profile = {
  name: string;
  focus: BodyRegion[];
  dailyGoalReps: number;
  voiceEnabled: boolean;
  createdAt: string;
};
