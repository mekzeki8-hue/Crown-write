# CrownWrite Credit System Guide

## ✅ What's Been Fixed

### 1. **Scrollable Dashboard**
- Dashboard now has proper scrolling (navbar, user bar, workspace, footer)
- No more cut-off content
- User bar is sticky below navbar for easy access

### 2. **Real-Time Credit Updates**
- Credits automatically update after humanization
- Manual refresh button available
- Auto-refreshes every 30 seconds
- Visual feedback during refresh

### 3. **Credit System Flow**

```
User Signs Up
    ↓
Profile Created Automatically (300 credits)
    ↓
User Types Text (e.g., 50 words)
    ↓
Clicks "Humanize"
    ↓
System Checks: Credits >= Word Count?
    ↓ YES
Deducts Credits (50)
    ↓
Saves to History
    ↓
Updates Display (300 → 250 credits)
```

---

## 📊 Credit System Details

### **Pricing Model**
- **1 word = 1 credit**
- New users get **300 free credits**
- Credits are deducted AFTER successful humanization

### **Where Credits Are Shown**
1. **Dashboard top bar** - Live balance with refresh button
2. **After humanization** - Remaining credits in response

### **Database Tables**

#### `profiles` Table
Stores user account and credit balance:
- `id` - User ID (UUID)
- `email` - User email
- `credits` - Current balance (starts at 300)
- `total_credits_used` - Lifetime usage counter

#### `credit_transactions` Table
Logs every credit change:
- `user_id` - Who
- `amount` - How many (negative for usage)
- `type` - 'usage', 'purchase', 'bonus'
- `description` - What for

#### `humanization_history` Table
Saves all humanizations:
- `user_id` - Who
- `original_text` - Input
- `humanized_text` - Output
- `word_count` - Length
- `credits_used` - Cost
- `tone` - Selected tone
- `created_at` - When

---

## 🧪 Testing the System

### Test 1: Check Initial Credits
1. Sign in with Google
2. Look at top bar
3. Should show: "300 credits"

### Test 2: Humanize Text
1. Paste 10 words
2. Click "Humanize"
3. Wait for result
4. Check credits: Should show "290 credits"

### Test 3: Insufficient Credits
1. Try to humanize 500 words with only 290 credits
2. Should get error: "Insufficient credits"

### Test 4: Real-Time Updates
1. Humanize some text
2. Watch credit display update automatically
3. Click refresh button to manually update

### Test 5: Check Database
1. Go to Supabase dashboard
2. Open `profiles` table
3. See your account with updated credit balance
4. Open `credit_transactions` table
5. See transaction history
6. Open `humanization_history` table
7. See saved humanizations

---

## 🛠️ How It Works Technically

### When User Signs Up:
```typescript
// app/auth/callback/route.ts
await ensureUserProfile(user.id, user.email);
// Creates profile with 300 credits automatically
```

### When User Humanizes:
```typescript
// app/api/humanize/route.ts

// 1. Count words
const wordCount = text.trim().split(/\s+/).length;

// 2. Check credits
const currentCredits = await getUserCredits(user.id);
if (currentCredits < wordCount) {
  return error("Insufficient credits");
}

// 3. Humanize text
const humanizedText = await humanizeWithGemini(...);

// 4. Deduct credits
await deductCredits(user.id, wordCount, description);

// 5. Save history
await saveHumanizationHistory({...});

// 6. Return result with remaining credits
return { humanizedText, remainingCredits: ... };
```

### Credit Display Updates:
```typescript
// app/components/CreditDisplay.tsx

// Listens for custom event
window.addEventListener('creditsUpdated', handleUpdate);

// Refreshes from database
const { data } = await supabase
  .from('profiles')
  .select('credits')
  .eq('id', user.id)
  .single();

// Updates UI
setCredits(data.credits);
```

---

## 🎨 UI/UX Improvements

### Before:
- ❌ Dashboard cut off, no scrolling
- ❌ Credits only shown as text
- ❌ No real-time updates
- ❌ No visual feedback

### After:
- ✅ Full scrolling (navbar → workspace → footer)
- ✅ Beautiful credit badge with icon
- ✅ Auto-refresh + manual refresh button
- ✅ Visual loading states
- ✅ Sticky user bar for easy access

---

## 📱 Responsive Design

The credit display and dashboard work on:
- Desktop (1400px+)
- Tablet (768px - 1400px)
- Mobile (< 768px)

On mobile, user bar items stack vertically for better UX.

---

## 🚀 Future Enhancements

Possible additions:
1. **Credit packages** - Buy 1000, 5000, 10,000 credits
2. **Subscription tiers** - Pro/Enterprise with more credits
3. **Credit history page** - View all transactions
4. **Low credit warnings** - Alert when < 50 credits
5. **Credit gifts** - Send credits to friends
6. **Referral bonuses** - Get credits for invites

---

## 🐛 Troubleshooting

### Credits Not Updating?
1. Click the refresh button
2. Check browser console for errors
3. Verify database tables exist
4. Check Supabase logs

### Humanization Fails?
1. Check API keys in `.env.local`
2. Verify Gemini model is configured
3. Check error message in red banner
4. Look at browser console

### Profile Not Created?
1. Check `app/auth/callback/route.ts`
2. Verify `ensureUserProfile` is called
3. Check Supabase logs
4. Manually check `profiles` table

---

## 📞 Support

If issues persist:
1. Check Supabase dashboard logs
2. Review browser console errors
3. Verify all environment variables are set
4. Test with a fresh user account

---

**Last Updated:** 2026-08-14
**System Version:** CrownV4 Beta
