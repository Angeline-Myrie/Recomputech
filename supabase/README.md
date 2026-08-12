# Supabase setup for Recomputech

This folder contains the SQL needed to connect the website to your Supabase `users` table.

## 1. Configure the website

1. Copy `js/supabase-config.example.js` to `js/supabase-config.js`
2. Open Supabase Dashboard → **Project Settings** → **API**
3. Paste your **Project URL** and **anon public key** into `js/supabase-config.js`

## 2. Run the SQL policies

1. Open Supabase Dashboard → **SQL Editor**
2. Paste and run `supabase/setup.sql`

This enables Row Level Security and creates policies so users can register and read their own profile.

## 3. Enable email/password auth

In Supabase Dashboard → **Authentication** → **Providers**, enable **Email**.

If email confirmation is enabled, users must confirm their email before they can sign in.

## 4. Table mapping

| Website field | Database column |
| --- | --- |
| First name | `first_name` |
| Last name | `last_name` |
| Email | `email` |
| Account type | `account_type` (`regular_user` or `technician`) |
| Terms checkbox | `terms_accepted` |
| Password | handled by Supabase Auth, not stored in `users` |

## 5. Test locally

1. Open the site with Live Server
2. Go to `auth/auth.html`
3. Create an account and verify the row appears in Supabase → **Table Editor** → `users`
