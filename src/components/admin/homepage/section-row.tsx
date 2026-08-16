import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Copy, Eye, EyeOff, Save, Send, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { KindEditor, StyleEditor } from "./kind-editor";
import { KIND_META, type Section } from "./types";

type RowProps = {
  section: Section;
  canUp: boolean;
  canDown: boolean;
  onUp: () => void;
  onDown: () => void;
  onToggle: () => void;
  onSaveDraft: (patch: Partial<Section>) => void;
  onPublish: (patch: Partial<Section>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
};

export function SectionRow(p: RowProps) {
  const { section } = p;
  const meta = KIND_META[section.type] ?? {
    label: section.type,
    description: "",
  };

  const [title, setTitle] = useState(section.title ?? "");
  const [content, setContent] = useState<Record<string, unknown>>(section.content);
  const [style, setStyle] = useState<Record<string, unknown>>(section.style);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTitle(section.title ?? "");
    setContent(section.content ?? {});
    setStyle(section.style ?? {});
  }, [section.id, section.title, section.content, section.style]);

  const dirty = useMemo(() => {
    return (
      JSON.stringify(content) !== JSON.stringify(section.content) ||
      JSON.stringify(style) !== JSON.stringify(section.style) ||
      title !== (section.title ?? "")
    );
  }, [content, style, title, section]);

  const hasUnpublished = useMemo(
    () =>
      JSON.stringify(section.content) !== JSON.stringify(section.published_content) ||
      JSON.stringify(section.style) !== JSON.stringify(section.published_style),
    [section],
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Button
              size="icon"
              variant="ghost"
              disabled={!p.canUp}
              onClick={p.onUp}
              className="h-6 w-6"
              aria-label="Move up"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              disabled={!p.canDown}
              onClick={p.onDown}
              className="h-6 w-6"
              aria-label="Move down"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div>
            <CardTitle className="font-display text-base">{title || meta.label}</CardTitle>
            <p className="text-xs text-muted-foreground">
              {meta.label} · {meta.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={section.status === "published" ? "default" : "secondary"}>
            {section.status}
          </Badge>
          {hasUnpublished && (
            <Badge variant="outline" className="border-accent text-accent">
              unpublished changes
            </Badge>
          )}
          <div className="flex items-center gap-1.5 pl-1">
            <Switch checked={section.enabled} onCheckedChange={p.onToggle} aria-label="Visible" />
            {section.enabled ? (
              <Eye className="h-3.5 w-3.5 text-muted-foreground" />
            ) : (
              <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </div>
          <Button size="sm" variant="ghost" onClick={() => setOpen((o) => !o)}>
            {open ? "Close" : "Edit"}
          </Button>
        </div>
      </CardHeader>

      {open && (
        <CardContent className="space-y-5 border-t pt-5">
          <div className="grid gap-2 sm:grid-cols-[120px_1fr] sm:items-center">
            <Label htmlFor={`title-${section.id}`}>Internal title</Label>
            <Input
              id={`title-${section.id}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={meta.label}
            />
          </div>

          <KindEditor
            kind={section.type}
            content={content}
            onChange={setContent}
            idPrefix={section.id}
          />

          <StyleEditor style={style} onChange={setStyle} idPrefix={section.id} />

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => p.onDuplicate()}>
                <Copy className="mr-1.5 h-4 w-4" />
                Duplicate
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="mr-1.5 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this section?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This permanently removes the section from your homepage. This action cannot be
                      undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={p.onDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={!dirty}
                onClick={() => p.onSaveDraft({ title, content, style, status: "draft" })}
              >
                <Save className="mr-1.5 h-4 w-4" />
                Save draft
              </Button>
              <Button size="sm" onClick={() => p.onPublish({ title, content, style })}>
                <Send className="mr-1.5 h-4 w-4" />
                Publish
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
