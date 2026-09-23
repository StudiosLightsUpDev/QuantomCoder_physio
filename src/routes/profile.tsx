import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppFrame } from "@/components/app-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { calcStreak, formAverage, REGIONS } from "@/lib/physio/exercises";
import { usePhysio } from "@/lib/physio/store";
import type { BodyRegion } from "@/lib/physio/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const profile = usePhysio((s) => s.profile);
  const sessions = usePhysio((s) => s.sessions);
  const notes = usePhysio((s) => s.notes);
  const setName = usePhysio((s) => s.setName);
  const setFocus = usePhysio((s) => s.setFocus);
  const setDailyGoal = usePhysio((s) => s.setDailyGoal);
  const setVoice = usePhysio((s) => s.setVoice);
  const addNote = usePhysio((s) => s.addNote);
  const resetAll = usePhysio((s) => s.resetAll);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const streak = calcStreak(sessions);
  const form = formAverage(sessions);
  const totalReps = sessions.reduce((n, s) => n + s.reps, 0);
  const since = new Date(profile.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const toggleFocus = (id: BodyRegion) => {
    if (id === "full") {
      setFocus([]);
      return;
    }
    const next = profile.focus.includes(id)
      ? profile.focus.filter((f) => f !== id)
      : [...profile.focus.filter((f) => f !== "full"), id];
    setFocus(next);
  };

  return (
    <AppFrame>
      <p className="mb-2 text-xs tracking-[0.18em] text-muted-foreground uppercase">
        You
      </p>
      <h1 className="font-display text-4xl tracking-tight">
        {profile.name || "Unnamed athlete"}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">Training since {since}</p>

      <div className="mt-6 grid grid-cols-3 gap-2">
        <Card className="p-3">
          <p className="text-[11px] text-muted-foreground">Lifetime reps</p>
          <p className="font-display text-2xl tabular-nums">{totalReps}</p>
        </Card>
        <Card className="p-3">
          <p className="text-[11px] text-muted-foreground">Sessions</p>
          <p className="font-display text-2xl tabular-nums">{sessions.length}</p>
        </Card>
        <Card className="p-3">
          <p className="text-[11px] text-muted-foreground">Streak / form</p>
          <p className="font-display text-2xl tabular-nums">
            {streak}
            <span className="text-sm text-muted-foreground"> / {form || "—"}</span>
          </p>
        </Card>
      </div>

      <Card className="mt-6 p-5">
        <h2 className="font-display text-xl tracking-tight">How we address you</h2>
        <div className="mt-4 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Display name</Label>
            <Input
              id="name"
              value={profile.name}
              placeholder="First name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="goal">Daily rep goal</Label>
            <Input
              id="goal"
              type="number"
              min={10}
              max={200}
              value={profile.dailyGoalReps}
              onChange={(e) => setDailyGoal(Number(e.target.value) || 40)}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Voice cues</p>
              <p className="text-xs text-muted-foreground">
                Spoken reps and form corrections during a session
              </p>
            </div>
            <Switch checked={profile.voiceEnabled} onCheckedChange={setVoice} />
          </div>
        </div>
      </Card>

      <Card className="mt-4 p-5">
        <h2 className="font-display text-xl tracking-tight">Focus joints</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Today’s protocol prefers these. Leave empty for a balanced week.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {REGIONS.filter((r) => r.id !== "full").map((r) => {
            const on = profile.focus.includes(r.id);
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => toggleFocus(r.id)}
                className={cn(
                  "h-10 rounded-full px-4 text-sm",
                  on ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
                )}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="mt-4 p-5">
        <h2 className="font-display text-xl tracking-tight">Send a note</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Bugs, ideas, what hurt. Stored on this device — no account required.
        </p>
        <div className="mt-4 grid gap-3">
          <Input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <Textarea
            placeholder="What should we know?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            onClick={() => {
              if (!subject.trim() || !message.trim()) {
                toast.error("Add a subject and a note.");
                return;
              }
              addNote(subject.trim(), message.trim());
              setSubject("");
              setMessage("");
              toast.success("Saved on this device.");
            }}
          >
            Save note
          </Button>
        </div>
        {notes.length > 0 && (
          <ul className="mt-4 space-y-2">
            {[...notes].reverse().slice(0, 5).map((n) => (
              <li key={n.id} className="rounded-md bg-secondary px-3 py-2 text-sm">
                <p className="font-medium">{n.subject}</p>
                <p className="text-muted-foreground">{n.message}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Button
        variant="outline"
        className="mt-6 w-full"
        onClick={() => {
          resetAll();
          toast.success("Local data cleared.");
        }}
      >
        Reset all local data
      </Button>
    </AppFrame>
  );
}
