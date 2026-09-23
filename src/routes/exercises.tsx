import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppFrame } from "@/components/app-frame";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PoseGlyph } from "@/components/pose-glyph";
import { EXERCISES, REGIONS } from "@/lib/physio/exercises";
import type { BodyRegion } from "@/lib/physio/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/exercises")({ component: Library });

function Library() {
  const [region, setRegion] = useState<BodyRegion>("full");
  const list =
    region === "full" ? EXERCISES : EXERCISES.filter((e) => e.regions.includes(region));

  return (
    <AppFrame>
      <p className="mb-2 text-xs tracking-[0.18em] text-muted-foreground uppercase">
        Library
      </p>
      <h1 className="font-display text-4xl tracking-tight">Choose a drill</h1>
      <p className="mt-2 max-w-lg text-sm text-muted-foreground">
        Pick the joint that is bothering you. Each card opens setup, common mistakes,
        and a session you can run with a camera or the on-screen coach.
      </p>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {REGIONS.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setRegion(r.id)}
            className={cn(
              "h-10 shrink-0 rounded-full px-4 text-sm",
              region === r.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground",
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {list.map((ex) => (
          <Link key={ex.id} to="/exercises/$id" params={{ id: ex.id }}>
            <Card className="flex h-full gap-4 p-4 transition-shadow hover:shadow-[var(--shadow-border-hover)]">
              <div className="grid size-[4.5rem] shrink-0 place-items-center rounded-lg bg-secondary">
                <PoseGlyph id={ex.id} className="h-14 w-11" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap gap-1.5">
                  <Badge>{ex.region}</Badge>
                  <Badge>{ex.difficulty}</Badge>
                </div>
                <h2 className="mt-1.5 font-display text-xl tracking-tight">{ex.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{ex.short}</p>
                <p className="mt-2 text-xs tabular-nums text-muted-foreground">
                  {ex.mode === "hold"
                    ? `${ex.sets} × ${ex.target}s hold`
                    : `${ex.sets} × ${ex.target} reps`}
                  <span className="mx-1">·</span>
                  {ex.estimatedMin} min
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </AppFrame>
  );
}
