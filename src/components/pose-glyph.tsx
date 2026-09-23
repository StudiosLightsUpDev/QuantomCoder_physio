import { cn } from "@/lib/utils";
import type { ExerciseId } from "@/lib/physio/types";

const paths: Record<ExerciseId, string> = {
  knee_squat:
    "M50 18c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5zm0 12v22 M42 52 L50 52 L58 52 M42 52 L38 78 L36 108 M58 52 L62 78 L64 108 M38 78 L58 78",
  shoulder_raise:
    "M50 16c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5zm0 12v28 M36 54 L50 54 L64 54 M36 54 L18 48 M64 54 L82 48 M36 82 L50 54 L64 82 M42 82 L42 118 M58 82 L58 118",
  hip_raise:
    "M22 78c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5zm6 4h28 M56 82 L72 48 M56 82 L62 118 M34 82 L34 118",
  back_stretch:
    "M28 86 L36 62 L58 58 L78 82 M36 62 L28 92 M58 58 Q70 40 82 46 M22 92 h16 M70 82 h18",
  glute_bridge:
    "M24 96c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5zm8 2h40 L86 96 M32 98 L40 70 L72 70 L80 98 M40 70 L36 48",
  calf_raise:
    "M50 14c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5zm0 12v28 M40 54 L50 54 L60 54 M40 54 L40 88 L38 108 M60 54 L60 88 L62 108 M38 108 L34 100 M62 108 L66 100",
  side_leg_raise:
    "M40 16c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5zm0 12v30 M32 58 L40 58 L48 58 M32 58 L30 92 L28 118 M48 58 L72 78 L86 92 M28 118 h10",
  wall_sit:
    "M28 12 v108 M50 20c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5zm-8 14h8 v24 L42 78 L40 110 M58 58 L70 78 L68 110",
};

export function PoseGlyph({
  id,
  className,
}: {
  id: ExerciseId;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 130"
      className={cn("text-primary", className)}
      fill="none"
      aria-hidden
    >
      <path
        d={paths[id]}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
