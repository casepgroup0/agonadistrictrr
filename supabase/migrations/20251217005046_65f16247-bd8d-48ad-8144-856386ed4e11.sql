-- Drop the existing overly permissive policy for outpost leaders
DROP POLICY IF EXISTS "Outpost leaders can view all profiles" ON public.profiles;

-- Create a new policy that restricts outpost leaders to only view profiles within their own outpost
CREATE POLICY "Outpost leaders can view own outpost profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'outpost_leader')
  AND outpost_name IS NOT NULL
  AND outpost_name = (
    SELECT outpost_name 
    FROM public.profiles 
    WHERE user_id = auth.uid()
  )
);