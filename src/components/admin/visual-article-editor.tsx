import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  Code2,
  AlertTriangle,
  Sparkles,
  List,
  ListOrdered,
  Table as TableIcon,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Copy,
  Check,
  Eye,
  Edit3,
  FileType,
  Layers,
  HelpCircle,
  BookOpen,
  Info,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type BlockType =
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "paragraph"
  | "code"
  | "callout"
  | "bullet_list"
  | "numbered_list"
  | "table"
  | "takeaway";

export type ContentBlockItem = {
  id: string;
  type: BlockType;
  content: string;
  language?: string; // for code blocks
  calloutType?: "exam_tip" | "important" | "formula" | "warning"; // for callout blocks
  listItems?: string[]; // for lists
  tableHeaders?: string[]; // for tables
  tableRows?: string[][]; // for tables
};

/* ────────── Parser: Markdown to Visual Blocks ────────── */

export function parseMarkdownToBlocks(markdown: string): ContentBlockItem[] {
  if (!markdown || !markdown.trim()) {
    return [
      {
        id: "block-1",
        type: "paragraph",
        content: "",
      },
    ];
  }

  const lines = markdown.split("\n");
  const blocks: ContentBlockItem[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block ```
    if (line.trim().startsWith("```")) {
      const lang = line.trim().replace(/^```/, "").trim() || "code";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push({
        id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        type: "code",
        content: codeLines.join("\n"),
        language: lang,
      });
      if (i < lines.length && lines[i].trim().startsWith("```")) {
        i++;
      }
      continue;
    }

    // Callout block > [!TIP] / > [!IMPORTANT] / > [!WARNING] or general > quote
    if (line.trim().startsWith(">")) {
      let calloutType: ContentBlockItem["calloutType"] = "important";
      const quoteLines: string[] = [];

      while (i < lines.length && lines[i].trim().startsWith(">")) {
        let clean = lines[i].trim().replace(/^>\s?/, "");
        if (clean.includes("[!TIP]") || clean.includes("EXAM TIP") || clean.includes("Exam Tip")) {
          calloutType = "exam_tip";
          clean = clean.replace(/\[!TIP\]\s?/, "").replace(/^Exam Tip:\s?/i, "");
        } else if (clean.includes("[!WARNING]")) {
          calloutType = "warning";
          clean = clean.replace(/\[!WARNING\]\s?/, "");
        } else if (clean.includes("Formula:") || clean.includes("[!FORMULA]")) {
          calloutType = "formula";
          clean = clean.replace(/\[!FORMULA\]\s?/, "");
        }
        if (clean) quoteLines.push(clean);
        i++;
      }

      blocks.push({
        id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        type: "callout",
        content: quoteLines.join("\n"),
        calloutType,
      });
      continue;
    }

    // Heading 4 ####
    if (line.trim().startsWith("#### ")) {
      blocks.push({
        id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        type: "heading4",
        content: line.trim().replace(/^####\s+/, ""),
      });
      i++;
      continue;
    }

    // Heading 3 ###
    if (line.trim().startsWith("### ")) {
      blocks.push({
        id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        type: "heading3",
        content: line.trim().replace(/^###\s+/, ""),
      });
      i++;
      continue;
    }

    // Heading 2 ##
    if (line.trim().startsWith("## ")) {
      blocks.push({
        id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        type: "heading2",
        content: line.trim().replace(/^##\s+/, ""),
      });
      i++;
      continue;
    }

    // Heading 1 #
    if (line.trim().startsWith("# ")) {
      blocks.push({
        id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        type: "heading1",
        content: line.trim().replace(/^#\s+/, ""),
      });
      i++;
      continue;
    }

    // Bullet List - or *
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const items: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
      ) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push({
        id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        type: "bullet_list",
        content: items.join("\n"),
        listItems: items,
      });
      continue;
    }

    // Numbered List 1. 2.
    if (/^\d+\.\s+/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({
        id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        type: "numbered_list",
        content: items.join("\n"),
        listItems: items,
      });
      continue;
    }

    // Markdown Table | Header | Header |
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        const parseRow = (rowStr: string) =>
          rowStr
            .slice(1, -1)
            .split("|")
            .map((c) => c.trim());

        const headers = parseRow(tableLines[0]);
        const rows = tableLines.slice(2).map(parseRow); // Skip separator row

        blocks.push({
          id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          type: "table",
          content: tableLines.join("\n"),
          tableHeaders: headers,
          tableRows: rows.length ? rows : [headers.map(() => "")],
        });
        continue;
      }
    }

    // Regular paragraph
    if (line.trim()) {
      const paraLines: string[] = [line];
      i++;
      while (
        i < lines.length &&
        lines[i].trim() &&
        !lines[i].trim().startsWith("#") &&
        !lines[i].trim().startsWith("```") &&
        !lines[i].trim().startsWith(">") &&
        !lines[i].trim().startsWith("- ") &&
        !lines[i].trim().startsWith("* ") &&
        !/^\d+\.\s+/.test(lines[i].trim()) &&
        !lines[i].trim().startsWith("|")
      ) {
        paraLines.push(lines[i]);
        i++;
      }
      blocks.push({
        id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        type: "paragraph",
        content: paraLines.join("\n"),
      });
      continue;
    }

    i++;
  }

  return blocks.length ? blocks : [{ id: "b-1", type: "paragraph", content: "" }];
}

