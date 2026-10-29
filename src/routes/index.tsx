import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Sidebar } from "@/components/leads/Sidebar";
import { LeadForm, type FormValues } from "@/components/leads/LeadForm";
import { ExecutionTimeline } from "@/components/leads/ExecutionTimeline";
import { LeadTable } from "@/components/leads/LeadTable";
import { LeadDrawer } from "@/components/leads/LeadDrawer";
import { generateMockProcess, initialLeads, type Lead } from "@/components/leads/mockData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lead Enrichment Command Center" },
      { name: "description", content: "Enrich, score and sync inbound B2B leads to HubSpot." },
      { property: "og:title", content: "Lead Enrichment Command Center" },
      { property: "og:description", content: "Enrich, score and sync inbound B2B leads to HubSpot." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const [dark, setDark] = useState(true);
  const [nav, setNav] = useState("pipeline");
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [run, setRun] = useState<{ form: FormValues; result: ReturnType<typeof generateMockProcess> } | null>(null);
  const [selected, setSelected] = useState<Lead | null>(null);

  const finish = () => {
    if (!run) return;
    const { form, result } = run;
    const skipped = !result.domain;
    setLeads((l) => [
      {
        id: crypto.randomUUID(),
        name: form.name,
        email: form.email,
        company: skipped ? "-" : result.company,
        domain: result.domain,
        message: form.message,
        score: skipped ? null : result.score,
        status: skipped ? "Skipped" : "Processed",
        description: skipped ? "Skipped: domain missing." : result.description,
        techStack: skipped ? [] : result.techStack,
        criteria_met: skipped ? [] : result.criteria_met,
        reasoning: skipped ? "No domain provided; enrichment skipped." : result.reasoning,
        hubspotId: skipped ? undefined : result.hubspotId,
      },
      ...l,
    ]);
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar active={nav} onChange={setNav} />
        <main className="flex-1">
          <header className="flex items-center justify-between border-b border-border px-8 py-5">
            <h1 className="font-serif text-2xl md:text-3xl">
              {nav === "pipeline" ? "Lead Enrichment Pipeline" : "Settings"}
            </h1>
            <button
              onClick={() => setDark(!dark)}
              role="switch"
              aria-checked={dark}
              aria-label="Toggle dark mode"
              className="flex items-center gap-2 rounded-full border border-border bg-card p-1"
            >
              <span className={`rounded-full p-1.5 ${!dark ? "bg-accent" : ""}`}><Sun className="h-4 w-4" /></span>
              <span className={`rounded-full p-1.5 ${dark ? "bg-accent" : ""}`}><Moon className="h-4 w-4" /></span>
            </button>
          </header>
          {nav === "pipeline" ? (
            <div className="mx-auto max-w-5xl space-y-6 p-8">
              {run ? (
                <ExecutionTimeline key={run.result.hubspotId + run.form.email} result={run.result} onDone={finish} onReset={() => setRun(null)} />
              ) : (
                <LeadForm onSubmit={(form) => setRun({ form, result: generateMockProcess(form.domain, form.message) })} />
              )}
              <LeadTable leads={leads} onSelect={setSelected} />
            </div>
          ) : (
            <div className="p-8 text-sm text-muted-foreground">
              Integrations: Apify, Groq and HubSpot are simulated locally in this demo.
            </div>
          )}
        </main>
        <LeadDrawer lead={selected} onClose={() => setSelected(null)} />
      </div>
    </div>
  );
}
