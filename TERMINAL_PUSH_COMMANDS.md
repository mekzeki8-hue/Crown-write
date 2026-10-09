# 🚀 TERMINAL COMMANDS TO PUSH

## ⚠️ IMPORTANT: Which Repository Exists?

I found that **`Crown-write`** (with hyphen) exists, but **`Crownwrite`** (without hyphen) doesn't exist on GitHub.

You need to either:
1. **Push to the existing repo** (`Crown-write` with hyphen)
2. **OR create the new repo first** (`Crownwrite` without hyphen)

---

## ✅ OPTION 1: Push to Existing Repository (Crown-write)

### Simple Commands - Copy and paste these one by one:

```bash
cd /Users/mac/Desktop/true/Crownwrite
```

```bash
git remote set-url origin https://github.com/mekzeki8-hue/Crown-write.git
```

```bash
git push origin main
```

**That's it!** This should push to your existing `Crown-write` repository.

---

## ✅ OPTION 2: Create New Repository First (Crownwrite)

### Step 1: Create Repository on GitHub
1. Go to: https://github.com/new
2. Repository name: **`Crownwrite`** (no hyphen, capital C)
3. Keep it **Public** or **Private** (your choice)
4. **DO NOT** check "Initialize with README"
5. Click **"Create repository"**

### Step 2: Push Your Code
```bash
cd /Users/mac/Desktop/true/Crownwrite
```

```bash
git remote set-url origin https://github.com/mekzeki8-hue/Crownwrite.git
```

```bash
git push -u origin main
```

---

## 📝 What is a "Token"?

A **Personal Access Token** is like a password for GitHub when using the terminal. You only need it if the simple `git push` command asks for a password.

### When You Need a Token:
- If `git push` asks for a password
- If you get "Authentication failed" error

### How to Create a Token (Only if needed):

1. **Go to**: https://github.com/settings/tokens

2. **Click**: "Generate new token" → "Generate new token (classic)"

3. **Fill in**:
   - Note: `Crownwrite Push`
   - Expiration: `90 days`
   - Check: ☑️ **repo** (select all under repo)

4. **Click**: "Generate token" (green button at bottom)

5. **Copy the token** - it looks like: `ghp_xxxxxxxxxxxxxxxxxxxx`

### How to Use Token:
If `git push` asks for password, paste your token instead of your GitHub password.

---

## 🎯 MY RECOMMENDATION

**Just try Option 1 first** (push to Crown-write with hyphen):

```bash
cd /Users/mac/Desktop/true/Crownwrite
git remote set-url origin https://github.com/mekzeki8-hue/Crown-write.git
git push origin main
```

This should work! Copy these commands one by one into Terminal.

---

## ❓ What if it asks for username/password?

### Username: 
```
mekzeki8-hue
```

### Password:
Don't use your GitHub password! You need a token.
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Check "repo" box
4. Copy the token
5. Paste it as your password

---

## 🔍 Check Which Repo You Want

### Repo with hyphen exists:
https://github.com/mekzeki8-hue/Crown-write

### Repo without hyphen:
https://github.com/mekzeki8-hue/Crownwrite
(You need to create this first if you want to use it)

---

**Let me know which repository you want to use and I'll give you the exact commands!**

