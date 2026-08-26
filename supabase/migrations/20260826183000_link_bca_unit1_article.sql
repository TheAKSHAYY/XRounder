-- Fix unlinked content_items for BCA-101N Unit 1 and update public RLS policy for students

-- 1. Link orphan content item to Unit 1 of Computer Fundamentals and PC Software (BCA-101N)
UPDATE public.content_items
SET unit_id = '0985c212-df92-48df-8412-93e7de4c34c8'
WHERE id = 'bdaec04b-65ef-44fd-bcbc-854bf52ee75f'
  AND unit_id IS NULL;

-- 2. Link any note items for BCA-101N subject where unit_id is null to Unit 1
UPDATE public.content_items
SET unit_id = '0985c212-df92-48df-8412-93e7de4c34c8'
WHERE subject_id = '05968c8c-2a26-4933-a021-e457681771fc'
  AND unit_id IS NULL;

-- 3. Ensure RLS allows public/anon access to published content_items with visibility in ('public', 'students')
DROP POLICY IF EXISTS "Public can read published public content" ON public.content_items;
CREATE POLICY "Public can read published public content" ON public.content_items
  FOR SELECT TO anon
  USING (status = 'published' AND visibility IN ('public', 'students') AND deleted_at IS NULL);
