import { Settings, Workflow } from "lucide-react";

export function Sidebar({ active, onChange }: { active: string; onChange: (v: string) => void }) {
  const items = [
    { id: "pipeline", label: "Pipeline", icon: Workflow },
    { id: "settings", label: "Settings", icon: Settings },
  ];
  return (
    <aside className="hidden w-[260px] shrink-0 flex-col border-r border-border bg-card md:flex">
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="grid h-8 w-8 place-items-center rounded-md bg-primary font-serif text-base font-bold text-primary-foreground">
          L
        </div>
        <span className="font-serif text-lg">LeadCommand</span>
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {items.map((i) => (
          <button
            key={i.id}
            onClick={() => onChange(i.id)}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              active === i.id
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <i.icon className="h-4 w-4" />
            {i.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
