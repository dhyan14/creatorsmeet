# 🔒 Security Notice

## ⚠️ IMPORTANT: Environment Variables

Your actual credentials are stored locally in:
- `.env.local` (for local development)
- `.env.production` (for production deployment)

**These files are NOT tracked by git** (listed in `.gitignore`)

## 📋 Your Actual Credentials

Your Google OAuth credentials are already configured in your local `.env` files.

**Note:** Actual credential values are stored securely in `.env.local` and `.env.production` on your local machine. These files are not tracked by git for security reasons.

## 🚨 Never Commit These Files

The following files should NEVER be committed to git:
- `.env.local`
- `.env.production`
- `.env.development`
- Any file containing actual API keys or secrets

## ✅ What IS Safe to Commit

- `.env.example` - Template with placeholder values
- Documentation files (without actual secrets)
- Code files referencing environment variables

## 🔐 Adding Secrets to Vercel

Since `.env.production` is not in git, you must add environment variables manually in Vercel:

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add each variable with its actual value

## 📚 Reference

See `SETUP_COMPLETE.md` for full setup instructions (credentials removed for security).
