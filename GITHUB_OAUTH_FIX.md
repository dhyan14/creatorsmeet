# GitHub OAuth Troubleshooting Guide

## The Issue
You're getting: **"The redirect_uri is not associated with this application."**

This means the callback URL in your GitHub OAuth app **DOES NOT EXACTLY MATCH** what your code is sending.

---

## ✅ STEP-BY-STEP FIX

### 1. Check Your Vercel Environment Variables

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Verify EXACTLY:
```
NEXTAUTH_URL=https://www.creatorsmeet.in
```

**Important:**
- ❌ NO trailing slash: `https://www.creatorsmeet.in/`
- ❌ NO www missing: `https://creatorsmeet.in`
- ✅ EXACTLY: `https://www.creatorsmeet.in`

**After adding/updating:** Click "Redeploy" for changes to take effect!

---

### 2. Update Your GitHub OAuth App

Go to: https://github.com/settings/developers

Click on your OAuth App (Client ID: `Ov23liyzTLJXWIKN678T`)

Set these EXACTLY:

**Homepage URL:**
```
https://www.creatorsmeet.in
```

**Authorization callback URL:**
```
https://www.creatorsmeet.in/api/codespace/git/connect/callback
```

**Click "Update application"**

---

### 3. Verify the URLs Match

The callback URL GitHub expects = `NEXTAUTH_URL` + `/api/codespace/git/connect/callback`

So if:
- `NEXTAUTH_URL` = `https://www.creatorsmeet.in`
- Then callback = `https://www.creatorsmeet.in/api/codespace/git/connect/callback`

**Common Mistakes:**
- ❌ `http` instead of `https`
- ❌ Extra `/` at the end
- ❌ `www` missing or extra
- ❌ Old localhost URL still there

---

### 4. Test After Changes

1. Make sure environment variable is updated in Vercel
2. **Redeploy your project** (very important!)
3. Make sure GitHub OAuth app has the exact callback URL
4. Clear browser cache / use incognito mode
5. Try connecting GitHub again from the Codespace Git Panel

---

## 📋 Quick Checklist

- [ ] Vercel `NEXTAUTH_URL` is `https://www.creatorsmeet.in` (no slash)
- [ ] Redeployed after setting environment variable
- [ ] GitHub OAuth Homepage URL: `https://www.creatorsmeet.in`
- [ ] GitHub OAuth Callback URL: `https://www.creatorsmeet.in/api/codespace/git/connect/callback`
- [ ] Saved GitHub OAuth app changes
- [ ] Cleared browser cache or using incognito

---

## 🔍 Still Not Working?

If you still get the error, please verify:

1. **Screenshot your Vercel environment variables page**
2. **Screenshot your GitHub OAuth app settings page**

Send those to me and I can spot the exact mismatch!
