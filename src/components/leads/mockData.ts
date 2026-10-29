export type Score = "high" | "medium" | "low";
export type Status = "Processed" | "Skipped" | "Failed";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  domain: string;
  message: string;
  score: Score | null;
  status: Status;
  description: string;
  techStack: string[];
  criteria_met: string[];
  reasoning: string;
  hubspotId?: string | undefined;
}

export const initialLeads: Lead[] = [
  {
    id: "1",
    name: "Maria Santos",
    email: "maria@acme.ph",
    company: "Acme Retail Group",
    domain: "acme.ph",
    message: "We need an automated lead routing setup for our 40-person sales team.",
    score: "high",
    status: "Processed",
    description: "Multi-brand retail operator with 120 employees across Metro Manila.",
    techStack: ["Shopify", "React", "Klaviyo"],
    criteria_met: ["Company Maturity", "Specific Solution Request"],
    reasoning: "Established company with a clear, scoped request for sales automation.",
    hubspotId: "562709904211",
  },
  {
    id: "2",
    name: "John Reyes",
    email: "john@gmail.com",
    company: "Unknown",
    domain: "gmail.com",
    message: "Just browsing, what do you do?",
    score: "low",
    status: "Processed",
    description: "Free email provider; no company data available.",
    techStack: [],
    criteria_met: [],
    reasoning: "Personal email with no business context or concrete need stated.",
    hubspotId: "562709904877",
  },
  {
    id: "3",
    name: "Liza Cruz",
    email: "liza@",
    company: "-",
    domain: "",
    message: "Interested in a demo.",
    score: null,
    status: "Skipped",
    description: "Skipped: domain missing.",
    techStack: [],
    criteria_met: [],
    reasoning: "No domain could be extracted, so enrichment and scoring were skipped.",
  },
];

export function normalizeDomain(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0] ?? "";
}

function hash(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

const stacks: string[][] = [
  ["Shopify", "React"],
  ["WordPress", "HubSpot"],
  ["Next.js", "Stripe", "Segment"],
  ["Salesforce", "Angular"],
];

export function generateMockProcess(domain: string, message: string) {
  const d = normalizeDomain(domain);
  const h = hash(d);
  const base = d.split(".")[0] || "company";
  const company = base.charAt(0).toUpperCase() + base.slice(1);
  const msg = message.toLowerCase();
  const criteria: string[] = [];
  const free = /gmail|yahoo|outlook|hotmail/.test(d);
  if (!free && h % 3 !== 0) criteria.push("Company Maturity");
  if (/need|looking|automat|integrat|pipeline|crm|demo|budget/.test(msg))
    criteria.push("Specific Solution Request");
  if (/budget|quarter|asap|urgent|this month/.test(msg)) criteria.push("Timeline / Budget Signal");
  const score: Score = criteria.length >= 2 ? "high" : criteria.length === 1 ? "medium" : "low";
  const reasoning =
    score === "high"
      ? `${company} shows business maturity and a concrete request, indicating strong buying intent.`
      : score === "medium"
        ? `${company} meets one qualifying criterion but lacks enough signals for a high-priority lead.`
        : `No qualifying signals were found for ${company}, so this lead is low priority.`;
  return {
    domain: d,
    company: free ? "Unknown" : company,
    description: free
      ? "Free email provider; no company data available."
      : `${company} is a ${["B2B SaaS", "e-commerce", "logistics", "professional services"][h % 4]} company with roughly ${20 + (h % 480)} employees.`,
    techStack: free ? [] : (stacks[h % stacks.length] ?? []),
    score,
    criteria_met: criteria,
    reasoning,
    hubspotId: String(562709900000 + (h % 99999)),
  };
}
