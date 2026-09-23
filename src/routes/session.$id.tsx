import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Camera, PersonStanding, Volume2, VolumeX } from "lucide-react";
import { z } from "zod";
import { PainCheck } from "@/components/pain-check";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { drawScene } from "@/lib/physio/draw";
import { EXERCISE_MAP } from "@/lib/physio/exercises";
import { createTracker } from "@/lib/physio/evaluate";
import { createPose, loadPoseLib, startCamera, stopStream } from "@/lib/physio/pose-camera";
import { coachPose } from "@/lib/physio/skeleton";
import { silence, speak } from "@/lib/physio/speech";
import { usePhysio } from "@/lib/physio/store";
import type { EvalResult, ExerciseId, Landmark } from "@/lib/physio/types";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  pain: z.coerce.number().optional(),
  source: z.enum(["camera", "coach"]).optional(),
});

export const Route = createFileRoute("/session/$id")({
  validateSearch: searchSchema,
  component: SessionPage,
});

type Phase = "live" | "rest" | "done";

function SessionPage() {
  const { id } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const ex = EXERCISE_MAP[id as ExerciseId];
  const voiceDefault = usePhysio((s) => s.profile.voiceEnabled);
  const addSession = usePhysio((s) => s.addSession);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const poseRef = useRef<ReturnType<typeof createPose> | null>(null);
  const rafRef = useRef(0);
  const trackerRef = useRef(createTracker((id as ExerciseId) ?? "knee_squat"));
  const lastSpeak = useRef("");
  const startedAt = useRef(Date.now());
  const formFrames = useRef({ good: 0, total: 0 });
  const cueCount = useRef<Record<string, number>>({});
  const landmarksRef = useRef<Landmark[] | null>(null);
  const restUntil = useRef(0);
  const coachOrigin = useRef(Date.now());
  const lastHud = useRef(0);
  const phaseRef = useRef<Phase>("live");
  const voiceRef = useRef(voiceDefault);
  const countRef = useRef(0);
  const setRef = useRef(0);
  const savedRef = useRef(false);

  const [mode, setMode] = useState<"camera" | "coach">(search.source ?? "coach");
  const [camError, setCamError] = useState<string | null>(null);
  const [voice, setVoice] = useState(voiceDefault);
  const [phase, setPhase] = useState<Phase>("live");
  const [setIdx, setSetIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [hud, setHud] = useState({
    angle: 0,
    feedback: "Get ready",
    formOk: true,
    missing: [] as string[],
  });
  const [restLeft, setRestLeft] = useState(0);
  const [painAfter, setPainAfter] = useState(search.pain ?? 3);
  const [formScore, setFormScore] = useState(90);

  voiceRef.current = voice;
  phaseRef.current = phase;
  countRef.current = count;
  setRef.current = setIdx;

  const target = ex?.target ?? 10;
  const sets = ex?.sets ?? 3;

  function beginRest() {
    if (setRef.current + 1 >= sets) {
      phaseRef.current = "done";
      setPhase("done");
      const { good, total } = formFrames.current;
      setFormScore(total ? Math.round((good / total) * 100) : 90);
      silence();
      return;
    }
    phaseRef.current = "rest";
    setPhase("rest");
    restUntil.current = Date.now() + (ex?.restSec ?? 30) * 1000;
    speak("Rest. Next set coming.", voiceRef.current);
  }

  function applyEval(result: EvalResult) {
    if (phaseRef.current !== "live") return;
    if (result.visibilityOk) {
      formFrames.current.total += 1;
      if (result.formOk) formFrames.current.good += 1;
    }
    if (result.formCue) {
      cueCount.current[result.formCue] = (cueCount.current[result.formCue] ?? 0) + 1;
    }
    if (result.event === "rep" || result.event === "hold_second") {
      const next = countRef.current + 1;
      countRef.current = next;
      setCount(next);
      if (next >= target) beginRest();
    }
    if (result.speak && result.feedback && result.feedback !== lastSpeak.current) {
      lastSpeak.current = result.feedback;
      speak(result.feedback, voiceRef.current);
    }
    const now = Date.now();
    if (now - lastHud.current > 80) {
      lastHud.current = now;
      setHud({
        angle: Math.round(result.angle),
        feedback: result.feedback,
        formOk: result.formOk,
        missing: result.missing,
      });
    }
  }

  function paint() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawScene(ctx, {
      width: canvas.width,
      height: canvas.height,
      landmarks: landmarksRef.current,
      video: videoRef.current,
      mirror: mode === "camera",
      formOk: hud.formOk,
      mode,
    });
  }

  useEffect(() => {
    if (!ex) return;
    let cancelled = false;
    trackerRef.current = createTracker(ex.id);
    coachOrigin.current = Date.now();
    startedAt.current = Date.now();

    const stepCoach = () => {
      if (cancelled) return;
      const now = Date.now();
      const ph = phaseRef.current;
      if (ph === "rest") {
        const left = Math.max(0, Math.ceil((restUntil.current - now) / 1000));
        setRestLeft(left);
        if (left <= 0) {
          setRef.current += 1;
          setSetIdx(setRef.current);
          countRef.current = 0;
          setCount(0);
          phaseRef.current = "live";
          setPhase("live");
          trackerRef.current.reset();
          coachOrigin.current = now;
          speak("Begin.", voiceRef.current);
        }
      } else if (ph === "live") {
        const t = now - coachOrigin.current;
        const pose = coachPose(ex.id, t, ex.tempoMs);
        landmarksRef.current = pose;
        applyEval(trackerRef.current.tick(pose, now));
      }
      paint();
      rafRef.current = requestAnimationFrame(stepCoach);
    };

    const start = async () => {
      if (mode !== "camera") {
        stepCoach();
        return;
      }
      try {
        await loadPoseLib();
        if (cancelled) return;
        const video = videoRef.current;
        if (!video) throw new Error("No video element");
        streamRef.current = await startCamera(video);
        const pose = createPose();
        poseRef.current = pose;
        pose.onResults((r) => {
          if (cancelled) return;
          const now = Date.now();
          const ph = phaseRef.current;
          if (ph === "rest") {
            const left = Math.max(0, Math.ceil((restUntil.current - now) / 1000));
            setRestLeft(left);
            if (left <= 0) {
              setRef.current += 1;
              setSetIdx(setRef.current);
              countRef.current = 0;
              setCount(0);
              phaseRef.current = "live";
              setPhase("live");
              trackerRef.current.reset();
              speak("Begin.", voiceRef.current);
            }
          } else if (ph === "live") {
            landmarksRef.current = r.poseLandmarks ?? null;
            applyEval(trackerRef.current.tick(r.poseLandmarks, now));
          }
          if (video.videoWidth && canvasRef.current) {
            canvasRef.current.width = video.videoWidth;
            canvasRef.current.height = video.videoHeight;
          }
          paint();
        });
        const tick = async () => {
          if (cancelled) return;
          if (video.readyState >= 2) await pose.send({ image: video });
          rafRef.current = requestAnimationFrame(tick);
        };
        tick();
      } catch (err) {
        setCamError(err instanceof Error ? err.message : "Camera unavailable");
        setMode("coach");
      }
    };

    start();
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      poseRef.current?.close();
      poseRef.current = null;
      stopStream(streamRef.current);
      streamRef.current = null;
      silence();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ex, mode]);

  if (!ex) {
    return (
      <div className="p-8">
        <p>Unknown drill.</p>
        <Link to="/exercises">Library</Link>
      </div>
    );
  }

  const topCue = Object.entries(cueCount.current).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
  const counted = setIdx * target + Math.min(count, target);
  const progressPct = (counted / (sets * target)) * 100;
  const unit = ex.mode === "hold" ? "s" : "";

  const saveAndLeave = (after: number | null) => {
    if (!savedRef.current) {
      savedRef.current = true;
      addSession({
        exerciseId: ex.id,
        reps: counted,
        setsCompleted: phase === "done" ? sets : setIdx + (count > 0 ? 1 : 0),
        targetReps: target * sets,
        durationSec: Math.round((Date.now() - startedAt.current) / 1000),
        formScore,
        painBefore: search.pain ?? null,
        painAfter: after,
        topCue,
        source: mode,
      });
    }
    navigate({ to: "/" });
  };

  return (
    <div className="flex min-h-dvh flex-col bg-studio text-foreground">
      <header className="flex items-center justify-between gap-2 px-3 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (phase === "done") saveAndLeave(painAfter);
            else {
              phaseRef.current = "done";
              setPhase("done");
              const { good, total } = formFrames.current;
              setFormScore(total ? Math.round((good / total) * 100) : 90);
              silence();
            }
          }}
        >
          <ArrowLeft className="size-4" />
          Exit
        </Button>
        <div className="text-center">
          <p className="text-sm font-medium">{ex.title}</p>
          <p className="text-[11px] text-muted-foreground">
            Set {Math.min(setIdx + 1, sets)} / {sets}
          </p>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label={voice ? "Mute voice" : "Enable voice"}
            onClick={() => {
              setVoice((v) => !v);
              if (voice) silence();
            }}
          >
            {voice ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle camera"
            onClick={() => {
              stopStream(streamRef.current);
              streamRef.current = null;
              setMode((m) => (m === "camera" ? "coach" : "camera"));
              setCamError(null);
            }}
          >
            {mode === "camera" ? <Camera className="size-4" /> : <PersonStanding className="size-4" />}
          </Button>
        </div>
      </header>

      <div className="relative mx-auto w-full max-w-3xl flex-1 px-3">
        <video ref={videoRef} className="hidden" playsInline muted />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          className="aspect-[4/3] w-full rounded-xl bg-card object-cover shadow-[var(--shadow-border)]"
        />
        {phase === "rest" && (
          <div className="absolute inset-3 flex flex-col items-center justify-center rounded-xl bg-background/70">
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Rest</p>
            <p className="font-display text-7xl tabular-nums">{restLeft}</p>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => {
                restUntil.current = Date.now();
              }}
            >
              Skip rest
            </Button>
          </div>
        )}
        {camError && (
          <p className="mt-2 text-xs text-muted-foreground">
            Camera unavailable — coach is running the tempo. {camError}
          </p>
        )}
        {mode === "coach" && !camError && phase === "live" && (
          <p className="mt-2 text-xs text-muted-foreground">
            Coach mode · follow the skeleton, or tap to count if you are ahead.
          </p>
        )}
      </div>

      {phase !== "done" ? (
        <section className="mx-auto w-full max-w-3xl px-3 pt-4 pb-6">
          <Progress value={progressPct} className="mb-4" />
          <div className="grid grid-cols-3 gap-2">
            <HudCell
              label={ex.mode === "hold" ? "Hold" : "Reps"}
              value={`${Math.min(count, target)}${unit}`}
              hint={`target ${target}${unit}`}
            />
            <HudCell
              label="Cue"
              value={hud.feedback}
              hint={hud.formOk ? "Form ok" : "Fix this"}
              warn={!hud.formOk}
            />
            <HudCell label="Angle" value={`${hud.angle}°`} hint="working joint" />
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => {
                const next = countRef.current + 1;
                countRef.current = next;
                setCount(next);
                if (next >= target) beginRest();
              }}
            >
              Count {ex.mode === "hold" ? "second" : "rep"}
            </Button>
            <Button variant="outline" onClick={beginRest}>
              End set
            </Button>
          </div>
        </section>
      ) : (
        <section className="mx-auto w-full max-w-lg px-3 pt-4 pb-10">
          <Card className="p-5">
            <Badge variant="good">Ready to save</Badge>
            <h2 className="mt-3 font-display text-3xl tracking-tight">How did that feel?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {counted} counted · form {formScore}%
            </p>
            {topCue && (
              <p className="mt-3 rounded-md bg-secondary px-3 py-2 text-sm">
                Most frequent cue: {topCue}
              </p>
            )}
            <div className="mt-6">
              <PainCheck label="Pain after" value={painAfter} onChange={setPainAfter} />
            </div>
            {search.pain != null && (
              <p className="mt-3 text-sm text-muted-foreground">
                Pain {search.pain} → {painAfter}
                {painAfter < search.pain
                  ? " — trending down."
                  : painAfter > search.pain
                    ? " — if it jumped, stop for today."
                    : " — unchanged."}
              </p>
            )}
            <Button className="mt-6 w-full" size="lg" onClick={() => saveAndLeave(painAfter)}>
              Save and go home
            </Button>
            <Button asChild variant="ghost" className="mt-2 w-full">
              <Link to="/exercises/$id" params={{ id: ex.id }}>
                Repeat this drill
              </Link>
            </Button>
          </Card>
        </section>
      )}
    </div>
  );
}

function HudCell({
  label,
  value,
  hint,
  warn,
}: {
  label: string;
  value: string;
  hint: string;
  warn?: boolean;
}) {
  return (
    <div className="rounded-lg bg-card px-3 py-3 shadow-[var(--shadow-border)]">
      <p className="text-[11px] tracking-wide text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-1 line-clamp-2 font-display text-lg leading-tight tracking-tight",
          warn && "text-destructive",
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}
