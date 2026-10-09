# 🔧 FIX GITHUB AUTHENTICATION

## Problem: 
You're logged in as `eyae-l` but need to be `mekzeki8-hue`

---

## ✅ SOLUTION: Clear Old Credentials and Login Correctly

### Copy and paste these commands ONE BY ONE:

**Step 1: Clear the wrong credentials**
```bash
git credential-osxkeychain erase
```
Then press Enter, and type:
```
host=github.com
protocol=https
```
Then press Enter **twice** (this clears old login)

**Step 2: Try pushing again (it will ask for credentials)**
```bash
cd /Users/mac/Desktop/true/Crownwrite
git push origin main
```

**Step 3: When it asks for credentials:**
- Username: `mekzeki8-hue`
- Password: **USE A TOKEN** (not your GitHub password)

---

## 🔑 HOW TO GET A TOKEN (Required!)

### Follow these steps:

1. **Open your browser** and go to:
   ```
   https://github.com/settings/tokens
   ```

2. **Make sure you're logged in as `mekzeki8-hue`**
   - Check top-right corner of GitHub
   - If wrong account, log out and log in as `mekzeki8-hue`

3. **Click**: "Generate new token" → Select **"Generate new token (classic)"**

4. **Fill in the form**:
   - **Note**: Type `Crownwrite Push`
   - **Expiration**: Select `90 days` or `No expiration`
   - **Scopes**: Check the box ☑️ **"repo"** (this checks all sub-boxes)

5. **Scroll down** and click green **"Generate token"** button

6. **COPY THE TOKEN!** 
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxx`
   - **Save it somewhere** - you won't see it again!

---

## 📋 COMPLETE COMMANDS (All Steps)

Copy these one by one into Terminal:

### Clear old credentials:
```bash
git credential-osxkeychain erase
```
Then type:
```
host=github.com
protocol=https
```
Press Enter twice

### Push (will ask for username/password):
```bash
cd /Users/mac/Desktop/true/Crownwrite
git push origin main
```

### When Terminal asks:
```
Username: mekzeki8-hue
Password: [PASTE YOUR TOKEN HERE]
```

**Note**: When you paste the token, you won't see it - that's normal! Just paste and press Enter.

---

## 🚀 EASIER METHOD: Push with Token Directly

If you already have a token, use this single command:

```bash
git push https://YOUR_TOKEN@github.com/mekzeki8-hue/Crown-write.git main
```

Replace `YOUR_TOKEN` with your actual token.

**Example:**
```bash
git push https://ghp_abc123xyz789@github.com/mekzeki8-hue/Crown-write.git main
```

---

## ✅ After Successful Push

You'll see something like:
```
Enumerating objects: 150, done.
Counting objects: 100% (150/150), done.
Writing objects: 100% (150/150), done.
Total 150 (delta 100), reused 0 (delta 0)
To https://github.com/mekzeki8-hue/Crown-write.git
   abc1234..def5678  main -> main
```

This means SUCCESS! ✅

---

## 🎯 QUICK SUMMARY

1. Get token from: https://github.com/settings/tokens
2. Clear old credentials (commands above)
3. Push again - use token as password
4. Done!

OR

1. Get token from: https://github.com/settings/tokens
2. Push with: `git push https://TOKEN@github.com/mekzeki8-hue/Crown-write.git main`
3. Done!

