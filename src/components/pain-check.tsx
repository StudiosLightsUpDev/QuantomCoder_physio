import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export function PainCheck({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  const tone =
    value <= 3 ? "text-good" : value <= 6 ? "text-warn" : "text-destructive";
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className={cn("font-display text-3xl tabular-nums tracking-tight", tone)}>
          {value}
          <span className="ml-1 text-sm text-muted-foreground">/10</span>
        </p>
      </div>
      <Slider
        min={0}
        max={10}
        step={1}
        value={[value]}
        onValueChange={(v) => onChange(v[0] ?? 0)}
      />
      <div className="flex justify-between text-[11px] tracking-wide text-muted-foreground">
        <span>None</span>
        <span>Manageable</span>
        <span>Stop</span>
      </div>
    </div>
  );
}