/* ────────── Serializer: Visual Blocks to Markdown ────────── */

export function serializeBlocksToMarkdown(blocks: ContentBlockItem[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "heading2":
          return `## ${b.content.trim()}`;
        case "heading3":
          return `### ${b.content.trim()}`;
        case "paragraph":
          return b.content.trim();
        case "code":
          return `\`\`\`${b.language || "c"}\n${b.content}\n\`\`\``;
        case "callout": {
          const prefix =
            b.calloutType === "exam_tip"
              ? "> [!TIP] **Exam Tip:** "
              : b.calloutType === "formula"
                ? "> **Key Formula:** "
                : b.calloutType === "warning"
                  ? "> [!WARNING] **Important:** "
                  : "> **Exam Note:** ";
          return `${prefix}${b.content.trim()}`;
        }
        case "bullet_list":
          return (b.listItems && b.listItems.length ? b.listItems : b.content.split("\n"))
            .filter((item) => item.trim())
            .map((item) => `- ${item.trim()}`)
            .join("\n");
        case "numbered_list":
          return (b.listItems && b.listItems.length ? b.listItems : b.content.split("\n"))
            .filter((item) => item.trim())
            .map((item, idx) => `${idx + 1}. ${item.trim()}`)
            .join("\n");
        case "takeaway":
          return `> [!TIP] **Key Takeaways & Summary:**\n> ${b.content.trim().replace(/\n/g, "\n> ")}`;
        case "table": {
          const headers = b.tableHeaders || ["Topic", "Key Concept"];
          const sep = headers.map(() => "---");
          const rows = b.tableRows || [["", ""]];
          const lines = [
            `| ${headers.join(" | ")} |`,
            `| ${sep.join(" | ")} |`,
            ...rows.map((r) => `| ${r.join(" | ")} |`),
          ];
          return lines.join("\n");
        }
        default:
          return b.content;
      }
    })
    .filter((b) => b && b.trim())
    .join("\n\n");
}

/* ────────── Main Visual Article Editor Component ────────── */

