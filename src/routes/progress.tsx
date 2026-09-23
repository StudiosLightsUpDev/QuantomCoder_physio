import { useMemo, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppFrame } from "@/components/app-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EXERCISE_MAP, EXERCISES, formAverage } from "@/lib/physio/exercises";
import { usePhysio } from "@/lib/physio/store";
import type { ExerciseId } from "@/lib/physio/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/progress")({ component: ProgressPage });

function ProgressPage() {
  const sessions = usePhysio((s) => s.sessions);
  const seedDemo = usePhysio((s) => s.seedDemo);
  const [filter, setFilter] = useState<"all" | ExerciseId>("all");
  const [range, setRange] = useState<7 | 30 | 0>(7);

  const filtered = useMemo(() => {
    const cutoff =
      range === 0 ? 0 : Date.now() - range * 24 * 60 * 60 * 1000;
    return sessions
      .filter((s) => (filter === "all" ? true : s.exerciseId === filter))
      .filter((s) => (cutoff ? new Date(s.date).getTime() >= cutoff : true))
      .sort((a, b) => +new Date(a.date) - +new Date(b.date));
  }, [sessions, filter, range]);

  const totalReps = filtered.reduce((n, s) => n + s.reps, 0);
  const form = formAverage(filtered);
  const avgPainDrop = (() => {
    const pairs = filtered.filter((s) => s.painBefore != null && s.painAfter != null);
    if (!pairs.length) return null;
    return (
      pairs.reduce((n, s) => n + ((s.painBefore ?? 0) - (s.painAfter ?? 0)), 0) /
      pairs.length
    );
  })();

  const chart = filtered.map((s) => ({
    label: new Date(s.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    reps: s.reps,
    form: s.formScore,
  }));

  const week = lastDays(7).map((d) => {
    const key = d.toDateString();
    const daySessions = sessions.filter((s) => new Date(s.date).toDateString() === key);
    return {
      key,
      label: d.toLocaleDateString("en-US", { weekday: "narrow" }),
      n: daySessions.length,
    };
  });

  return (
    <AppFrame>
      <p className="mb-2 text-xs tracking-[0.18em] text-muted-foreground uppercase">
        Progress
      </p>
      <h1 className="font-display text-4xl tracking-tight">The work, plotted</h1>
      <p className="mt-2 max-w-lg text-sm text-muted-foreground">
        Volume is useless without form. Filter a drill, watch both.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-2">
        <Mini label="Reps" value={totalReps} />
        <Mini label="Sessions" value={filtered.length} />
        <Mini label="Form" value={form ? `${form}%` : "—"} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {([7, 30, 0] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRange(r)}
            className={cn(
              "h-9 rounded-full px-3 text-xs",
              range === r ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
            )}
          >
            {r === 0 ? "All" : `${r}d`}
          </button>
        ))}
      </div>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
        <Chip active={filter === "all"} onClick={() => setFilter("all")}>
          All drills
        </Chip>
        {EXERCISES.map((e) => (
          <Chip key={e.id} active={filter === e.id} onClick={() => setFilter(e.id)}>
            {e.title}
          </Chip>
        ))}
      </div>

      <Card className="mt-6 p-4">
        <p className="mb-3 text-xs tracking-wide text-muted-foreground">This week</p>
        <div className="grid grid-cols-7 gap-2">
          {week.map((d) => (
            <div key={d.key} className="flex flex-col items-center gap-2">
              <div
                className={cn("w-full rounded-md", d.n ? "bg-primary/80" : "bg-secondary")}
                style={{ height: 8 + d.n * 14 }}
              />
              <span className="text-[11px] text-muted-foreground">{d.label}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mt-4 p-4">
        {chart.length ? (
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chart}>
                <defs>
                  <linearGradient id="repsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c5cec4" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#c5cec4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fill: "#8b938c", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#8b938c", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={28}
                />
                <Tooltip
                  contentStyle={{
                    background: "#161a18",
                    border: "1px solid #2a312d",
                    borderRadius: 12,
                    color: "#eef0ec",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="reps"
                  stroke="#c5cec4"
                  fill="url(#repsFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="px-2 py-10 text-center">
            <p className="font-display text-xl">No sessions in this filter</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Complete a drill, or load a week of sample history to see the chart.
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <Button asChild>
                <Link to="/exercises">Start a drill</Link>
              </Button>
              <Button variant="secondary" onClick={seedDemo}>
                Load sample week
              </Button>
            </div>
          </div>
        )}
      </Card>

      {avgPainDrop != null && (
        <p className="mt-4 text-sm text-muted-foreground">
          Average pain change {avgPainDrop > 0 ? "down" : avgPainDrop < 0 ? "up" : "flat"}{" "}
          {Math.abs(avgPainDrop).toFixed(1)} points across these sessions.
        </p>
      )}

      <ul className="mt-6 space-y-2">
        {[...filtered]
          .reverse()
          .slice(0, 12)
          .map((s) => {
            const def = EXERCISE_MAP[s.exerciseId];
            return (
              <li key={s.id}>
                <Card className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-medium">{def?.title ?? s.exerciseId}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(s.date).toLocaleString()} · {s.reps} counted · form {s.formScore}%
                    </p>
                  </div>
                  <Badge variant={s.formScore >= 80 ? "good" : "warn"}>{s.source}</Badge>
                </Card>
              </li>
            );
          })}
      </ul>
    </AppFrame>
  );
}

function Mini({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="p-3">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="font-display text-2xl tabular-nums tracking-tight">{value}</p>
    </Card>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 shrink-0 rounded-full px-3 text-xs",
        active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
      )}
    >
      {children}
    </button>
  );
}

function lastDays(n: number) {
  const out: Date[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    out.push(d);
  }
  return out;
}
