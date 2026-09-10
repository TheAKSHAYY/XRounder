-- ============ SYLLABUS TOPICS ============
CREATE TABLE public.syllabus_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES public.units(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  UNIQUE(unit_id, title)
);
CREATE INDEX idx_syllabus_topics_unit ON public.syllabus_topics(unit_id);
GRANT SELECT ON public.syllabus_topics TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.syllabus_topics TO authenticated;
GRANT ALL ON public.syllabus_topics TO service_role;
ALTER TABLE public.syllabus_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published syllabus topics" ON public.syllabus_topics
  FOR SELECT USING (status = 'published' OR public.is_admin(auth.uid()));

CREATE POLICY "Admins manage syllabus topics" ON public.syllabus_topics
  FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE TRIGGER trg_syllabus_topics_updated BEFORE UPDATE ON public.syllabus_topics
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ ADD topic_id to notes ============
ALTER TABLE public.notes ADD COLUMN topic_id UUID REFERENCES public.syllabus_topics(id) ON DELETE SET NULL;
CREATE INDEX idx_notes_topic_id ON public.notes(topic_id);

-- ============ ADD topic_id to content_items ============
ALTER TABLE public.content_items ADD COLUMN topic_id UUID REFERENCES public.syllabus_topics(id) ON DELETE SET NULL;
CREATE INDEX idx_content_items_topic_id ON public.content_items(topic_id);

-- ============ ADD topic_id to quizzes ============
ALTER TABLE public.quizzes ADD COLUMN topic_id UUID REFERENCES public.syllabus_topics(id) ON DELETE SET NULL;
CREATE INDEX idx_quizzes_topic_id ON public.quizzes(topic_id);

-- ============ ADD topic_id to progress_tracking ============
ALTER TABLE public.progress_tracking ADD COLUMN topic_id UUID REFERENCES public.syllabus_topics(id) ON DELETE SET NULL;
CREATE INDEX idx_progress_tracking_topic_id ON public.progress_tracking(topic_id);
