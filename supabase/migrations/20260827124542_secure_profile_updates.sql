-- Minimal security migration to prevent non-admins from modifying moderation fields
-- This resolves the IDOR where a suspended user could un-suspend themselves via the Supabase API.

CREATE OR REPLACE FUNCTION public.secure_profile_updates()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_admin boolean;
BEGIN
  -- We only restrict changes if a user is authenticated (auth.uid() IS NOT NULL).
  -- The service_role key will bypass this check completely.
  IF auth.uid() IS NOT NULL THEN
    is_admin := coalesce(public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'), false);
    
    IF NOT is_admin THEN
      -- Silently revert administrative fields to their previous values for normal users.
      -- This allows them to update allowed fields (like bio, avatar) without erroring,
      -- while ignoring any attempts to manipulate suspension state.
      NEW.suspended := OLD.suspended;
      NEW.suspended_reason := OLD.suspended_reason;
      NEW.suspended_at := OLD.suspended_at;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Revoke execute from public to adhere to secure defaults
REVOKE ALL ON FUNCTION public.secure_profile_updates() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.secure_profile_updates() TO authenticated;

-- Attach the BEFORE UPDATE trigger to the profiles table
DROP TRIGGER IF EXISTS trg_secure_profile_updates ON public.profiles;
CREATE TRIGGER trg_secure_profile_updates
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.secure_profile_updates();
