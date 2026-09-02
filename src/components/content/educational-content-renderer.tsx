import React, { useState, useCallback, useMemo } from "react";
import {
  Check,
  Copy,
  Terminal,
  Layers,
  Target,
  Zap,
  AlertTriangle,
  Info,
  CheckCircle2,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { slugify } from "@/lib/slug";
import { parseMarkdownToBlocks, ContentBlockItem } from "@/components/admin/visual-article-editor";

/* ═══════════════════════════════════════════════════════════════════
   INLINE FORMATTING COMPONENT (Bold, Italic, Inline Code, Links)
   Safe, pure React AST rendering without dangerouslySetInnerHTML
   ═══════════════════════════════════════════════════════════════════ */

export function FormattedText({ text }: { text: string | null | undefined }) {
  if (!text) return null;

  // Tokenize text into inline elements:
  // 1. `code`
  // 2. **bold**
  // 3. *italic* or _italic_
  // 4. [label](url)
  // 5. Bare URLs (https?://...)
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s]+)/g;

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, idx) => {
        if (!part) return null;

        // Inline Code `...`
        if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
          const codeContent = part.slice(1, -1);
          return (
            <code
              key={idx}
              className="mx-0.5 inline-block rounded-md border border-border/60 bg-muted/80 px-1.5 py-0.5 font-mono text-[0.875em] font-semibold text-primary dark:text-primary-foreground/90 transition-colors"
            >
              {codeContent}
            </code>
          );
        }

        // Bold **...**
        if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
          const boldContent = part.slice(2, -2);
          return (
            <strong key={idx} className="font-bold text-foreground">
              {boldContent}
            </strong>
          );
        }

        // Italic *...* or _..._
        if (
          ((part.startsWith("*") && part.endsWith("*")) ||
            (part.startsWith("_") && part.endsWith("_"))) &&
          part.length >= 2 &&
          !part.startsWith("**")
        ) {
          const italicContent = part.slice(1, -1);
          return (
            <em key={idx} className="italic text-foreground/90">
              {italicContent}
            </em>
          );
        }

        // Markdown Link [label](url)
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const [, label, url] = linkMatch;
          const isExternal = /^https?:\/\//i.test(url);
          return (
            <a
              key={idx}
              href={url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            >
              <span>{label}</span>
              {isExternal && <ExternalLink className="h-3 w-3 inline-block shrink-0" />}
            </a>
          );
        }

        // Raw URL
        if (/^https?:\/\/[^\s]+$/i.test(part)) {
          return (
            <a
              key={idx}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4 hover:text-primary/80 break-all transition-colors"
            >
              <span>{part}</span>
              <ExternalLink className="h-3 w-3 inline-block shrink-0" />
            </a>
          );
        }

        // Normal plain text
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SYNTAX HIGHLIGHTER (Pure React Tokenizer for C, C++, Java, Python, JS/TS, SQL)
   ═══════════════════════════════════════════════════════════════════ */

