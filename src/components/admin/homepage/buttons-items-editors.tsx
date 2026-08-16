import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ButtonsEditor({
  idPrefix,
  buttons,
  onChange,
}: {
  idPrefix: string;
  buttons: Array<Record<string, string>>;
  onChange: (b: Array<Record<string, string>>) => void;
}) {
  const update = (i: number, key: string, value: string) => {
    const next = [...buttons];
    next[i] = { ...next[i], [key]: value };
    onChange(next);
  };
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Buttons</Label>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onChange([...buttons, { label: "", href: "", variant: "default" }])}
        >
          <Plus className="mr-1 h-3.5 w-3.5" />
          Add button
        </Button>
      </div>
      {buttons.map((b, i) => (
        <div key={i} className="grid gap-2 rounded-md border p-3 sm:grid-cols-[1fr_1fr_140px_40px]">
          <Input
            placeholder="Label"
            value={b.label ?? ""}
            onChange={(e) => update(i, "label", e.target.value)}
            aria-label={`${idPrefix}-btn-label-${i}`}
          />
          <Input
            placeholder="/path or https://…"
            value={b.href ?? ""}
            onChange={(e) => update(i, "href", e.target.value)}
            aria-label={`${idPrefix}-btn-href-${i}`}
          />
          <Select value={b.variant ?? "default"} onValueChange={(v) => update(i, "variant", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Primary</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
              <SelectItem value="ghost">Ghost</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onChange(buttons.filter((_, j) => j !== i))}
            aria-label="Remove"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

export function ItemsEditor({
  idPrefix,
  label,
  items,
  onChange,
  fields = [
    { key: "title", label: "Title" },
    { key: "description", label: "Description", textarea: true },
    { key: "icon", label: "Icon / image URL" },
  ],
}: {
  idPrefix: string;
  label: string;
  items: Array<Record<string, string>>;
  onChange: (i: Array<Record<string, string>>) => void;
  fields?: Array<{ key: string; label: string; placeholder?: string; textarea?: boolean }>;
}) {
  const update = (i: number, key: string, value: string) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: value };
    onChange(next);
  };
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
        <Button size="sm" variant="outline" onClick={() => onChange([...items, {}])}>
          <Plus className="mr-1 h-3.5 w-3.5" />
          Add item
        </Button>
      </div>
      {items.map((it, i) => (
        <div key={i} className="space-y-2 rounded-md border p-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Item {i + 1}</span>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              aria-label="Remove item"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="grid gap-2">
            {fields.map((f) =>
              f.textarea ? (
                <Textarea
                  key={f.key}
                  rows={2}
                  placeholder={f.placeholder ?? f.label}
                  value={it[f.key] ?? ""}
                  onChange={(e) => update(i, f.key, e.target.value)}
                  aria-label={`${idPrefix}-item-${i}-${f.key}`}
                />
              ) : (
                <Input
                  key={f.key}
                  placeholder={f.placeholder ?? f.label}
                  value={it[f.key] ?? ""}
                  onChange={(e) => update(i, f.key, e.target.value)}
                  aria-label={`${idPrefix}-item-${i}-${f.key}`}
                />
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
