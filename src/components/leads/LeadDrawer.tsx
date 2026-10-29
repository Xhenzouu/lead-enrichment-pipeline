import { X } from "lucide-react";
import type { Lead } from "./mockData";
import { ScorePill, StatusPill } from "./Pills";

export function LeadDrawer({ lead, onClose }: { lead: Lead | null; onClose: () => void }) {
  if (!lead) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-foreground/30" onClick={onClose} />
      <aside className="relative h-full w-full max-w-md overflow-y-auto border-l border-border bg-card p-6">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="font-serif text-2xl">{lead.name}</h2>
            <p className="text-sm text-muted-foreground">{lead.email}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-md p-1 hover:bg-accent">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mb-6 flex gap-2">
          <StatusPill status={lead.status} />
          <ScorePill score={lead.status === "Processed" ? lead.score : null} />
        </div>
        <Section title="Message"><p>{lead.message || "-"}</p></Section>
        <Section title="Enrichment">
          <p>{lead.company} · {lead.domain || "no domain"}</p>
          <p className="mt-1">{lead.description}</p>
          <p className="mt-1">Tech Stack: {lead.techStack.length ? lead.techStack.join(", ") : "None"}</p>
        </Section>
        <Section title="Criteria Met">
          {lead.criteria_met.length ? (
            <div className="flex flex-wrap gap-2">
              {lead.criteria_met.map((c) => (
                <span key={c} className="rounded-md bg-accent px-2 py-1 text-xs">{c}</span>
              ))}
            </div>
          ) : (
            <p className="font-mono text-xs">[]</p>
          )}
        </Section>
        <Section title="Reasoning"><p>{lead.reasoning}</p></Section>
        {lead.hubspotId && <Section title="HubSpot"><p>Contact ID {lead.hubspotId}</p></Section>}
      </aside>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 border-t border-border pt-4 text-sm">
      <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</h3>
      {children}
    </section>
  );
}
