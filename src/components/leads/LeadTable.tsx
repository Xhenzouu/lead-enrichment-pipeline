import type { Lead } from "./mockData";
import { ScorePill, StatusPill } from "./Pills";

export function LeadTable({ leads, onSelect }: { leads: Lead[]; onSelect: (l: Lead) => void }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="px-6 py-4">
        <h2 className="font-serif text-xl">Processed leads</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-y border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              {["Lead Name", "Company", "Domain", "Score", "Status"].map((h) => (
                <th key={h} className="px-6 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr
                key={l.id}
                onClick={() => onSelect(l)}
                className="cursor-pointer border-b border-border last:border-0 hover:bg-muted"
              >
                <td className="px-6 py-3 font-medium">{l.name}</td>
                <td className="px-6 py-3">{l.company}</td>
                <td className="px-6 py-3 text-muted-foreground">{l.domain || "-"}</td>
                <td className="px-6 py-3"><ScorePill score={l.status === "Processed" ? l.score : null} /></td>
                <td className="px-6 py-3"><StatusPill status={l.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
