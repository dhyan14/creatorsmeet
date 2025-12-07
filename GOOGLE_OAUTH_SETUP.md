# Google OAuth Setup Guide for youdex.in

## ✅ Files Created/Modified

### New Files Created:
1. ✅ `.env.local` - Local development environment variables
2. ✅ `app/api/auth/[...nextauth]/route.ts` - NextAuth configuration
3. ✅ `app/SessionProviderWrapper.tsx` - Session provider wrapper

### Modified Files:
1. ✅ `.env.production` - Added NextAuth and Google OAuth variables
2. ✅ `lib/mongodb.ts` - Added default export for NextAuth adapter
3. ✅ `app/layout.tsx` - Wrapped app with SessionProvider
4. ✅ `app/signin/creators/page.tsx` - Added Google sign-in functionality

---

## 📋 Required Steps

### Step 1: Install Required Package
```bash
npm install @auth/mongodb-adapter
```

### Step 2: Generate NEXTAUTH_SECRET
Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

Copy the output and update both:
- `.env.local` → `NEXTAUTH_SECRET="paste-here"`
- `.env.production` → `NEXTAUTH_SECRET="paste-here"`

### Step 3: Configure Google Cloud Console

1. **Go to Google Cloud Console:**
   https://console.cloud.google.com/

2. **Create/Select Project:**
   - Create a new project or select existing one

3. **Enable Google+ API:**
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it

4. **Create OAuth 2.0 Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   
5. **Configure OAuth Consent Screen:**
   - Application name: CreatorsMeet
   - User support email: your-email@example.com
   - Developer contact: your-email@example.com

6. **Set Application Type:**
   - Application type: **Web application**
   - Name: CreatorsMeet

7. **Add Authorized JavaScript Origins:**
   ```
   https://youdex.in
   http://localhost:3000
   ```

8. **Add Authorized Redirect URIs:**
   ```
   https://youdex.in/api/auth/callback/google
   http://localhost:3000/api/auth/callback/google
   ```

9. **Save Credentials:**
   - Copy the **Client ID**
   - Copy the **Client Secret**

### Step 4: Update Environment Variables

**In `.env.local` (for local development):**
```env
GOOGLE_CLIENT_ID="your-actual-google-client-id-here"
GOOGLE_CLIENT_SECRET="your-actual-google-client-secret-here"
NEXTAUTH_SECRET="your-generated-secret-from-openssl"
```

**In `.env.production` (for production on youdex.in):**
```env
GOOGLE_CLIENT_ID="your-actual-google-client-id-here"
GOOGLE_CLIENT_SECRET="your-actual-google-client-secret-here"
NEXTAUTH_SECRET="your-generated-secret-from-openssl"
```

**Also add to Vercel Dashboard:**
1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add:
   - `NEXTAUTH_URL` = `https://youdex.in`
   - `NEXTAUTH_SECRET` = `your-generated-secret`
   - `GOOGLE_CLIENT_ID` = `your-client-id`
   - `GOOGLE_CLIENT_SECRET` = `your-client-secret`

---

## 🚀 How It Works

### User Flow:

1. **User clicks "Sign in with Google"**
   - Redirects to Google OAuth consent screen
   - User authorizes the app

2. **Google redirects back to:**
   - `https://youdex.in/api/auth/callback/google`

3. **NextAuth handles the callback:**
   - Verifies the OAuth token
   - Checks if user exists in MongoDB
   - If new user → Creates account with Google profile info
   - If existing user → Signs them in

4. **User redirected to dashboard:**
   - Session is created with JWT
   - User data stored in MongoDB

### What Happens in the Database:

```javascript
// New Google user gets created as:
{
  name: "John Doe",              // from Google
  email: "john@gmail.com",       // from Google
  password: "",                  // empty for OAuth users
  role: "innovator",             // default role
  country: "",                   // empty initially
  profileImage: "google-url",    // from Google profile
  skills: [],
  bio: "",
  github: "",
  linkedin: ""
}
```

---

## 🔧 Testing

### Local Testing (http://localhost:3000):
1. Run: `npm run dev`
2. Go to: `http://localhost:3000/signin`
3. Click "Google" button
4. Sign in with Google account
5. Should redirect to dashboard

### Production Testing (https://youdex.in):
1. Deploy to Vercel
2. Go to: `https://youdex.in/signin`
3. Click "Google" button
4. Sign in with Google account
5. Should redirect to dashboard

---

## 📝 Important URLs

**For Google Cloud Console Configuration:**
- Production Redirect: `https://youdex.in/api/auth/callback/google`
- Local Redirect: `http://localhost:3000/api/auth/callback/google`

**Your App URLs:**
- Production SignIn: `https://youdex.in/signin`
- Local SignIn: `http://localhost:3000/signin`

---

## 🔒 Security Features

- ✅ HTTP-only cookies for session
- ✅ JWT tokens for authentication
- ✅ Secure redirect URLs
- ✅ Environment variables protected
- ✅ HTTPS enforced in production

---

## 🐛 Troubleshooting

### Issue: "Redirect URI Mismatch"
**Solution:** Make sure the redirect URI in Google Console exactly matches:
- `https://youdex.in/api/auth/callback/google`

### Issue: "Failed to sign in with Google"
**Solution:** Check that:
1. Google Client ID and Secret are correct
2. Google+ API is enabled
3. OAuth consent screen is configured

### Issue: "NEXTAUTH_SECRET is not defined"
**Solution:** Run `openssl rand -base64 32` and add to environment variables

---

## 📦 Next Steps (Optional)

### Add to Signup Page:
Update `app/signup/creators/page.tsx` with the same Google OAuth button

### Add GitHub OAuth:
1. Create GitHub OAuth App
2. Add GitHub provider to NextAuth config
3. Update button to use GitHub sign-in

---

## ✨ What's Already Done

✅ NextAuth configuration created
✅ MongoDB adapter integrated
✅ Google provider configured
✅ Session management set up
✅ Sign-in page updated with Google button
✅ Environment variables template created
✅ Automatic user creation on first Google login
✅ Session persistence across page refreshes

---

## 🎯 Summary

**You just need to:**
1. Run `npm install @auth/mongodb-adapter`
2. Generate NEXTAUTH_SECRET with `openssl rand -base64 32`
3. Configure Google Cloud Console with the URLs above
4. Add credentials to `.env.local` and `.env.production`
5. Deploy and test!

Your Google OAuth integration is ready for **youdex.in** 🚀
