# 🚀 Quick Setup - Google OAuth for youdex.in

## Commands to Run:

```bash
# 1. Install package
npm install @auth/mongodb-adapter

# 2. Generate secret
openssl rand -base64 32
# → Copy output and paste in .env files

# 3. Test locally
npm run dev
```

---

## Google Cloud Console Setup:

**Authorized JavaScript Origins:**
```
https://youdex.in
http://localhost:3000
```

**Authorized Redirect URIs:**
```
https://youdex.in/api/auth/callback/google
http://localhost:3000/api/auth/callback/google
```

---

## Environment Variables to Fill:

**In `.env.local` and `.env.production`:**
```env
NEXTAUTH_SECRET="[paste openssl output here]"
GOOGLE_CLIENT_ID="[paste from Google Console]"
GOOGLE_CLIENT_SECRET="[paste from Google Console]"
```

---

## Vercel Environment Variables:

Add these in Vercel Dashboard → Settings → Environment Variables:

| Key | Value |
|-----|-------|
| `NEXTAUTH_URL` | `https://youdex.in` |
| `NEXTAUTH_SECRET` | [your openssl output] |
| `GOOGLE_CLIENT_ID` | [from Google Console] |
| `GOOGLE_CLIENT_SECRET` | [from Google Console] |

---

## Testing:

1. **Local:** http://localhost:3000/signin → Click Google button
2. **Production:** https://youdex.in/signin → Click Google button

---

## That's it! 🎉

All code is already implemented and ready to use.
