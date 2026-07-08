-- Recomputech Supabase setup for the `users` profile table
-- Run this in Supabase Dashboard → SQL Editor

-- Optional: create the table if it does not exist yet
create table if not exists public.users (
    id bigint generated always as identity primary key,
    created_at timestamptz not null default now(),
    account_type text not null,
    first_name text not null,
    last_name text not null,
    email text not null unique,
    terms_accepted boolean not null default false
);

alter table public.users enable row level security;

-- Allow anyone to create a profile row during sign-up
create policy "Allow public sign-up insert"
on public.users
for insert
to anon, authenticated
with check (true);

-- Allow authenticated users to read their own profile
create policy "Users can read own profile"
on public.users
for select
to authenticated
using (auth.jwt() ->> 'email' = email);

-- Allow authenticated users to update their own profile
create policy "Users can update own profile"
on public.users
for update
to authenticated
using (auth.jwt() ->> 'email' = email)
with check (auth.jwt() ->> 'email' = email);

-- Optional trigger: auto-create profile from Supabase Auth metadata
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.users (
        email,
        first_name,
        last_name,
        account_type,
        terms_accepted
    )
    values (
        new.email,
        coalesce(new.raw_user_meta_data ->> 'first_name', ''),
        coalesce(new.raw_user_meta_data ->> 'last_name', ''),
        coalesce(new.raw_user_meta_data ->> 'account_type', 'regular_user'),
        coalesce((new.raw_user_meta_data ->> 'terms_accepted')::boolean, false)
    )
    on conflict (email) do nothing;

    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_auth_user();
