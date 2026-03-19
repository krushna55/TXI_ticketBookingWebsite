create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profile (
    user_id,
    email,
    role,
    created_at
  )
  values (
    new.id,
    new.email,
    'user',
    now()
  );

  return new;
end;
$$;