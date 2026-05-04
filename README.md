This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Features & Secrets

- **Memory Gallery Lock:** The Memory Gallery is protected by a password to keep memories private. The current password is `Bubs_Birthday`.

## Supabase Authentication & Authorization (Action Plan)

Since you have created the Supabase project (`drloqobspojyzdcnvfse`), here are the exact step-by-step instructions to get the authentication and manual approval system working.

### Step 1: Run the Database Setup Script
We need to create a `profiles` table that tracks whether a user is approved or not.
1. Go to your Supabase Dashboard: [https://supabase.com/dashboard/project/drloqobspojyzdcnvfse](https://supabase.com/dashboard/project/drloqobspojyzdcnvfse)
2. Click on the **SQL Editor** on the left menu (the `</>` icon).
3. Click **"New query"**.
4. Copy and paste the exact SQL code below into the editor and click **Run** (the green play button):

```sql
-- Create a table for public profiles
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text not null,
  is_approved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Allow users to read their own profile
create policy "Users can view own profile"
  on profiles for select
  using ( auth.uid() = id );

-- Create a trigger function to automatically create a profile when a new user signs up
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, is_approved)
  values (new.id, new.email, false);
  return new;
end;
$$;

-- Attach the trigger to the auth.users table
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### Step 2: Get Your API Keys
Your Next.js app needs to know how to connect to this specific Supabase project.
1. In your Supabase Dashboard, go to **Project Settings** (the gear icon ⚙️ at the bottom left).
2. Click on **API** under the Configuration section.
3. You will see a **Project URL** and an **anon / public** key. Keep this page open.

### Step 3: Setup `.env.local`
1. Open your code editor (VS Code).
2. In the root folder of this project (the `happy-birthday` folder), create a new file named exactly: `.env.local`
3. Add the following lines to it, replacing the placeholder text with the actual URL and Key from Step 2:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Next Steps...
Once you have run the SQL script (Step 1) and created the `.env.local` file (Step 2 & 3), **let me know!** 
I will then install the necessary Supabase packages and write all the React code for the login page and the lock mechanism.



### Alternative Approach: Clerk (Free Tier)
Clerk (clerk.com) is another excellent free tool specifically built for Next.js authentication.
- **How it works:** You can enable the **"Allowlist"** or **"Waitlist"** feature in the Clerk Dashboard. 
- Users try to sign up, but they are blocked unless you manually add their email to the Allowlist in your Clerk dashboard. 
- This requires much less coding than Supabase because Clerk handles the entire UI and blocking mechanism automatically!

If you would like to proceed with either of these implementations, just ask, and we can start building it!


I have logged inn in Supbase using Github and now Project is Bubs_Birthday and password - Bubs_Birthday@11