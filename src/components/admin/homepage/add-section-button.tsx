import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KIND_META, KIND_ORDER, type SectionKind } from "./types";

export function AddSectionButton({ onAdd }: { onAdd: (k: SectionKind) => void }) {
  const [kind, setKind] = useState<SectionKind | "">("");
  return (
    <div className="flex items-center gap-2">
      <Select value={kind} onValueChange={(v) => setKind(v as SectionKind)}>
        <SelectTrigger className="w-[210px]">
          <SelectValue placeholder="Choose section type…" />
        </SelectTrigger>
        <SelectContent>
          {KIND_ORDER.map((k) => (
            <SelectItem key={k} value={k}>
              {KIND_META[k].label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        size="sm"
        disabled={!kind}
        onClick={() => {
          if (kind) onAdd(kind);
          setKind("");
        }}
      >
        <Plus className="mr-1.5 h-4 w-4" />
        Add section
      </Button>
    </div>
  );
}
