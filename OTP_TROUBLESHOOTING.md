# OTP Email Troubleshooting Guide

## Quick Checks

### 1. ✅ Verify RESEND_API_KEY is Set
- Go to Vercel Project Settings → Environment Variables
- Confirm `RESEND_API_KEY` exists
- Value should start with `re_`
- **Important:** Redeploy after adding environment variables!

### 2. 📧 Verify Email Domain in Resend

**Option A: Use Resend's Test Domain (Quick Start)**
```typescript
// In lib/email.ts, change the 'from' address to:
from: 'onboarding@resend.dev'  // Resend's test domain
```

**Option B: Add Your Custom Domain**
1. Go to Resend Dashboard → Domains
2. Add `creatorsmeet.in`
3. Add DNS records (SPF, DKIM, DMARC)
4. Wait for verification

### 3. 🔍 Check Vercel Logs
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on latest deployment → Functions
3. Look for `/api/auth/signup` logs
4. Check for errors like:
   - `RESEND_API_KEY is not configured`
   - `Failed to send email`
   - DNS/domain errors

### 4. 🧪 Test the API Directly

**Using Postman or curl:**
```bash
curl -X POST https://www.creatorsmeet.in/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "username": "testuser123",
    "email": "your-real-email@gmail.com",
    "password": "Test@1234",
    "role": "creator"
  }'
```

Check the response for errors.

### 5. 📝 Common Issues & Solutions

#### Issue: "Domain not verified"
**Solution:** Use `onboarding@resend.dev` temporarily OR verify your domain

#### Issue: Email goes to spam
**Solution:** 
- Check spam/junk folder
- Configure SPF/DKIM records
- Use verified domain

#### Issue: No error but no email
**Solution:** Check Resend Dashboard → Emails to see if it was sent

#### Issue: "RESEND_API_KEY is not configured"
**Solution:** 
- Ensure variable is added to Vercel
- **Redeploy** after adding (very important!)
- Check variable is in correct environment (Production/Preview)

### 6. 🔧 Quick Fix: Temporary Console Logging

While debugging, you can temporarily fallback to console logging:

```typescript
// In lib/email.ts, modify sendOTPEmail:
export async function sendOTPEmail({ to, name, otp }: SendOTPEmailParams) {
    try {
        const resend = getResendClient();
        
        console.log('📧 Attempting to send OTP email to:', to);
        console.log('🔑 OTP Code:', otp);
        
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev', // Use test domain
            to: [to],
            subject: 'Verify Your Email - CreatorsMeet',
            // ... rest of template
        });

        if (error) {
            console.error('❌ Resend error:', error);
            throw new Error('Failed to send email');
        }

        console.log('✅ Email sent successfully:', data);
        return { success: true, data };
    } catch (error) {
        console.error('❌ Email sending error:', error);
        throw error;
    }
}
```

Then check Vercel logs for the OTP code.

## Recommended Next Steps

1. **Use Test Domain First:**
   - Change `from` to `onboarding@resend.dev`
   - Redeploy
   - Try signup again

2. **Check Vercel Logs:**
   - Look for the console.log output
   - Check for any errors

3. **Verify in Resend Dashboard:**
   - Go to Resend → Emails
   - See if emails are being sent
   - Check delivery status

## Contact Support

If still not working, check:
- Resend account is active
- API key has email sending permissions
- Email is not in spam/junk folder
- Try with a different email address (Gmail, Yahoo, etc.)
