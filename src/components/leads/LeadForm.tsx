import { useState } from "react";

export interface FormValues {
  name: string;
  email: string;
  domain: string;
  message: string;
}

const input =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring";

export function LeadForm({ onSubmit }: { onSubmit: (v: FormValues) => void }) {
  const [v, setV] = useState<FormValues>({ name: "", email: "", domain: "", message: "" });
  const set = (k: keyof FormValues) => (e: { target: { value: string } }) =>
    setV({ ...v, [k]: e.target.value });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(v);
      }}
      className="rounded-lg border border-border bg-card p-6"
    >
      <h2 className="mb-4 font-serif text-xl">New inbound lead</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">Name</span>
          <input required className={input} value={v.name} onChange={set("name")} placeholder="Jane Doe" />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">Email</span>
          <input required type="email" className={input} value={v.email} onChange={set("email")} placeholder="jane@acme.ph" />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">Company Domain</span>
          <input className={input} value={v.domain} onChange={set("domain")} placeholder="https://www.acme.ph" />
        </label>
      </div>
      <label className="mt-4 block text-sm">
        <span className="mb-1 block text-muted-foreground">Message</span>
        <textarea rows={3} className={input} value={v.message} onChange={set("message")} placeholder="We need help automating our CRM pipeline..." />
      </label>
      <button className="mt-5 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
        Process Lead
      </button>
    </form>
  );
}
