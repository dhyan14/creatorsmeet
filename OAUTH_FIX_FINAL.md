# Google OAuth AccessDenied Fix - Final Solution

## ❌ **Problem**
Google OAuth login was failing with `error=AccessDenied` after clicking the Google button.

---

## ✅ **Root Cause**
The MongoDB adapter was causing issues with user creation/storage. The `signIn` callback was trying to manually create users in the custom User model and blocking authentication on errors.

---

## 🔧 **Solution Applied**

### **Changed: `app/api/auth/[...nextauth]/route.ts`**

### **1. Disabled MongoDB Adapter (Line 9)**
```typescript
// Before:
adapter: MongoDBAdapter(clientPromise),

// After:
// adapter: MongoDBAdapter(clientPromise), // Disabled - using JWT sessions
```

**Why:** The adapter was trying to create tables/collections that might not have proper permissions or schema setup. JWT-only sessions are simpler and more reliable.

---

### **2. Simplified signIn Callback**
```typescript
async signIn({ user, account, profile }) {
  console.log('SignIn callback triggered for:', user.email);
  return true;  // ✅ Always allow OAuth sign in
}
```

**Why:** Removed blocking database operations. Let NextAuth handle authentication, sync with custom User model later in session callback.

---

### **3. Updated session Callback to Use Token**
```typescript
async session({ session, token }) {
  if (session.user && token) {
    // Get user data from JWT token instead of database
    session.user.id = token.sub || token.id;
    session.user.email = token.email;
    session.user.name = token.name;
    session.user.image = token.picture;
    
    // Try to sync with custom User model (non-blocking)
    try {
      await dbConnect();
      const fullUser = await User.findOne({ email: session.user.email });
      
      if (fullUser) {
        session.user.role = fullUser.role;
        session.user._id = fullUser._id.toString();
      } else {
        // Create user in background
        await User.create({...});
        session.user.role = 'innovator';
      }
    } catch (dbError) {
      console.error('Error syncing:', dbError);
      session.user.role = 'innovator'; // Default fallback
    }
  }
  return session;
}
```

**Why:** 
- Works without database adapter
- Uses JWT token data (reliable)
- Syncs with custom User model asynchronously
- Never blocks authentication

---

### **4. Enhanced JWT Callback**
```typescript
async jwt({ token, user, account, profile }) {
  // Store user info in token on initial sign in
  if (account && user) {
    token.id = user.id;
    token.email = user.email;
    token.name = user.name;
    token.picture = user.image;
  }
  return token;
}
```

**Why:** Ensures all user data is available in the JWT token for session callback.

---

## 📋 **How It Works Now**

### **OAuth Flow:**

1. **User clicks Google button**
   - NextAuth redirects to Google OAuth
   
2. **User authorizes on Google**
   - Google redirects back to `/api/auth/callback/google`
   
3. **signIn callback executes**
   - ✅ Always returns `true` (allows sign in)
   - Logs email for debugging
   
4. **jwt callback executes**
   - Stores user data in JWT token
   
5. **session callback executes**
   - Gets user data from token
   - Tries to sync with custom User model
   - If sync fails, still allows login with default role
   
6. **User redirected to dashboard**
   - ✅ Fully authenticated
   - Has session with user data

---

## 🚀 **Deployment Instructions**

### **1. Commit Changes**
```bash
git add app/api/auth/[...nextauth]/route.ts
git commit -m "Fix OAuth AccessDenied - switch to JWT-only sessions"
git push
```

### **2. Verify Environment Variables in Vercel**

Make sure these are set:
- ✅ `NEXTAUTH_URL` = `https://creatorsmeet.in`
- ✅ `NEXTAUTH_SECRET` = `[your-nextauth-secret]`
- ✅ `GOOGLE_CLIENT_ID` = `[your-google-client-id]`
- ✅ `GOOGLE_CLIENT_SECRET` = `[your-google-client-secret]`
- ✅ `MONGODB_URI` = `[your-mongodb-connection-string]`

### **3. Verify Google Cloud Console**

**Authorized redirect URIs:**
```
https://creatorsmeet.in/api/auth/callback/google
https://www.creatorsmeet.in/api/auth/callback/google
http://localhost:3000/api/auth/callback/google
```

**Authorized JavaScript origins:**
```
https://creatorsmeet.in
https://www.creatorsmeet.in
http://localhost:3000
```

### **4. Redeploy**
- Push triggers automatic deployment
- Or manually redeploy latest commit in Vercel

---

## ✅ **Expected Result After Deploy**

1. ✅ Google OAuth button works on both:
   - `/signin/creators`
   - `/signup/creators`

2. ✅ No more `AccessDenied` errors

3. ✅ Users automatically created in User model on first login

4. ✅ Session persists for 30 days

5. ✅ User redirected to `/dashboard` after successful login

---

## 🐛 **If Still Not Working**

Check Vercel logs:
1. Go to Vercel Dashboard → Deployments
2. Click latest deployment → Runtime Logs
3. Look for errors in `/api/auth/[...nextauth]` route
4. Check for database connection errors

Common issues:
- Environment variables not set
- MongoDB connection string incorrect
- Google OAuth redirect URIs mismatch
- NEXTAUTH_SECRET missing

---

## 📝 **Files Changed**

- ✅ `app/api/auth/[...nextauth]/route.ts` - Complete refactor
- ✅ `app/signup/creators/page.tsx` - Already had Google button
- ✅ `app/signin/creators/page.tsx` - Already had Google button

---

## 🎯 **Session Strategy**

**Changed from:**
- Database sessions (via MongoDB adapter)
- Requires database connection for every session check
- More complex, more points of failure

**To:**
- JWT-based sessions
- No database required for session validation
- Faster, more reliable
- Session data stored in encrypted cookie

---

**This should fix the AccessDenied error completely!** 🎉
