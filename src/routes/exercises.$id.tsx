import { useState, type ReactNode } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { AppFrame } from "@/components/app-frame";
import { PainCheck } from "@/components/pain-check";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PoseGlyph } from "@/components/pose-glyph";
import { EXERCISE_MAP } from "@/lib/physio/exercises";
import type { ExerciseId } from "@/lib/physio/types";

export const Route = createFileRoute("/exercises/$id")({
  component: Brief,
});

function Brief() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const ex = EXERCISE_MAP[id as ExerciseId];
  const [pain, setPain] = useState(3);

  if (!ex) {
    return (
      <AppFrame>
        <p>That drill is not in the library.</p>
        <Button asChild className="mt-4">
          <Link to="/exercises">Back to library</Link>
        </Button>
      </AppFrame>
    );
  }

  const start = (source: "camera" | "coach") => {
    navigate({
      to: "/session/$id",
      params: { id: ex.id },
      search: { pain, source },
    });
  };

  return (
    <AppFrame>
      <Link
        to="/exercises"
        className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeft className="size-4" />
        Library
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{ex.region}</Badge>
            <Badge>{ex.difficulty}</Badge>
            <Badge>
              {ex.mode === "hold"
                ? `${ex.sets} × ${ex.target}s`
                : `${ex.sets} × ${ex.target}`}
            </Badge>
          </div>
          <h1 className="mt-3 font-display text-4xl tracking-tight">{ex.title}</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {ex.description}
          </p>

          <Card className="mt-6 overflow-hidden">
            <div className="grid place-items-center bg-studio py-8">
              <PoseGlyph id={ex.id} className="h-40 w-32" />
            </div>
            <div className="p-5">
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Why this exists
              </p>
              <p className="mt-2 text-sm leading-relaxed">{ex.why}</p>
            </div>
          </Card>

          <Block title="Set up">
            <ol className="space-y-2">
              {ex.setup.map((s) => (
                <li key={s} className="flex gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {s}
                </li>
              ))}
            </ol>
          </Block>
          <Block title="The movement">
            <ol className="space-y-2">
              {ex.steps.map((s, i) => (
                <li key={s} className="flex gap-3 text-sm leading-relaxed">
                  <span className="w-5 shrink-0 tabular-nums text-muted-foreground">
                    {i + 1}.
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </Block>
          <Block title="Common misses">
            <ul className="space-y-2">
              {ex.mistakes.map((s) => (
                <li key={s} className="text-sm text-muted-foreground">
                  — {s}
                </li>
              ))}
            </ul>
          </Block>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">{ex.skipIf}</p>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <Card className="p-5">
            <p className="font-display text-lg tracking-tight">Ready to work</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {ex.estimatedMin} minutes · {ex.restSec}s rest between sets
            </p>
            <div className="mt-5">
              <PainCheck
                label="Pain right now (optional)"
                value={pain}
                onChange={setPain}
              />
            </div>
            <Button className="mt-6 w-full" size="lg" onClick={() => start("camera")}>
              Start with camera
            </Button>
            <Button
              className="mt-2 w-full"
              size="lg"
              variant="secondary"
              onClick={() => start("coach")}
            >
              Practice with coach
            </Button>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Camera tracks your joints in the browser — nothing is uploaded. Coach
              mode runs a tempo skeleton so you can still complete the protocol.
            </p>
          </Card>
        </aside>
      </div>
    </AppFrame>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 font-display text-xl tracking-tight">{title}</h2>
      {children}
    </section>
  );
}
