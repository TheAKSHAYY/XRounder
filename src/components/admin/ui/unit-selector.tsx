import { useState, useMemo } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UnitLite = {
  id: string;
  number: number;
  title: string;
  subject_id: string;
  subject?: {
    id: string;
    code: string;
    title: string;
    semester?: { id: string; number: number; title: string } | null;
  } | null;
};

interface UnitSelectorProps {
  units: UnitLite[];
  value: string;
  onChange: (value: string) => void;
}

export function UnitSelector({ units, value, onChange }: UnitSelectorProps) {
  const [open, setOpen] = useState(false);
  const [semesterFilter, setSemesterFilter] = useState<string>("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");

  const semesters = useMemo(() => {
    const map = new Map<string, { id: string; number: number; title: string }>();
    units.forEach((u) => {
      const s = u.subject?.semester;
      if (s && !map.has(s.id)) {
        map.set(s.id, s);
      }
    });
    return Array.from(map.values()).sort((a, b) => a.number - b.number);
  }, [units]);

  const subjects = useMemo(() => {
    const map = new Map<
      string,
      { id: string; code: string; title: string; semesterId?: string }
    >();
    units.forEach((u) => {
      if (u.subject && !map.has(u.subject.id)) {
        map.set(u.subject.id, {
          ...u.subject,
          semesterId: u.subject.semester?.id,
        });
      }
    });
    return Array.from(map.values()).sort((a, b) => a.code.localeCompare(b.code));
  }, [units]);

  const filteredSubjects = useMemo(() => {
    if (semesterFilter === "all") return subjects;
    return subjects.filter((s) => s.semesterId === semesterFilter);
  }, [subjects, semesterFilter]);

  const filteredUnitsBySubject = useMemo(() => {
    const groups = new Map<string, UnitLite[]>();
    units.forEach((u) => {
      // Apply filters
      if (
        semesterFilter !== "all" &&
        u.subject?.semester?.id !== semesterFilter
      )
        return;
      if (subjectFilter !== "all" && u.subject_id !== subjectFilter) return;

      const subId = u.subject_id || "unknown";
      if (!groups.has(subId)) groups.set(subId, []);
      groups.get(subId)!.push(u);
    });
    return groups;
  }, [units, semesterFilter, subjectFilter]);

  const selectedUnit = useMemo(() => {
    return units.find((u) => u.id === value);
  }, [units, value]);

  const handleSelect = (unitId: string) => {
    onChange(unitId);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between mt-1 font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {selectedUnit ? (
            <span className="truncate">
              {selectedUnit.subject
                ? `${selectedUnit.subject.code} · `
                : ""}
              U{selectedUnit.number} · {selectedUnit.title}
            </span>
          ) : (
            "Select unit"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[450px] p-0" align="start">
        <Command
          filter={(value, search) => {
            if (!search) return 1;
            const term = search.toLowerCase();
            // In shadcn Command component, 'value' is actually the textContent or stringified value of the item.
            // We'll rely on the command item's keywords or string values to match.
            // A more robust filter if we want: return value.includes(term) ? 1 : 0
            if (value.toLowerCase().includes(term)) return 1;
            return 0;
          }}
        >
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput 
              placeholder="Search unit, subject or code..." 
              className="border-none focus:ring-0 shadow-none h-11"
            />
          </div>
          
          <div className="flex gap-2 p-2 border-b bg-muted/20">
            <Select
              value={semesterFilter}
              onValueChange={(val) => {
                setSemesterFilter(val);
                setSubjectFilter("all"); // Reset subject when semester changes
              }}
            >
              <SelectTrigger className="h-8 text-xs flex-1">
                <SelectValue placeholder="All Semesters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                {semesters.map((sem) => (
                  <SelectItem key={sem.id} value={sem.id}>
                    Semester {sem.number} {sem.title ? `(${sem.title})` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={subjectFilter}
              onValueChange={setSubjectFilter}
            >
              <SelectTrigger className="h-8 text-xs flex-1">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {filteredSubjects.map((sub) => (
                  <SelectItem key={sub.id} value={sub.id}>
                    {sub.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <CommandList className="max-h-[300px]">
            <CommandEmpty>No units found.</CommandEmpty>
            {Array.from(filteredUnitsBySubject.entries()).map(([subId, subUnits]) => {
              if (subUnits.length === 0) return null;
              const subject = subUnits[0].subject;
              const heading = subject
                ? `${subject.code} — ${subject.title}`
                : "Other Units";

              return (
                <CommandGroup key={subId} heading={heading}>
                  {subUnits.map((u) => {
                    const searchString = `${u.subject?.code || ""} ${u.subject?.title || ""} U${u.number} ${u.title} Semester ${u.subject?.semester?.number || ""}`.toLowerCase();
                    return (
                      <CommandItem
                        key={u.id}
                        value={searchString} // Command item matches against this value
                        onSelect={() => handleSelect(u.id)}
                        className="pl-6 relative"
                      >
                        <Check
                          className={cn(
                            "absolute left-2 h-3.5 w-3.5",
                            value === u.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span className="truncate">
                          U{u.number} · {u.title}
                        </span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
