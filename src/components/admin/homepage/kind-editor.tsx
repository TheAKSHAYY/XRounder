import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field } from "./field";
import { ButtonsEditor, ItemsEditor } from "./buttons-items-editors";
import type { SectionKind } from "./types";

export function KindEditor({
  kind,
  content,
  onChange,
  idPrefix,
}: {
  kind: SectionKind;
  content: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
  idPrefix: string;
}) {
  const set = (key: string, value: unknown) => onChange({ ...content, [key]: value });

  // common fields used by most kinds
  const commonText = (
    <>
      <Field id={`${idPrefix}-eyebrow`} label="Eyebrow">
        <Input
          id={`${idPrefix}-eyebrow`}
          value={(content.eyebrow as string) ?? ""}
          onChange={(e) => set("eyebrow", e.target.value)}
          placeholder="Small label above the title"
        />
      </Field>
      <Field id={`${idPrefix}-headline`} label="Headline">
        <Input
          id={`${idPrefix}-headline`}
          value={(content.headline as string) ?? ""}
          onChange={(e) => set("headline", e.target.value)}
          placeholder="Main title"
        />
      </Field>
      <Field id={`${idPrefix}-subheadline`} label="Subheadline">
        <Textarea
          id={`${idPrefix}-subheadline`}
          rows={2}
          value={(content.subheadline as string) ?? ""}
          onChange={(e) => set("subheadline", e.target.value)}
          placeholder="One-sentence summary"
        />
      </Field>
      <Field id={`${idPrefix}-description`} label="Description">
        <Textarea
          id={`${idPrefix}-description`}
          rows={4}
          value={(content.description as string) ?? ""}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Longer body copy"
        />
      </Field>
    </>
  );

  const buttons = (
    <ButtonsEditor
      idPrefix={idPrefix}
      buttons={(content.buttons as Array<Record<string, string>>) ?? []}
      onChange={(b) => set("buttons", b)}
    />
  );

  const image = (
    <Field id={`${idPrefix}-image`} label="Image URL">
      <Input
        id={`${idPrefix}-image`}
        value={(content.image as string) ?? ""}
        onChange={(e) => set("image", e.target.value)}
        placeholder="https://… or /path"
      />
    </Field>
  );

  const items = (
    <ItemsEditor
      idPrefix={idPrefix}
      label="Items"
      items={(content.items as Array<Record<string, string>>) ?? []}
      onChange={(it) => set("items", it)}
    />
  );

  switch (kind) {
    case "hero":
      return (
        <div className="space-y-4">
          {commonText}
          {image}
          {buttons}
        </div>
      );
    case "about":
    case "cta":
    case "newsletter":
    case "custom_richtext":
      return (
        <div className="space-y-4">
          {commonText}
          {buttons}
        </div>
      );
    case "features":
    case "why_us":
    case "benefits":
    case "popular_courses":
    case "categories":
    case "universities":
    case "faculty":
    case "learning_process":
    case "journey":
    case "blog":
    case "semester_overview":
      return (
        <div className="space-y-4">
          {commonText}
          {items}
        </div>
      );
    case "statistics":
    case "stats":
    case "trust_bar":
      return (
        <div className="space-y-4">
          {commonText}
          <ItemsEditor
            idPrefix={idPrefix}
            label="Stats"
            items={(content.items as Array<Record<string, string>>) ?? []}
            onChange={(it) => set("items", it)}
            fields={[
              { key: "value", label: "Value", placeholder: "1,200+" },
              { key: "label", label: "Label", placeholder: "Active students" },
            ]}
          />
        </div>
      );
    case "testimonials":
      return (
        <div className="space-y-4">
          {commonText}
          <ItemsEditor
            idPrefix={idPrefix}
            label="Testimonials"
            items={(content.items as Array<Record<string, string>>) ?? []}
            onChange={(it) => set("items", it)}
            fields={[
              { key: "name", label: "Name" },
              { key: "role", label: "Role" },
              { key: "quote", label: "Quote", textarea: true },
              { key: "avatar", label: "Avatar URL" },
            ]}
          />
        </div>
      );
    case "faq":
      return (
        <div className="space-y-4">
          {commonText}
          <ItemsEditor
            idPrefix={idPrefix}
            label="Questions"
            items={(content.items as Array<Record<string, string>>) ?? []}
            onChange={(it) => set("items", it)}
            fields={[
              { key: "question", label: "Question" },
              { key: "answer", label: "Answer", textarea: true },
            ]}
          />
        </div>
      );
    case "contact":
      return (
        <div className="space-y-4">
          {commonText}
          <Field id={`${idPrefix}-email`} label="Email">
            <Input
              id={`${idPrefix}-email`}
              value={(content.email as string) ?? ""}
              onChange={(e) => set("email", e.target.value)}
            />
          </Field>
          <Field id={`${idPrefix}-phone`} label="Phone">
            <Input
              id={`${idPrefix}-phone`}
              value={(content.phone as string) ?? ""}
              onChange={(e) => set("phone", e.target.value)}
            />
          </Field>
          <Field id={`${idPrefix}-address`} label="Address">
            <Textarea
              id={`${idPrefix}-address`}
              rows={2}
              value={(content.address as string) ?? ""}
              onChange={(e) => set("address", e.target.value)}
            />
          </Field>
        </div>
      );
    case "footer":
      return (
        <div className="space-y-4">
          {commonText}
          <ItemsEditor
            idPrefix={idPrefix}
            label="Footer columns"
            items={(content.columns as Array<Record<string, string>>) ?? []}
            onChange={(it) => set("columns", it)}
            fields={[
              { key: "title", label: "Column title" },
              { key: "links", label: "Links (one per line: Label|/path)", textarea: true },
            ]}
          />
          <Field id={`${idPrefix}-copyright`} label="Copyright">
            <Input
              id={`${idPrefix}-copyright`}
              value={(content.copyright as string) ?? ""}
              onChange={(e) => set("copyright", e.target.value)}
              placeholder="© 2026 BCA Gurukul"
            />
          </Field>
        </div>
      );
    default:
      return <div className="space-y-4">{commonText}</div>;
  }
}

