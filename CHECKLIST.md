# ✅ Google OAuth Setup Checklist

## Local Setup

- [ ] Run `npm install @auth/mongodb-adapter`
- [ ] Run `npm run dev`
- [ ] Visit http://localhost:3000/signin
- [ ] Click "Google" button
- [ ] Sign in with Google account
- [ ] Verify redirect to dashboard
- [ ] Check if user created in MongoDB

## Vercel/Production Setup

### Step 1: Add Environment Variables to Vercel
Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

Add these 4 variables (for Production, Preview, and Development):

- [ ] `NEXTAUTH_URL` = `https://youdex.in`
- [ ] `NEXTAUTH_SECRET` = `[your-generated-secret]`
- [ ] `GOOGLE_CLIENT_ID` = `[your-google-client-id]`
- [ ] `GOOGLE_CLIENT_SECRET` = `[your-google-client-secret]`

### Step 2: Deploy to Vercel
- [ ] Commit and push code to Git
- [ ] Or redeploy from Vercel dashboard
- [ ] Wait for deployment to complete

### Step 3: Test Production
- [ ] Visit https://youdex.in/signin
- [ ] Click "Google" button
- [ ] Sign in with Google account
- [ ] Verify redirect to https://youdex.in/dashboard
- [ ] Test session persistence (refresh page)

## Google Cloud Console Verification

- [ ] Authorized JavaScript Origins includes `https://youdex.in`
- [ ] Authorized JavaScript Origins includes `http://localhost:3000`
- [ ] Authorized Redirect URIs includes `https://youdex.in/api/auth/callback/google`
- [ ] Authorized Redirect URIs includes `http://localhost:3000/api/auth/callback/google`

## Files Created/Modified

### New Files ✅
- [x] `app/api/auth/[...nextauth]/route.ts`
- [x] `app/SessionProviderWrapper.tsx`
- [x] `.env.local`
- [x] `GOOGLE_OAUTH_SETUP.md`
- [x] `QUICK_SETUP.md`
- [x] `SETUP_COMPLETE.md`
- [x] `CHECKLIST.md` (this file)

### Modified Files ✅
- [x] `.env.production`
- [x] `lib/mongodb.ts`
- [x] `app/layout.tsx`
- [x] `app/signin/creators/page.tsx`

## Troubleshooting

If something doesn't work:

### Issue: "Redirect URI Mismatch"
- [ ] Check redirect URI in Google Console exactly matches: `https://youdex.in/api/auth/callback/google`
- [ ] Make sure there are no trailing slashes

### Issue: "Configuration Error"
- [ ] Verify all 4 environment variables are added in Vercel
- [ ] Redeploy after adding variables

### Issue: "Sign in failed"
- [ ] Check Google Client ID and Secret are correct
- [ ] Verify Google+ API is enabled in Google Console
- [ ] Check MongoDB connection is working

### Issue: "Module not found: @auth/mongodb-adapter"
- [ ] Run `npm install @auth/mongodb-adapter`
- [ ] Check package.json includes the package

## 🎉 Done!

Once all checkboxes are checked, your Google OAuth is fully working!
