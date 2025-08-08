import type { Pillar, Node, Ritual } from "@portal/types";
import { nanoid } from "nanoid";

export const pillars: Pillar[] = [
  { id: "build", name: "Build", hue: 198, weight: 1 },
  { id: "research", name: "Research", hue: 271, weight: 1 },
  { id: "teach", name: "Teach", hue: 340, weight: 0.9 },
  { id: "ops", name: "Ops", hue: 45, weight: 0.8 },
  { id: "people", name: "People", hue: 160, weight: 0.7 }
];

export const nodes: Node[] = Array.from({ length: 28 }).map((_, i) => ({
  id: nanoid(6),
  pillarId: pillars[i % pillars.length].id,
  title: ["Docs", "Workflow", "Dataset", "Space", "Thread"][i % 5] + " " + (i + 1),
  kind: ["doc", "app", "data", "space", "thread"][i % 5] as Node["kind"],
  activity: Math.random(),
  updatedAt: Date.now() - Math.floor(Math.random() * 1e7)
}));

export const rituals: Ritual[] = [
  { id: "start-day", label: "Start Day", filter: { minActivity: 0.2 } },
  { id: "ship-review", label: "Ship Review", filter: { kinds: ["app", "doc"] } },
  { id: "deep-work", label: "Deep Work", filter: { pillars: ["build", "research"] } }
];