import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Target } from "lucide-react";
import { AppFrame } from "@/components/app-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PoseGlyph } from "@/components/pose-glyph";
import {
  calcStreak,
  formAverage,
  getTodaysPlan,
  repsToday,
  sessionsToday,
} from "@/lib/physio/exercises";
import { usePhysio } from "@/lib/physio/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const profile = usePhysio((s) => s.profile);
  const sessions = usePhysio((s) => s.sessions);
  const plan = getTodaysPlan(profile.focus);
  const today = sessionsToday(sessions);
  const reps = repsToday(sessions);
  const streak = calcStreak(sessions);
  const form = formAverage(sessions.slice(-8));
  const goal = profile.dailyGoalReps;
  const greeting = profile.name ? `Good to see you, ${profile.name}.` : "Your next session is ready.";
  const doneIds = new Set(today.map((s) => s.exerciseId));
  const next = plan.find((e) => !doneIds.has(e.id)) ?? plan[0];

  return (
    <AppFrame>
      <section className="mb-8">
        <p className="mb-2 text-xs tracking-[0.18em] text-muted-foreground uppercase">
          Today
        </p>
        <h1 className="max-w-xl font-display text-4xl leading-[1.1] font-medium tracking-tight sm:text-5xl">
          {greeting}
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Camera coaching when you have it. A guided coach when you do not. Either
          way, every rep is counted with form cues you can hear.
        </p>
      </section>

      <div className="mb-8 grid grid-cols-3 gap-2 sm:gap-3">
        <Stat label="Reps today" value={reps} hint={`of ${goal}`} />
        <Stat label="Streak" value={streak} hint="days" icon />
        <Stat label="Form" value={form || "—"} hint={form ? "avg %" : "after 1 session"} />
      </div>

      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl tracking-tight">Today’s protocol</h2>
          <span className="text-xs text-muted-foreground tabular-nums">
            {doneIds.size}/{plan.length} done
          </span>
        </div>
        <Progress value={(doneIds.size / plan.length) * 100} className="mb-4" />
        <div className="flex flex-col gap-3">
          {plan.map((ex, i) => {
            const complete = doneIds.has(ex.id);
            return (
              <Link key={ex.id} to="/exercises/$id" params={{ id: ex.id }}>
                <Card className="flex items-center gap-4 p-3 transition-shadow duration-150 hover:shadow-[var(--shadow-border-hover)]">
                  <div className="grid size-16 shrink-0 place-items-center rounded-lg bg-secondary">
                    <PoseGlyph id={ex.id} className="h-12 w-10" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[11px] tracking-wide text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      {complete ? (
                        <Badge variant="good">Done</Badge>
                      ) : (
                        <Badge>{ex.difficulty}</Badge>
                      )}
                    </div>
                    <p className="truncate font-medium">{ex.title}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {ex.mode === "hold"
                        ? `${ex.sets} × ${ex.target}s`
                        : `${ex.sets} × ${ex.target}`}
                      <span className="mx-1.5">·</span>
                      {ex.estimatedMin} min
                    </p>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                </Card>
              </Link>
            );
          })}
        </div>
        {next && (
          <Button asChild className="mt-4 w-full" size="lg">
            <Link to="/exercises/$id" params={{ id: next.id }}>
              {doneIds.size ? "Continue protocol" : "Start first drill"}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        )}
      </div>

      <Card className="mb-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <div className="flex size-12 items-center justify-center rounded-md bg-secondary">
          <Target className="size-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-medium">Daily volume</p>
          <p className="text-sm text-muted-foreground">
            {reps} of {goal} quality reps. Form score beats empty volume.
          </p>
        </div>
        <Progress value={Math.min(100, (reps / goal) * 100)} className="sm:w-40" />
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link to="/exercises">
          <Card className="h-full p-5 transition-shadow hover:shadow-[var(--shadow-border-hover)]">
            <p className="text-xs tracking-wide text-muted-foreground uppercase">Library</p>
            <p className="mt-1 font-display text-xl">Eight drills, four joints</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Knee, shoulder, hip, back, ankle — each with setup, mistakes, and live cues.
            </p>
          </Card>
        </Link>
        <Link to="/progress">
          <Card className="h-full p-5 transition-shadow hover:shadow-[var(--shadow-border-hover)]">
            <p className="text-xs tracking-wide text-muted-foreground uppercase">History</p>
            <p className="mt-1 font-display text-xl">See the week, not the guess</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Reps, form quality, and pain before vs after — filter by drill.
            </p>
          </Card>
        </Link>
      </div>
    </AppFrame>
  );
}

function Stat({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: number | string;
  hint: string;
  icon?: boolean;
}) {
  return (
    <Card className="p-3 sm:p-4">
      <p className="text-[11px] tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 flex items-baseline gap-1 font-display text-2xl tabular-nums tracking-tight sm:text-3xl">
        {icon && typeof value === "number" && value > 0 ? (
          <Flame className="mr-0.5 size-4 self-center text-warn" />
        ) : null}
        {value}
      </p>
      <p className="text-[11px] text-muted-foreground">{hint}</p>
    </Card>
  );
}
