-- Clean legacy suffixed subject slugs and trim leading/trailing whitespace in Sem 1 subject titles.

UPDATE public.subjects
SET
  slug = 'bca-109n-principle-of-management',
  updated_at = now()
WHERE slug = 'principle-of-management-wc5k'
  AND deleted_at IS NULL
  AND NOT EXISTS (
    SELECT 1
    FROM public.subjects AS conflict
    WHERE conflict.semester_id = public.subjects.semester_id
      AND conflict.slug = 'bca-109n-principle-of-management'
  );

UPDATE public.subjects
SET
  slug = 'bca-102n-data-structures-using-c',
  updated_at = now()
WHERE slug = 'data-structures-using-c-9mnb'
  AND deleted_at IS NULL
  AND NOT EXISTS (
    SELECT 1
    FROM public.subjects AS conflict
    WHERE conflict.semester_id = public.subjects.semester_id
      AND conflict.slug = 'bca-102n-data-structures-using-c'
  );

UPDATE public.subjects
SET
  title = btrim(title),
  updated_at = now()
WHERE code IN ('BCA-101N', 'BCA-103N', 'BCA-105N')
  AND deleted_at IS NULL
  AND title IS DISTINCT FROM btrim(title);