export function StyleEditor({
  style,
  onChange,
  idPrefix,
}: {
  style: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
  idPrefix: string;
}) {
  const set = (key: string, value: unknown) => onChange({ ...style, [key]: value });
  return (
    <details className="rounded-md border bg-muted/30 p-3">
      <summary className="cursor-pointer text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Appearance
      </summary>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Field id={`${idPrefix}-bg`} label="Background color">
          <Input
            id={`${idPrefix}-bg`}
            value={(style.background as string) ?? ""}
            onChange={(e) => set("background", e.target.value)}
            placeholder="e.g. #0b1020 or hsl(var(--background))"
          />
        </Field>
        <Field id={`${idPrefix}-fg`} label="Text color">
          <Input
            id={`${idPrefix}-fg`}
            value={(style.foreground as string) ?? ""}
            onChange={(e) => set("foreground", e.target.value)}
            placeholder="e.g. #ffffff"
          />
        </Field>
        <Field id={`${idPrefix}-gradient`} label="Gradient (CSS)">
          <Input
            id={`${idPrefix}-gradient`}
            value={(style.gradient as string) ?? ""}
            onChange={(e) => set("gradient", e.target.value)}
            placeholder="linear-gradient(135deg,#…,#…)"
          />
        </Field>
        <Field id={`${idPrefix}-padding`} label="Vertical padding">
          <Select
            value={(style.padding as string) ?? "lg"}
            onValueChange={(v) => set("padding", v)}
          >
            <SelectTrigger id={`${idPrefix}-padding`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
              <SelectItem value="xl">Extra large</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
    </details>
  );
}
