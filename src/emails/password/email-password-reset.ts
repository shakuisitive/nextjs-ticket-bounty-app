export function emailPasswordReset(
  username: string,
  passwordResetLink: string
) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">TicketBounty</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 24px; font-weight: 600;">Password Reset Request</h2>
                            
                            <p style="margin: 0 0 16px; color: #4a5568; font-size: 16px; line-height: 1.6;">
                                Hello <strong>${username}</strong>,
                            </p>
                            
                            <p style="margin: 0 0 24px; color: #4a5568; font-size: 16px; line-height: 1.6;">
                                We received a request to reset your password. Click the button below to create a new password for your account.
                            </p>
                            
                            <!-- Button -->
                            <table role="presentation" style="margin: 0 0 24px;">
                                <tr>
                                    <td style="border-radius: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                                        <a href="${passwordResetLink}" 
                                           style="display: inline-block; padding: 16px 40px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px;">
                                            Reset Password
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 0 0 16px; color: #4a5568; font-size: 14px; line-height: 1.6;">
                                Or copy and paste this link into your browser:
                            </p>
                            
                            <p style="margin: 0 0 24px; padding: 12px; background-color: #f7fafc; border-radius: 6px; color: #667eea; font-size: 14px; word-break: break-all;">
                                ${passwordResetLink}
                            </p>
                            
                            <div style="padding: 16px; background-color: #fff5f5; border-left: 4px solid #fc8181; border-radius: 4px; margin-bottom: 24px;">
                                <p style="margin: 0; color: #742a2a; font-size: 14px; line-height: 1.6;">
                                    <strong>Security Notice:</strong> If you didn't request this password reset, please ignore this email or contact support if you have concerns.
                                </p>
                            </div>
                            
                            <p style="margin: 0; color: #718096; font-size: 14px; line-height: 1.6;">
                                This link will expire in 24 hours for security reasons.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px; background-color: #f7fafc; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0 0 8px; color: #718096; font-size: 14px; text-align: center;">
                                Best regards,<br>
                                <strong>The TicketBounty Team</strong>
                            </p>
                            <p style="margin: 0; color: #a0aec0; font-size: 12px; text-align: center; line-height: 1.5;">
                                This is an automated message, please do not reply to this email.
                            </p>
                        </td>
                    </tr>
                </table>
                
                <!-- Spacer -->
                <table role="presentation" style="max-width: 600px; width: 100%; margin-top: 20px;">
                    <tr>
                        <td style="text-align: center; padding: 0 20px;">
                            <p style="margin: 0; color: #a0aec0; font-size: 12px; line-height: 1.5;">
                                © 2024 TicketBounty. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
}