export function HighlightedCode({ code, language = "text" }: { code: string; language?: string }) {
  const tokens = useMemo(() => {
    const lang = language.toLowerCase().trim();

    if (!code) return [];

    // Line-by-line tokenization preserving whitespace
    const lines = code.split("\n");
    return lines.map((line, lineIdx) => {
      // Token pattern for C, Java, C++, JS, Python, SQL
      const tokenRegex =
        /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\[\s\S]|[^`\\])*`|\b(?:int|char|float|double|void|long|short|unsigned|signed|bool|boolean|byte|String|Integer|Float|Double|Boolean|Array|List|Map|Set|size_t|uint8_t|uint16_t|uint32_t|int32_t|FILE)\b|\b(?:if|else|for|while|do|switch|case|default|break|continue|return|goto|sizeof|typedef|struct|union|enum|public|private|protected|static|final|class|interface|extends|implements|new|this|super|import|package|try|catch|throw|throws|finally|const|let|var|function|async|await|export|from|def|elif|lambda|pass|raise|with|yield|as|assert|SELECT|FROM|WHERE|INSERT|INTO|UPDATE|DELETE|CREATE|TABLE|DROP|ALTER|JOIN|INNER|LEFT|RIGHT|ON|GROUP|BY|ORDER|HAVING|LIMIT|NULL|TRUE|FALSE|null|true|false)\b|\b(?:printf|scanf|malloc|calloc|free|main|strlen|strcpy|strcmp|strcat|fopen|fclose|fprintf|fscanf|puts|gets|getchar|putchar|System\.out\.println|System\.out\.print|print|input|len|range|console\.log)\b|\b(?:0x[0-9a-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b|[+\-*/%=&|<>!^~?:;]+|[(){}\[\],.]|[^\s\w"'`(){}\[\],.+\-*/%=&|<>!^~?:;]+|\s+)/g;

      const lineTokens: React.ReactNode[] = [];
      let match: RegExpExecArray | null;
      let lastIndex = 0;

      while ((match = tokenRegex.exec(line)) !== null) {
        const text = match[0];
        const idx = match.index;

        if (idx > lastIndex) {
          lineTokens.push(line.slice(lastIndex, idx));
        }
        lastIndex = tokenRegex.lastIndex;

        // Determine token class
        if (
          text.startsWith("//") ||
          text.startsWith("/*") ||
          (lang === "python" && text.startsWith("#"))
        ) {
          lineTokens.push(
            <span key={`${lineIdx}-${idx}`} className="text-zinc-500 italic">
              {text}
            </span>,
          );
        } else if (text.startsWith("#") && (lang === "c" || lang === "cpp")) {
          // Preprocessor directive #include <stdio.h>
          lineTokens.push(
            <span key={`${lineIdx}-${idx}`} className="text-pink-400 font-semibold">
              {text}
            </span>,
          );
        } else if (
          (text.startsWith('"') && text.endsWith('"')) ||
          (text.startsWith("'") && text.endsWith("'")) ||
          (text.startsWith("`") && text.endsWith("`"))
        ) {
          lineTokens.push(
            <span key={`${lineIdx}-${idx}`} className="text-emerald-400 font-normal">
              {text}
            </span>,
          );
        } else if (
          /^\b(?:int|char|float|double|void|long|short|unsigned|signed|bool|boolean|byte|String|Integer|Float|Double|Boolean|Array|List|Map|Set|size_t|uint8_t|uint16_t|uint32_t|int32_t|FILE)\b$/.test(
            text,
          )
        ) {
          lineTokens.push(
            <span key={`${lineIdx}-${idx}`} className="text-cyan-300 font-medium">
              {text}
            </span>,
          );
        } else if (
          /^\b(?:if|else|for|while|do|switch|case|default|break|continue|return|goto|sizeof|typedef|struct|union|enum|public|private|protected|static|final|class|interface|extends|implements|new|this|super|import|package|try|catch|throw|throws|finally|const|let|var|function|async|await|export|from|def|elif|lambda|pass|raise|with|yield|as|assert|SELECT|FROM|WHERE|INSERT|INTO|UPDATE|DELETE|CREATE|TABLE|DROP|ALTER|JOIN|INNER|LEFT|RIGHT|ON|GROUP|BY|ORDER|HAVING|LIMIT|NULL|TRUE|FALSE|null|true|false)\b$/i.test(
            text,
          )
        ) {
          lineTokens.push(
            <span key={`${lineIdx}-${idx}`} className="text-purple-400 font-semibold">
              {text}
            </span>,
          );
        } else if (
          /^\b(?:printf|scanf|malloc|calloc|free|main|strlen|strcpy|strcmp|strcat|fopen|fclose|fprintf|fscanf|puts|gets|getchar|putchar|System\.out\.println|System\.out\.print|print|input|len|range|console\.log)\b$/.test(
            text,
          )
        ) {
          lineTokens.push(
            <span key={`${lineIdx}-${idx}`} className="text-sky-300 font-medium">
              {text}
            </span>,
          );
        } else if (/^\b(?:0x[0-9a-fA-F]+|\d+(?:\.\d+)?)\b$/.test(text)) {
          lineTokens.push(
            <span key={`${lineIdx}-${idx}`} className="text-amber-300">
              {text}
            </span>,
          );
        } else if (/^[+\-*/%=&|<>!^~?:;]+$/.test(text)) {
          lineTokens.push(
            <span key={`${lineIdx}-${idx}`} className="text-zinc-400 font-light">
              {text}
            </span>,
          );
        } else {
          lineTokens.push(text);
        }
      }

      if (lastIndex < line.length) {
        lineTokens.push(line.slice(lastIndex));
      }

      return (
        <div key={lineIdx} className="table-row">
          <span className="table-cell select-none pr-4 text-right font-mono text-xs text-zinc-600 opacity-60">
            {lineIdx + 1}
          </span>
          <span className="table-cell whitespace-pre">{lineTokens.length ? lineTokens : "\n"}</span>
        </div>
      );
    });
  }, [code, language]);

  return <div className="table w-full">{tokens}</div>;
}

/* ═══════════════════════════════════════════════════════════════════
   CODE BLOCK WITH HEADER & COPY BUTTON
   ═══════════════════════════════════════════════════════════════════ */

export function CodeBlock({
  code,
  language = "code",
  className,
}: {
  code: string;
  language?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [code]);

  const displayLang = useMemo(() => {
    const l = (language || "code").toLowerCase();
    if (l === "cpp" || l === "c++") return "C++";
    if (l === "c") return "C";
    if (l === "java") return "Java";
    if (l === "python" || l === "py") return "Python";
    if (l === "js" || l === "javascript") return "JavaScript";
    if (l === "ts" || l === "typescript") return "TypeScript";
    if (l === "sql") return "SQL";
    if (l === "html") return "HTML";
    if (l === "css") return "CSS";
    return l.toUpperCase();
  }, [language]);

  return (
    <div
      className={cn(
        "group relative my-6 max-w-full overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d1117] text-zinc-100 shadow-md transition-shadow",
        className,
      )}
    >
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-[#161b22] px-4 py-2.5 select-none">
        <div className="flex items-center gap-3">
          {/* Mac-style Window Controls */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
            {displayLang}
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onCopy}
          aria-label={copied ? "Code copied to clipboard" : "Copy code"}
          className="h-7 px-2.5 rounded-lg text-xs font-mono text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 mr-1 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 mr-1" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>

      {/* Code Container with horizontal scroll */}
      <div className="max-w-full overflow-x-auto p-4 sm:p-5 font-mono text-[13px] sm:text-[14px] leading-relaxed text-zinc-100">
        <pre className="m-0 font-mono">
          <code>
            <HighlightedCode code={code} language={language} />
          </code>
        </pre>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   OUTPUT BLOCK (Terminal / Console Result)
   ═══════════════════════════════════════════════════════════════════ */

export function OutputBlock({
  output,
  label = "Output",
  className,
}: {
  output: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "my-6 max-w-full overflow-hidden rounded-2xl border border-zinc-700/70 bg-zinc-950 text-zinc-100 shadow-sm",
        className,
      )}
    >
      {/* Output Header */}
      <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-900/90 px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 select-none">
        <Terminal className="h-3.5 w-3.5 text-emerald-400" />
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-zinc-300">{label}</span>
      </div>

      {/* Terminal Output */}
      <div className="max-w-full overflow-x-auto p-4 sm:p-4.5 font-mono text-[13px] sm:text-[14px] leading-relaxed text-emerald-400 dark:text-emerald-300 bg-zinc-950">
        <pre className="m-0 font-mono whitespace-pre">
          <code>{output}</code>
        </pre>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DIAGRAM / ARCHITECTURE CANVAS
   ═══════════════════════════════════════════════════════════════════ */

export function DiagramBlock({
  content,
  title = "System Architecture / Concept Diagram",
  className,
}: {
  content: string;
  title?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "my-7 max-w-full overflow-hidden rounded-2xl border border-primary/25 bg-linear-to-br from-primary/5 via-card to-card p-4 sm:p-5 shadow-sm transition-all",
        className,
      )}
    >
      <div className="flex items-center justify-between font-mono text-[11px] text-primary mb-3 pb-2.5 border-b border-primary/15 select-none">
        <span className="flex items-center gap-2 font-bold uppercase tracking-wider">
          <Layers className="h-3.5 w-3.5" /> {title}
        </span>
        <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider">
          Horizontal Scroll Enabled
        </span>
      </div>
      <div className="max-w-full overflow-x-auto rounded-xl bg-surface/90 border border-border/60 p-3 sm:p-4">
        <pre className="m-0 font-mono text-xs sm:text-[13.5px] text-foreground leading-relaxed whitespace-pre min-w-max">
          <code>{content}</code>
        </pre>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CALLOUT / NOTE / EXAM TIP CARD
   ═══════════════════════════════════════════════════════════════════ */

export function CalloutCard({
  type = "important",
  content,
  className,
}: {
  type?: "exam_tip" | "important" | "formula" | "warning";
  content: string;
  className?: string;
}) {
  // Clean duplicated prefixes like "Exam Tip: " or "[!TIP]"
  const cleanContent = useMemo(() => {
    return content
      .replace(/^\[!(TIP|NOTE|IMPORTANT|WARNING|FORMULA)\]\s*/i, "")
      .replace(/^(Exam Tip|Important|Warning|Formula|Key Concept):\s*/i, "")
      .trim();
  }, [content]);

  const config = useMemo(() => {
    switch (type) {
      case "exam_tip":
        return {
          icon: <Target className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />,
          title: "🎯 Exam Tip / High Weightage",
          border: "border-amber-500",
          bg: "bg-amber-500/10 dark:bg-amber-500/15",
          titleColor: "text-amber-800 dark:text-amber-300",
        };
      case "formula":
        return {
          icon: <Zap className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />,
          title: "⚡ Key Formula / Rule",
          border: "border-blue-500",
          bg: "bg-blue-500/10 dark:bg-blue-500/15",
          titleColor: "text-blue-800 dark:text-blue-300",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />,
          title: "⚠️ Common Mistake / Watch Out",
          border: "border-rose-500",
          bg: "bg-rose-500/10 dark:bg-rose-500/15",
          titleColor: "text-rose-800 dark:text-rose-300",
        };
      case "important":
      default:
        return {
          icon: (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          ),
          title: "📌 Important Concept",
          border: "border-emerald-500",
          bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
          titleColor: "text-emerald-800 dark:text-emerald-300",
        };
    }
  }, [type]);

  return (
    <div
      className={cn(
        "my-6 rounded-2xl border-l-4 p-4 sm:p-5 text-[15px] sm:text-base leading-[1.7] shadow-xs transition-all",
        config.border,
        config.bg,
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 font-bold mb-2 text-xs sm:text-sm",
          config.titleColor,
        )}
      >
        {config.icon}
        <span>{config.title}</span>
      </div>
      <div className="leading-relaxed whitespace-pre-wrap text-foreground/90 font-normal">
        <FormattedText text={cleanContent} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FORMATTED TABLE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export function FormattedTable({
  headers,
  rows,
  className,
}: {
  headers: string[];
  rows: string[][];
  className?: string;
}) {
  if (!headers || !headers.length) return null;

  return (
    <div
      className={cn(
        "my-7 max-w-full overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs",
        className,
      )}
    >
      <div className="max-w-full overflow-x-auto">
        <table className="min-w-[540px] w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border/80 bg-muted/60">
              {headers.map((h, hIdx) => (
                <th
                  key={hIdx}
                  className="p-3.5 font-bold font-display text-foreground tracking-tight select-none"
                >
                  <FormattedText text={h} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-muted/25 transition-colors even:bg-muted/10">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="p-3.5 text-foreground/85 leading-relaxed align-top">
                    <FormattedText text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN EDUCATIONAL CONTENT RENDERER COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export interface EducationalContentRendererProps {
  content: string;
  anchorId?: string;
  title?: string;
  className?: string;
  onCopyAll?: () => void;
}

export function EducationalContentRenderer({
  content,
  anchorId,
  title,
  className,
  onCopyAll,
}: EducationalContentRendererProps) {
  const [copied, setCopied] = useState(false);

  const blocks = useMemo(() => parseMarkdownToBlocks(content || ""), [content]);

  const handleCopy = useCallback(async () => {
    if (onCopyAll) {
      onCopyAll();
      return;
    }
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }, [content, onCopyAll]);

  return (
    <section id={anchorId} className={cn("scroll-mt-28 min-w-0 max-w-full", className)}>
      {/* Top Header Card if title provided */}
      {title && (
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-2.5 rounded-xl text-xs text-muted-foreground hover:text-foreground shrink-0 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </>
            )}
          </Button>
        </div>
      )}

      {/* Main Educational Article Body Card */}
      <div className="rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-4 sm:p-9 shadow-soft text-foreground space-y-6 min-w-0 max-w-full overflow-hidden">
        {(() => {
          let h2Count = 0;
          return blocks.map((b) => {
            const headingId = `heading-${slugify(b.content)}-${b.id}`;

            // Diagram detection
            const isDiagram =
              b.type === "code" &&
              (b.language === "diagram" ||
                b.language === "ascii" ||
                /┌|└|│|─|\+---|\||->|INPUT|OUTPUT|CPU|MEMORY|ALU|CU/.test(b.content));

            // Output block detection
            const isOutput =
              b.type === "code" &&
              (b.language === "output" ||
                b.language === "terminal" ||
                b.language === "console" ||
                /^output\b/i.test(b.language || ""));

            const isQuickRevision =
              (b.type === "heading2" || b.type === "heading3") &&
              /revision|summary|takeaways|key points/i.test(b.content);

            if (b.type === "heading2") {
              h2Count++;
            }

            return (
              <div key={b.id} className="min-w-0">
                {/* Major Section Heading (H2) */}
                {b.type === "heading2" && (
                  <div
                    id={headingId}
                    className="scroll-mt-28 mt-10 mb-4 border-t border-border/60 pt-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs font-extrabold text-primary shrink-0">
                        {String(h2Count).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                        <FormattedText text={b.content} />
                      </h3>
                    </div>
                  </div>
                )}

                {/* Subsection Heading (H3) */}
                {b.type === "heading3" && (
                  <h4
                    id={headingId}
                    className={cn(
                      "font-display text-[17px] sm:text-lg font-bold mt-7 mb-3 tracking-tight scroll-mt-28 flex items-center gap-2",
                      isQuickRevision ? "text-amber-500 font-extrabold uppercase" : "text-primary",
                    )}
                  >
                    {isQuickRevision && <Zap className="h-4 w-4 shrink-0" />}
                    <FormattedText text={b.content} />
                  </h4>
                )}

                {/* Sub-subsection Heading (H4) */}
                {b.type === "heading4" && (
                  <h5
                    id={headingId}
                    className="font-display text-base font-bold text-foreground/90 mt-5 mb-2 tracking-tight scroll-mt-28"
                  >
                    <FormattedText text={b.content} />
                  </h5>
                )}

                {/* Paragraph */}
                {b.type === "paragraph" && (
                  <p className="text-[16px] sm:text-[17px] text-foreground/90 leading-[1.8] mb-5 font-normal">
                    <FormattedText text={b.content} />
                  </p>
                )}

                {/* Callout */}
                {b.type === "callout" && <CalloutCard type={b.calloutType} content={b.content} />}

                {/* Diagram */}
                {isDiagram ? (
                  <DiagramBlock content={b.content} />
                ) : isOutput ? (
                  /* Output / Terminal Block */
                  <OutputBlock output={b.content} />
                ) : b.type === "code" ? (
                  /* Standard Programming Code Block */
                  <CodeBlock code={b.content} language={b.language} />
                ) : null}

                {/* Table */}
                {b.type === "table" && b.tableHeaders && (
                  <FormattedTable headers={b.tableHeaders} rows={b.tableRows || []} />
                )}

                {/* Bullet List */}
                {b.type === "bullet_list" && (
                  <ul className="my-5 space-y-2.5 text-[16px] sm:text-[17px] text-foreground/90 pl-6 list-disc marker:text-primary leading-[1.75]">
                    {(b.listItems && b.listItems.length ? b.listItems : b.content.split("\n"))
                      .filter((item) => item.trim())
                      .map((item, itemIdx) => (
                        <li key={itemIdx} className="leading-relaxed">
                          <FormattedText text={item} />
                        </li>
                      ))}
                  </ul>
                )}

                {/* Numbered List */}
                {b.type === "numbered_list" && (
                  <ol className="my-5 space-y-2.5 text-[16px] sm:text-[17px] text-foreground/90 pl-6 list-decimal marker:font-mono marker:font-bold marker:text-primary leading-[1.75]">
                    {(b.listItems && b.listItems.length ? b.listItems : b.content.split("\n"))
                      .filter((item) => item.trim())
                      .map((item, itemIdx) => (
                        <li key={itemIdx} className="leading-relaxed">
                          <FormattedText text={item} />
                        </li>
                      ))}
                  </ol>
                )}
              </div>
            );
          });
        })()}
      </div>
    </section>
  );
}
