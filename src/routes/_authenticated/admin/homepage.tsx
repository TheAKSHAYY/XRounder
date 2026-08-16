import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { PageContainer } from "@/components/admin/ui/page-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AddSectionButton } from "@/components/admin/homepage/add-section-button";
import { SectionRow } from "@/components/admin/homepage/section-row";
import { KIND_META, type Section, type SectionKind } from "@/components/admin/homepage/types";

export const Route = createFileRoute("/_authenticated/admin/homepage")({
  component: HomepageBuilder,
});

function HomepageBuilder() {
  const qc = useQueryClient();

  const { data: sections = [], isLoading } = useQuery({
    queryKey: ["admin", "homepage_sections", "v2"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("homepage_sections")
        .select(
          "id,type,position,enabled,status,title,content,style,published_content,published_style",
        )
        .order("position", { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as Section[];
    },
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin", "homepage_sections", "v2"] });
    qc.invalidateQueries({ queryKey: ["homepage_sections", "public"] });
  };

  const update = useMutation({
    mutationFn: async (p: { id: string; updates: Partial<Section> }) => {
      const { error } = await supabase
        .from("homepage_sections")
        .update(p.updates as never)
        .eq("id", p.id);
      if (error) throw error;
    },
    onSuccess: () => invalidate(),
    onError: (e: Error) => toast.error(e.message),
  });

  const create = useMutation({
    mutationFn: async (kind: SectionKind) => {
      const nextPos = (sections.at(-1)?.position ?? 0) + 10;
      const { error } = await supabase.from("homepage_sections").insert({
        type: kind as never,
        position: nextPos,
        enabled: false,
        status: "draft",
        content: {},
        style: {},
        published_content: {},
        published_style: {},
        title: KIND_META[kind].label,
      } as never);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      toast.success("Section added (hidden)");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const duplicate = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.rpc("duplicate_homepage_section", { _id: id });
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      toast.success("Section duplicated");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("homepage_sections").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      toast.success("Section deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const swap = (a: Section, b: Section) => {
    update.mutate({ id: a.id, updates: { position: b.position } });
    update.mutate({ id: b.id, updates: { position: a.position } });
  };

  return (
    <PageContainer width="narrow" className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h1 className="font-display text-3xl font-semibold">Website Builder</h1>
          <p className="text-sm text-muted-foreground">
            WordPress-style page composer. Add, edit, reorder, hide, publish — no code.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/" target="_blank">
              <ExternalLink className="mr-1.5 h-4 w-4" />
              Preview site
            </Link>
          </Button>
          <AddSectionButton onAdd={(k) => create.mutate(k)} />
        </div>
      </header>

      {isLoading && <p className="text-sm text-muted-foreground">Loading sections…</p>}

      {!isLoading && sections.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            No sections yet. Add your first section to begin.
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {sections.map((s, i) => (
          <SectionRow
            key={s.id}
            section={s}
            canUp={i > 0}
            canDown={i < sections.length - 1}
            onUp={() => swap(s, sections[i - 1])}
            onDown={() => swap(s, sections[i + 1])}
            onToggle={() => update.mutate({ id: s.id, updates: { enabled: !s.enabled } })}
            onSaveDraft={(patch) => update.mutate({ id: s.id, updates: patch })}
            onPublish={(patch) =>
              update.mutate({
                id: s.id,
                updates: {
                  ...patch,
                  status: "published",
                  published_content: patch.content ?? s.content,
                  published_style: patch.style ?? s.style,
                },
              })
            }
            onDuplicate={() => duplicate.mutate(s.id)}
            onDelete={() => remove.mutate(s.id)}
          />
        ))}
      </div>
    </PageContainer>
  );
}
