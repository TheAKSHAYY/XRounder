-- Update storage policies to allow anonymous and authenticated read access
-- to published public content items, notes, and past papers.

DROP POLICY IF EXISTS "notes_read_gated" ON storage.objects;
CREATE POLICY "notes_read_gated"
ON storage.objects FOR SELECT TO anon, authenticated
USING (
  bucket_id = 'notes' AND (
    public.is_admin(auth.uid())
    OR EXISTS (
      SELECT 1 FROM public.content_items c
      WHERE c.file_bucket = 'notes'
        AND c.file_path = storage.objects.name
        AND c.deleted_at IS NULL
        AND c.status = 'published'
        AND (c.visibility = 'public' OR (auth.uid() IS NOT NULL AND c.visibility = 'students'))
    )
    OR EXISTS (
      SELECT 1 FROM public.notes n
      WHERE n.file_bucket = 'notes'
        AND n.file_path = storage.objects.name
        AND n.deleted_at IS NULL
        AND n.status = 'published'
        AND (n.visibility = 'public' OR (auth.uid() IS NOT NULL AND n.visibility IN ('public', 'authenticated')))
    )
  )
);

DROP POLICY IF EXISTS "papers_read_gated" ON storage.objects;
CREATE POLICY "papers_read_gated"
ON storage.objects FOR SELECT TO anon, authenticated
USING (
  bucket_id = 'papers' AND (
    public.is_admin(auth.uid())
    OR EXISTS (
      SELECT 1 FROM public.papers p
      WHERE p.file_bucket = 'papers'
        AND p.file_path = storage.objects.name
        AND p.deleted_at IS NULL
        AND p.status = 'published'
    )
    OR EXISTS (
      SELECT 1 FROM public.content_items c
      WHERE c.file_bucket = 'papers'
        AND c.file_path = storage.objects.name
        AND c.deleted_at IS NULL
        AND c.status = 'published'
        AND (c.visibility = 'public' OR (auth.uid() IS NOT NULL AND c.visibility = 'students'))
    )
  )
);
