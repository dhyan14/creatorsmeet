import { Resend } from 'resend';

interface SendOTPEmailParams {
    to: string;
    name: string;
    otp: string;
}

// Lazy initialize Resend to avoid build-time errors
function getResendClient() {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        throw new Error('RESEND_API_KEY is not configured. Please add it to your environment variables.');
    }

    return new Resend(apiKey);
}

export async function sendOTPEmail({ to, name, otp }: SendOTPEmailParams) {
    try {
        const resend = getResendClient();

        const { data, error } = await resend.emails.send({
            from: 'CreatorsMeet <noreply@creatorsmeet.in>',
            to: [to],
            subject: 'Verify Your Email - CreatorsMeet',
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 48px 48px 32px; text-align: center; background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                                🚀 CreatorsMeet
                            </h1>
                            <p style="margin: 8px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                                Welcome to the community!
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                        <td style="padding: 48px;">
                            <h2 style="margin: 0 0 16px; color: #ffffff; font-size: 24px; font-weight: 600;">
                                Hi ${name}! 👋
                            </h2>
                            <p style="margin: 0 0 24px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                                Thank you for signing up! To complete your registration, please verify your email address using the code below:
                            </p>
                            
                            <!-- OTP Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                                <tr>
                                    <td align="center" style="background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); border-radius: 16px; padding: 32px;">
                                        <p style="margin: 0 0 8px; color: rgba(255, 255, 255, 0.8); font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                                            Your Verification Code
                                        </p>
                                        <div style="background: rgba(255, 255, 255, 0.15); border-radius: 12px; padding: 16px 32px; display: inline-block; backdrop-filter: blur(10px);">
                                            <span style="font-size: 42px; font-weight: 700; color: #ffffff; letter-spacing: 8px; font-family: 'Monaco', 'Courier New', monospace;">
                                                ${otp}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 24px 0 0; color: #a3a3a3; font-size: 14px; line-height: 1.6;">
                                ⏰ This code will expire in <strong style="color: #ffffff;">10 minutes</strong>.
                            </p>
                            
                            <div style="margin: 32px 0; padding: 20px; background: rgba(147, 51, 234, 0.1); border-left: 4px solid #9333ea; border-radius: 8px;">
                                <p style="margin: 0; color: #d4d4d4; font-size: 14px; line-height: 1.6;">
                                    <strong style="color: #ffffff;">💡 Tip:</strong> If you didn't create an account with CreatorsMeet, you can safely ignore this email.
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 32px 48px; background: rgba(255, 255, 255, 0.02); border-top: 1px solid rgba(255, 255, 255, 0.05);">
                            <p style="margin: 0 0 16px; color: #737373; font-size: 14px; line-height: 1.6;">
                                Need help? Contact us at <a href="mailto:support@creatorsmeet.in" style="color: #9333ea; text-decoration: none;">support@creatorsmeet.in</a>
                            </p>
                            <p style="margin: 0; color: #525252; font-size: 12px;">
                                © ${new Date().getFullYear()} CreatorsMeet. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
            `,
        });

        if (error) {
            console.error('Resend email error:', error);
            throw new Error('Failed to send email');
        }

        console.log('OTP email sent successfully:', data);
        return { success: true, data };
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw error;
    }
}
