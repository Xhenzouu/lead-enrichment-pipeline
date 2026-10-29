import type { Score, Status } from "./mockData";

const base = "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium";

export function ScorePill({ score }: { score: Score | null }) {
  if (!score) return <span className="text-muted-foreground">-</span>;
  const cls =
    score === "high"
      ? "bg-success text-primary-foreground"
      : score === "medium"
        ? "bg-warning text-primary-foreground"
        : "bg-destructive text-destructive-foreground";
  return <span className={`${base} ${cls} capitalize`}>{score}</span>;
}

export function StatusPill({ status }: { status: Status }) {
  const cls =
    status === "Processed"
      ? "bg-success text-primary-foreground"
      : status === "Skipped"
        ? "bg-neutral text-destructive-foreground"
        : "bg-destructive text-destructive-foreground";
  return <span className={`${base} ${cls}`}>{status}</span>;
}
