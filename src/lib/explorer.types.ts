import { z } from "zod";

export type NodeType = "course" | "semester" | "subject" | "unit";
export type NodeStatus = "draft" | "published" | "archived";

export type NodeMeta = {
  slug?: string | null;
  code?: string | null;
  number?: number | null;
  description?: string | null;
  summary?: string | null;
};

export type ExplorerNode = {
  id: string;
  type: NodeType;
  name: string;
  status: NodeStatus;
  position: number;
  parentId: string | null;
  meta: NodeMeta;
  childCount: number;
  children?: ExplorerNode[];
};

export const NODE_TYPE = z.enum(["course", "semester", "subject", "unit"]);

export type NodeTable = "courses" | "semesters" | "subjects" | "units";

export function tableFor(type: NodeType): NodeTable {
  switch (type) {
    case "course":
      return "courses";
    case "semester":
      return "semesters";
    case "subject":
      return "subjects";
    case "unit":
      return "units";
  }
}
