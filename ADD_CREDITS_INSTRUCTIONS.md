# Add 100,000 Credits to mekzeki8@gmail.com

## Option 1: Using Supabase Dashboard (Recommended)

### Step 1: Setup Database (If not done yet)
1. Go to https://supabase.com/dashboard
2. Select your CrownWrite project
3. Go to **SQL Editor**
4. Click **New Query**
5. Copy and paste the content from `supabase-setup.sql`
6. Click **Run** to create all tables

### Step 2: Add Credits via SQL
1. Still in **SQL Editor**, create a new query
2. Paste this SQL:

```sql
-- Add 100,000 credits to mekzeki8@gmail.com
DO $$
DECLARE
  v_user_id UUID;
  v_current_credits INTEGER;
BEGIN
  -- Find user by email
  SELECT id, credits INTO v_user_id, v_current_credits
  FROM public.profiles
  WHERE email = 'mekzeki8@gmail.com';

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User not found with email: mekzeki8@gmail.com';
  END IF;

  -- Add 100,000 credits
  UPDATE public.profiles
  SET credits = credits + 100000,
      updated_at = NOW()
  WHERE id = v_user_id;

  -- Log transaction
  INSERT INTO public.credit_transactions (user_id, amount, type, description)
  VALUES (v_user_id, 100000, 'bonus', 'Manual credit addition by admin');

  -- Show result
  RAISE NOTICE 'Success! Added 100,000 credits to mekzeki8@gmail.com';
  RAISE NOTICE 'Previous balance: %', v_current_credits;
  RAISE NOTICE 'New balance: %', v_current_credits + 100000;
END $$;
```

3. Click **Run**
4. You should see success message in the output

---

## Option 2: Using Node.js Script (Alternative)

### Prerequisites:
- Database tables must be created first (run `supabase-setup.sql`)
- User must have signed up at least once

### Run the script:
```bash
node scripts/add-credits.js
```

The script will:
1. Find user by email: mekzeki8@gmail.com
2. Add 100,000 credits
3. Log the transaction
4. Show before/after balance

---

## Option 3: Manual via Supabase Table Editor

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Table Editor**
4. Select **profiles** table
5. Find the row with email `mekzeki8@gmail.com`
6. Click the **credits** column value
7. Edit the number (add 100,000 to current value)
8. Click **Save**

**Note:** This method won't log the transaction

---

## Verification

After adding credits, verify by:

1. **Via SQL:**
```sql
SELECT email, credits, total_credits_used, updated_at
FROM public.profiles
WHERE email = 'mekzeki8@gmail.com';
```

2. **Via Transaction Log:**
```sql
SELECT amount, type, description, created_at
FROM public.credit_transactions
WHERE user_id = (
  SELECT id FROM public.profiles WHERE email = 'mekzeki8@gmail.com'
)
ORDER BY created_at DESC
LIMIT 5;
```

3. **Via Dashboard:**
   - Sign in to https://crownwrite.com with mekzeki8@gmail.com
   - Check credit balance in dashboard

---

## Current Status

**Email:** mekzeki8@gmail.com  
**Credits to add:** 100,000  
**Method:** Use Option 1 (Supabase SQL) - most reliable

---

## Quick SQL (Copy & Run)

```sql
-- Quick add 100k credits
UPDATE public.profiles
SET credits = credits + 100000, updated_at = NOW()
WHERE email = 'mekzeki8@gmail.com'
RETURNING email, credits;

-- Log it
INSERT INTO public.credit_transactions (user_id, amount, type, description)
SELECT id, 100000, 'bonus', 'Admin credit bonus'
FROM public.profiles
WHERE email = 'mekzeki8@gmail.com';
```

---

**Choose Option 1 for best results!** ✅
