import { useState } from "react";
import { ChevronLeft, ChevronRight, Settings, Workflow } from "lucide-react";

export function Sidebar({ active, onChange }: { active: string; onChange: (v: string) => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    { id: "pipeline", label: "Pipeline", icon: Workflow },
    { id: "settings", label: "Settings", icon: Settings },
  ];
  return (
    <aside
      className={`hidden shrink-0 flex-col border-r border-border bg-card transition-[width] duration-200 md:flex ${
        collapsed ? "w-[68px]" : "w-[260px]"
      }`}
    >
      <div className={`flex items-center gap-2 py-6 ${collapsed ? "flex-col px-2" : "px-6"}`}>
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary font-serif text-base font-bold text-primary-foreground">
          L
        </div>
        {!collapsed && <span className="font-serif text-lg">LeadCommand</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground ${collapsed ? "" : "ml-auto"}`}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {items.map((i) => (
          <button
            key={i.id}
            onClick={() => onChange(i.id)}
            title={collapsed ? i.label : undefined}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              collapsed ? "justify-center" : ""
            } ${active === i.id ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <i.icon className="h-4 w-4 shrink-0" />
            {!collapsed && i.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
