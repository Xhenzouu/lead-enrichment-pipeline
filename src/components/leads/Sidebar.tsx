import { useState } from "react";
import { ChevronsLeft, ChevronsRight, Settings, Workflow } from "lucide-react";

export function Sidebar({ active, onChange }: { active: string; onChange: (v: string) => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    { id: "pipeline", label: "Pipeline", icon: Workflow },
    { id: "settings", label: "Settings", icon: Settings },
  ];
  const fade = `overflow-hidden whitespace-nowrap transition-opacity duration-200 ease-in-out ${
    collapsed ? "w-0 opacity-0" : "opacity-100"
  }`;
  const toggleLabel = collapsed ? "Expand sidebar" : "Collapse sidebar";

  return (
    <aside
      className={`hidden shrink-0 flex-col overflow-hidden border-r border-border bg-card transition-[width] duration-200 ease-in-out md:flex ${
        collapsed ? "w-[68px]" : "w-[260px]"
      }`}
    >
      <div className={`flex py-6 ${collapsed ? "flex-col items-center gap-3 px-2" : "items-center gap-2 px-6"}`}>
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary font-serif text-base font-bold text-primary-foreground">
          L
        </div>
        <span className={`font-serif text-lg ${fade} ${collapsed ? "absolute" : ""}`}>LeadCommand</span>
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={toggleLabel}
          title={toggleLabel}
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-md bg-transparent text-muted-foreground transition-colors hover:bg-accent hover:text-foreground ${
            collapsed ? "" : "ml-auto"
          }`}
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </button>
        {collapsed && <div className="mb-3 h-px w-10 bg-border" />}
      </div>
      <nav className={`flex flex-col gap-1 ${collapsed ? "-mt-6 items-center px-2" : "px-3"}`}>
        {items.map((i) => (
          <button
            key={i.id}
            onClick={() => onChange(i.id)}
            title={collapsed ? i.label : undefined}
            aria-label={i.label}
            className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors ${
              collapsed ? "justify-center" : "gap-3"
            } ${
              active === i.id
                ? collapsed
                  ? "bg-primary/15 text-foreground"
                  : "bg-accent text-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <i.icon className="h-4 w-4 shrink-0" />
            <span className={fade}>{i.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
