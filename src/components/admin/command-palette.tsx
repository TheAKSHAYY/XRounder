import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  FileText,
  FileStack,
  FlaskConical,
  ImageIcon,
  LayoutDashboard,
  Library,
  Plus,
  Settings,
  Shield,
  ShieldCheck,
  Layout,
  Tag as TagIcon,
  Inbox,
  UserCircle2,
  FolderTree,
  Users,
  Megaphone,
  SlidersHorizontal,
  LayoutTemplate,
  Globe,
  Activity,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

type Action = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  group: "Jump to" | "Create" | "Settings" | "Platform";
  to: string;
  keywords?: string;
};

const ACTIONS: Action[] = [
  {
    id: "nav-dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    group: "Jump to",
    to: "/admin",
  },
  { id: "nav-courses", label: "Courses & Semesters", icon: BookOpen, group: "Jump to", to: "/admin/courses" },
  { id: "nav-subjects", label: "Subjects & Units", icon: Library, group: "Jump to", to: "/admin/subjects" },
  { id: "nav-content", label: "Notes & Materials", icon: FileText, group: "Jump to", to: "/admin/content" },
  {
    id: "nav-papers",
    label: "Previous Papers",
    icon: FileStack,
    group: "Jump to",
    to: "/admin/papers",
  },
  {
    id: "nav-quizzes",
    label: "Question Bank & Quizzes",
    icon: FlaskConical,
    group: "Jump to",
    to: "/admin/quizzes",
  },
  {
    id: "nav-explorer",
    label: "Curriculum Tree",
    icon: FolderTree,
    group: "Jump to",
    to: "/admin/explorer",
  },
  { id: "nav-users", label: "Student Directory", icon: Users, group: "Jump to", to: "/admin/users" },
  { id: "nav-announcements", label: "Announcements", icon: Megaphone, group: "Jump to", to: "/admin/announcements" },
  { id: "nav-inbox", label: "Inbox Messages", icon: Inbox, group: "Jump to", to: "/admin/inbox" },
  {
    id: "nav-media",
    label: "Media library",
    icon: ImageIcon,
    group: "Jump to",
    to: "/admin/media",
  },
  { id: "nav-tags", label: "Tags Taxonomy", icon: TagIcon, group: "Jump to", to: "/admin/tags" },
  {
    id: "nav-homepage",
    label: "Homepage sections",
    icon: Layout,
    group: "Settings",
    to: "/admin/homepage",
  },
  {
    id: "nav-developer",
    label: "Developer profile",
    icon: UserCircle2,
    group: "Settings",
    to: "/admin/developer",
  },
  {
    id: "nav-settings",
    label: "Admin Settings",
    icon: Settings,
    group: "Settings",
    to: "/admin/settings",
  },
  {
    id: "nav-super",
    label: "Platform Governance",
    icon: Shield,
    group: "Platform",
    to: "/admin/superadmin",
  },
  {
    id: "nav-super-users",
    label: "Staff & Role Access",
    icon: ShieldCheck,
    group: "Platform",
    to: "/admin/superadmin/users",
  },
  {
    id: "nav-super-audit",
    label: "Audit Logs",
    icon: Activity,
    group: "Platform",
    to: "/admin/superadmin/audit",
  },
  {
    id: "nav-super-flags",
    label: "Feature Flags",
    icon: SlidersHorizontal,
    group: "Platform",
    to: "/admin/superadmin/flags",
  },
  {
    id: "nav-super-branding",
    label: "Platform Branding",
    icon: LayoutTemplate,
    group: "Platform",
    to: "/admin/superadmin/branding",
  },
  {
    id: "nav-super-seo",
    label: "SEO Manager",
    icon: Globe,
    group: "Platform",
    to: "/admin/superadmin/seo",
  },
  {
    id: "new-content",
    label: "New content item",
    icon: Plus,
    group: "Create",
    to: "/admin/content/new",
    keywords: "note pdf ppt video link assignment",
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const groups = ["Jump to", "Create", "Settings", "Platform"] as const;

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search admin — pages, actions, quick create…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        {groups.map((g, i) => {
          const items = ACTIONS.filter((a) => a.group === g);
          if (!items.length) return null;
          return (
            <div key={g}>
              {i > 0 && <CommandSeparator />}
              <CommandGroup heading={g}>
                {items.map((a) => (
                  <CommandItem
                    key={a.id}
                    value={`${a.label} ${a.keywords ?? ""}`}
                    onSelect={() => {
                      setOpen(false);
                      navigate({ to: a.to });
                    }}
                  >
                    <a.icon className="mr-2 h-4 w-4" />
                    {a.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          );
        })}
      </CommandList>
    </CommandDialog>
  );
}