export function VisualArticleEditor({
  value,
  onChange,
  unitTitle,
}: {
  value: string;
  onChange: (markdown: string) => void;
  unitTitle?: string;
}) {
  const [blocks, setBlocks] = useState<ContentBlockItem[]>(() => parseMarkdownToBlocks(value));
  const [editorMode, setEditorMode] = useState<"VISUAL" | "SPLIT" | "RAW">("VISUAL");

  // Keep synced with external value changes
  useEffect(() => {
    const serialized = serializeBlocksToMarkdown(blocks);
    if (serialized !== value) {
      setBlocks(parseMarkdownToBlocks(value));
    }
  }, [value]);

  const updateBlocks = (next: ContentBlockItem[]) => {
    setBlocks(next);
    onChange(serializeBlocksToMarkdown(next));
  };

  const addBlock = (type: BlockType, afterIndex?: number) => {
    const newBlock: ContentBlockItem = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      type,
      content: "",
      language: type === "code" ? "c" : undefined,
      calloutType: type === "callout" ? "exam_tip" : undefined,
      listItems: type === "bullet_list" || type === "numbered_list" ? [""] : undefined,
      tableHeaders:
        type === "table" ? ["Feature / Concept", "Description", "Exam Weight"] : undefined,
      tableRows: type === "table" ? [["", "", ""]] : undefined,
    };

    const next = [...blocks];
    if (afterIndex !== undefined) {
      next.splice(afterIndex + 1, 0, newBlock);
    } else {
      next.push(newBlock);
    }
    updateBlocks(next);
  };

  const removeBlock = (index: number) => {
    const next = blocks.filter((_, i) => i !== index);
    updateBlocks(next.length ? next : [{ id: "b-1", type: "paragraph", content: "" }]);
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    const next = [...blocks];
    const [temp] = next.splice(index, 1);
    next.splice(targetIndex, 0, temp);
    updateBlocks(next);
  };

  const updateBlockField = (index: number, patch: Partial<ContentBlockItem>) => {
    const next = blocks.map((b, i) => (i === index ? { ...b, ...patch } : b));
    updateBlocks(next);
  };

  return (
    <div className="space-y-4">
      {/* ─── Fast Block Insertion Toolbar ─── */}
      <div className="sticky top-16 z-20 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border/80 bg-card/95 p-3 shadow-soft backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold uppercase text-muted-foreground mr-1 flex items-center gap-1">
            <Plus className="h-3.5 w-3.5 text-primary" /> Insert:
          </span>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addBlock("heading2")}
            className="h-8 rounded-xl text-xs font-bold gap-1 bg-muted/30"
          >
            <Heading2 className="h-3.5 w-3.5 text-primary" /> Section Heading
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addBlock("heading3")}
            className="h-8 rounded-xl text-xs font-bold gap-1 bg-muted/30"
          >
            <Heading3 className="h-3.5 w-3.5 text-primary" /> Subheading
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addBlock("paragraph")}
            className="h-8 rounded-xl text-xs font-bold gap-1 bg-muted/30"
          >
            <AlignLeft className="h-3.5 w-3.5 text-muted-foreground" /> Text Paragraph
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addBlock("callout")}
            className="h-8 rounded-xl text-xs font-bold gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
          >
            <Flame className="h-3.5 w-3.5" /> Exam Callout
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addBlock("code")}
            className="h-8 rounded-xl text-xs font-bold gap-1 bg-muted/30 font-mono"
          >
            <Code2 className="h-3.5 w-3.5 text-blue-500" /> Code Block
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addBlock("table")}
            className="h-8 rounded-xl text-xs font-bold gap-1 bg-muted/30"
          >
            <TableIcon className="h-3.5 w-3.5 text-primary" /> Comparison Table
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addBlock("bullet_list")}
            className="h-8 rounded-xl text-xs font-bold gap-1 bg-muted/30"
          >
            <List className="h-3.5 w-3.5 text-muted-foreground" /> Bullet Points
          </Button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setEditorMode("VISUAL")}
            className={cn(
              "px-3 py-1 text-xs font-bold rounded-lg transition-colors",
              editorMode === "VISUAL"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Edit3 className="h-3.5 w-3.5 inline mr-1" /> Visual Blocks
          </button>

          <button
            type="button"
            onClick={() => setEditorMode("SPLIT")}
            className={cn(
              "px-3 py-1 text-xs font-bold rounded-lg transition-colors",
              editorMode === "SPLIT"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Eye className="h-3.5 w-3.5 inline mr-1" /> Live Preview
          </button>

          <button
            type="button"
            onClick={() => setEditorMode("RAW")}
            className={cn(
              "px-3 py-1 text-xs font-bold rounded-lg transition-colors",
              editorMode === "RAW"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Code2 className="h-3.5 w-3.5 inline mr-1" /> Raw Markdown
          </button>
        </div>
      </div>

      {/* ─── Mode 1: Visual Block Authoring ─── */}
      {editorMode === "VISUAL" && (
        <div className="space-y-4">
          {blocks.map((block, idx) => (
            <div
              key={block.id}
              className="group relative rounded-2xl border border-border/70 bg-card p-4 transition-all hover:border-primary/40 shadow-soft"
            >
              {/* Block Header & Controls */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="text-[10px] uppercase font-bold text-muted-foreground bg-muted/40"
                  >
                    {block.type === "heading2"
                      ? "Section Heading"
                      : block.type === "heading3"
                        ? "Subheading"
                        : block.type === "callout"
                          ? "Exam Callout"
                          : block.type === "code"
                            ? `Code (${block.language?.toUpperCase() || "C"})`
                            : block.type === "table"
                              ? "Comparison Table"
                              : block.type === "bullet_list"
                                ? "Bullet List"
                                : block.type === "numbered_list"
                                  ? "Numbered List"
                                  : "Paragraph"}
                  </Badge>
                </div>

                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={idx === 0}
                    onClick={() => moveBlock(idx, "up")}
                    className="h-7 w-7 p-0 rounded-lg text-muted-foreground hover:text-foreground"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={idx === blocks.length - 1}
                    onClick={() => moveBlock(idx, "down")}
                    className="h-7 w-7 p-0 rounded-lg text-muted-foreground hover:text-foreground"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => addBlock("paragraph", idx)}
                    className="h-7 w-7 p-0 rounded-lg text-muted-foreground hover:text-foreground"
                    title="Insert paragraph below"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBlock(idx)}
                    className="h-7 w-7 p-0 rounded-lg text-destructive hover:bg-destructive/10"
                    title="Delete block"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Block Content Renderers */}

              {/* 1. Heading 2 */}
              {block.type === "heading2" && (
                <Input
                  value={block.content}
                  onChange={(e) => updateBlockField(idx, { content: e.target.value })}
                  placeholder="Section title (e.g. 1. Introduction to Graph Theory)..."
                  className="font-display text-xl font-bold bg-muted/10 border-transparent focus:border-primary rounded-xl"
                />
              )}

              {/* 2. Heading 3 */}
              {block.type === "heading3" && (
                <Input
                  value={block.content}
                  onChange={(e) => updateBlockField(idx, { content: e.target.value })}
                  placeholder="Subheading (e.g. 1.1 Adjacency Matrix Representation)..."
                  className="font-display text-base font-bold bg-muted/10 border-transparent focus:border-primary rounded-xl"
                />
              )}

              {/* 3. Paragraph */}
              {block.type === "paragraph" && (
                <Textarea
                  rows={4}
                  value={block.content}
                  onChange={(e) => updateBlockField(idx, { content: e.target.value })}
                  placeholder="Type clear educational explanations, examples, and key university exam concepts here..."
                  className="text-sm leading-relaxed bg-muted/10 border-transparent focus:border-primary rounded-xl p-3"
                />
              )}

              {/* 4. Code Block */}
              {block.type === "code" && (
                <div className="space-y-2 rounded-xl bg-muted/30 p-3 border border-border/60">
                  <div className="flex items-center justify-between gap-2">
                    <Select
                      value={block.language || "c"}
                      onValueChange={(val) => updateBlockField(idx, { language: val })}
                    >
                      <SelectTrigger className="h-8 w-32 rounded-lg text-xs font-mono font-bold bg-card">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="c">C</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="sql">SQL</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="css">CSS</SelectItem>
                        <SelectItem value="bash">Bash</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Textarea
                    rows={6}
                    value={block.content}
                    onChange={(e) => updateBlockField(idx, { content: e.target.value })}
                    placeholder={`// Write ${block.language?.toUpperCase() || "C"} code here...\n#include <stdio.h>\n\nint main() {\n    printf("Hello XRounder");\n    return 0;\n}`}
                    className="font-mono text-xs bg-background/90 rounded-lg p-3 text-foreground leading-relaxed"
                  />
                </div>
              )}

              {/* 5. Exam Callout Box */}
              {block.type === "callout" && (
                <div className="space-y-2 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
                  <div className="flex items-center gap-2">
                    <Select
                      value={block.calloutType || "exam_tip"}
                      onValueChange={(val: any) => updateBlockField(idx, { calloutType: val })}
                    >
                      <SelectTrigger className="h-8 w-40 rounded-lg text-xs font-bold bg-card">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exam_tip">🔥 Exam Tip</SelectItem>
                        <SelectItem value="important">📌 Important Rule</SelectItem>
                        <SelectItem value="formula">⚡ Key Formula</SelectItem>
                        <SelectItem value="warning">⚠️ Common Mistake</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Textarea
                    rows={3}
                    value={block.content}
                    onChange={(e) => updateBlockField(idx, { content: e.target.value })}
                    placeholder="Key exam takeaways, repeatedly asked points, or direct formulas..."
                    className="text-xs font-medium bg-card/60 rounded-xl p-3"
                  />
                </div>
              )}

              {/* 6. Comparison Table */}
              {block.type === "table" && (
                <div className="space-y-3 rounded-2xl border border-border/80 bg-muted/20 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-muted-foreground">
                      Comparison Matrix
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const headers = block.tableHeaders || ["Topic", "Concept"];
                        const rows = block.tableRows || [];
                        updateBlockField(idx, {
                          tableRows: [...rows, headers.map(() => "")],
                        });
                      }}
                      className="h-7 text-xs font-bold rounded-lg"
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add Row
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border/70">
                          {(block.tableHeaders || ["Topic", "Key Concept", "Exam Note"]).map(
                            (h, hIdx) => (
                              <th key={hIdx} className="p-2">
                                <Input
                                  value={h}
                                  onChange={(e) => {
                                    const nextHeaders = [
                                      ...(block.tableHeaders || [
                                        "Topic",
                                        "Key Concept",
                                        "Exam Note",
                                      ]),
                                    ];
                                    nextHeaders[hIdx] = e.target.value;
                                    updateBlockField(idx, { tableHeaders: nextHeaders });
                                  }}
                                  className="h-7 text-xs font-bold bg-card rounded-lg"
                                />
                              </th>
                            ),
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {(block.tableRows || [["", "", ""]]).map((row, rIdx) => (
                          <tr key={rIdx} className="border-b border-border/40">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-2">
                                <Input
                                  value={cell}
                                  onChange={(e) => {
                                    const nextRows = (block.tableRows || []).map((r, ri) =>
                                      ri === rIdx
                                        ? r.map((c, ci) => (ci === cIdx ? e.target.value : c))
                                        : r,
                                    );
                                    updateBlockField(idx, { tableRows: nextRows });
                                  }}
                                  className="h-7 text-xs bg-card/60 rounded-lg"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 7. Bullet / Numbered List */}
              {(block.type === "bullet_list" || block.type === "numbered_list") && (
                <Textarea
                  rows={4}
                  value={block.content}
                  onChange={(e) => {
                    const text = e.target.value;
                    const items = text.split("\n");
                    updateBlockField(idx, { content: text, listItems: items });
                  }}
                  placeholder="One bullet point per line..."
                  className="text-xs leading-relaxed bg-muted/10 border-transparent focus:border-primary rounded-xl p-3"
                />
              )}
            </div>
          ))}

          {/* Bottom Add Section */}
          <div className="flex items-center justify-center p-6 border-2 border-dashed border-border/70 rounded-2xl">
            <Button
              type="button"
              variant="outline"
              onClick={() => addBlock("paragraph")}
              className="rounded-xl text-xs font-bold gap-1.5"
            >
              <Plus className="h-4 w-4" /> Add Next Block
            </Button>
          </div>
        </div>
      )}

      {/* ─── Mode 2: Live Split Preview ─── */}
      {editorMode === "SPLIT" && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Quick raw editor */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase text-muted-foreground">
              Markdown Source
            </span>
            <Textarea
              rows={24}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="font-mono text-xs bg-muted/20 rounded-2xl p-4 leading-relaxed"
            />
          </div>

          {/* Right: Live visual rendered preview */}
          <div className="space-y-4 rounded-2xl border border-border/80 bg-card p-6 shadow-soft overflow-y-auto max-h-[600px]">
            <span className="text-xs font-bold uppercase text-primary mb-2 block">
              Student Article Live Preview
            </span>
            {blocks.map((b) => (
              <div key={b.id}>
                {b.type === "heading2" && (
                  <h2 className="font-display text-xl font-bold text-foreground mt-4 mb-1">
                    {b.content}
                  </h2>
                )}
                {b.type === "heading3" && (
                  <h3 className="font-display text-base font-bold text-foreground mt-3 mb-1">
                    {b.content}
                  </h3>
                )}
                {b.type === "paragraph" && (
                  <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                    {b.content}
                  </p>
                )}
                {b.type === "callout" && (
                  <div className="my-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-foreground">
                    <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">
                      {b.calloutType === "exam_tip" ? "🔥 Exam Tip:" : "📌 Exam Note:"}
                    </span>
                    {b.content}
                  </div>
                )}
                {b.type === "code" && (
                  <div className="my-3 rounded-xl bg-muted/80 p-3 font-mono text-xs text-foreground overflow-x-auto">
                    <pre>{b.content}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Mode 3: Raw Markdown Source ─── */}
      {editorMode === "RAW" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>
              Direct Markdown Source (Great for pasting verified AI drafts or lecture notes)
            </span>
          </div>
          <Textarea
            rows={22}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="# Title&#10;&#10;## Section&#10;&#10;Content..."
            className="font-mono text-sm leading-relaxed bg-muted/20 rounded-2xl p-4"
          />
        </div>
      )}
    </div>
  );
}
