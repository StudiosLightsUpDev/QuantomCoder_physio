import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BodyRegion, ExerciseId, FeedbackNote, Profile, SessionRecord } from "./types";
import { EXERCISE_MAP, uid } from "./exercises";

type PhysioState = {
  profile: Profile;
  sessions: SessionRecord[];
  notes: FeedbackNote[];
  setName: (name: string) => void;
  setFocus: (focus: BodyRegion[]) => void;
  setDailyGoal: (n: number) => void;
  setVoice: (on: boolean) => void;
  addSession: (s: Omit<SessionRecord, "id" | "date"> & { date?: string }) => SessionRecord;
  addNote: (subject: string, message: string) => void;
  seedDemo: () => void;
  resetAll: () => void;
};

const defaultProfile = (): Profile => ({
  name: "",
  focus: [],
  dailyGoalReps: 40,
  voiceEnabled: true,
  createdAt: new Date().toISOString(),
});

function demoSessions(): SessionRecord[] {
  const ids: ExerciseId[] = ["knee_squat", "glute_bridge", "shoulder_raise", "calf_raise", "back_stretch"];
  const out: SessionRecord[] = [];
  for (let d = 6; d >= 1; d--) {
    const date = new Date();
    date.setDate(date.getDate() - d);
    date.setHours(8 + (d % 3), 15, 0, 0);
    const id = ids[d % ids.length];
    const def = EXERCISE_MAP[id];
    out.push({
      id: uid(),
      exerciseId: id,
      date: date.toISOString(),
      reps: def.mode === "hold" ? def.target : def.target * def.sets - (d % 4),
      setsCompleted: def.sets,
      targetReps: def.mode === "hold" ? def.target * def.sets : def.target * def.sets,
      durationSec: 180 + d * 20,
      formScore: 78 + ((d * 7) % 18),
      painBefore: 4,
      painAfter: 3,
      topCue: d % 2 === 0 ? "Chest up — keep the back long" : null,
      source: "coach",
    });
  }
  return out;
}

export const usePhysio = create<PhysioState>()(
  persist(
    (set, get) => ({
      profile: defaultProfile(),
      sessions: [],
      notes: [],
      setName: (name) => set({ profile: { ...get().profile, name } }),
      setFocus: (focus) => set({ profile: { ...get().profile, focus } }),
      setDailyGoal: (dailyGoalReps) => set({ profile: { ...get().profile, dailyGoalReps } }),
      setVoice: (voiceEnabled) => set({ profile: { ...get().profile, voiceEnabled } }),
      addSession: (s) => {
        const record: SessionRecord = {
          ...s,
          id: uid(),
          date: s.date ?? new Date().toISOString(),
        };
        set({ sessions: [...get().sessions, record] });
        return record;
      },
      addNote: (subject, message) =>
        set({
          notes: [
            ...get().notes,
            { id: uid(), subject, message, date: new Date().toISOString() },
          ],
        }),
      seedDemo: () => set({ sessions: [...demoSessions(), ...get().sessions] }),
      resetAll: () => set({ profile: defaultProfile(), sessions: [], notes: [] }),
    }),
    { name: "physio-coach-v1", skipHydration: typeof window === "undefined" },
  ),
);
