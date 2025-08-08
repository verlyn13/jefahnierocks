export type PillarId = string;
export type NodeId = string;

export interface Pillar {
  id: PillarId;
  name: string;
  hue: number;     // 0–360 for map coloring
  weight: number;  // influences gravity
}

export interface Node {
  id: NodeId;
  pillarId: PillarId;
  title: string;
  kind: "app" | "doc" | "space" | "thread" | "data";
  activity: number;   // 0..1
  updatedAt: number;  // epoch
}

export interface Ritual {
  id: "start-day" | "ship-review" | "deep-work";
  label: string;
  filter: { 
    pillars?: PillarId[]; 
    kinds?: Node["kind"][]; 
    minActivity?: number;
  };
}