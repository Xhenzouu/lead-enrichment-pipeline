import { useEffect, useState } from "react";
import { Check, Loader2, Circle } from "lucide-react";
import { generateMockProcess } from "./mockData";
import { ScorePill } from "./Pills";

type Result = ReturnType<typeof generateMockProcess>;

const steps = [
  { title: "Normalizing Domain", ms: 1000 },
  { title: "Apify Enrichment", ms: 2000 },
  { title: "Groq Scoring", ms: 2000 },
  { title: "HubSpot Upsert", ms: 1000 },
];

export function ExecutionTimeline({
  result,
  onDone,
  onReset,
}: {
  result: Result;
  onDone: () => void;
  onReset: () => void;
}) {
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (done >= steps.length) {
      onDone();
      return;
    }
    const t = setTimeout(() => setDone((d) => d + 1), steps[done]?.ms ?? 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const outputs = [
    <p key="0">
      Domain normalized to <span className="font-medium text-foreground">{result.domain || "(empty)"}</span>
    </p>,
    <div key="1" className="space-y-1">
      <p>{result.description}</p>
      <p>Tech Stack: {result.techStack.length ? result.techStack.join(", ") : "None detected"}</p>
    </div>,
    <div key="2" className="space-y-2">
      <ScorePill score={result.score} />
      <p className="font-mono text-xs">criteria_met: {JSON.stringify(result.criteria_met)}</p>
      <p>"{result.reasoning}"</p>
    </div>,
    <p key="3">Contact ID {result.hubspotId} created. Deal created and associated.</p>,
  ];

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-6 font-serif text-xl">Execution trace</h2>
      <ol className="relative space-y-6 border-l border-border pl-6">
        {steps.map((s, i) => {
          const state = i < done ? "done" : i === done ? "running" : "pending";
          return (
            <li key={s.title} className="relative">
              <span className="absolute -left-[35px] grid h-6 w-6 place-items-center rounded-full border border-border bg-card">
                {state === "done" ? (
                  <Check className="h-3.5 w-3.5 text-success" />
                ) : state === "running" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                ) : (
                  <Circle className="h-2.5 w-2.5 text-muted-foreground" />
                )}
              </span>
              <p className={`text-sm font-medium ${state === "pending" ? "text-muted-foreground" : ""}`}>
                Step {i + 1}: {s.title}
              </p>
              {state === "done" && <div className="mt-2 text-sm text-muted-foreground">{outputs[i]}</div>}
            </li>
          );
        })}
      </ol>
      {done >= steps.length && (
        <button
          onClick={onReset}
          className="mt-6 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Process Another Lead
        </button>
      )}
    </div>
  );
}
