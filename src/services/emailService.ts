
'use server';

import * as SibApiV3Sdk from '@sendinblue/client';
import fs from 'fs';
import path from 'path';

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const apiKey = process.env.BREVO_API_KEY;

if (apiKey) {
    apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, apiKey);
} else {
    console.warn("BREVO_API_KEY is not set. Email service will be disabled.");
}

const readEmailTemplate = (templateName: string): string => {
    try {
        const templatePath = path.join(process.cwd(), 'src', 'email-templates', templateName);
        return fs.readFileSync(templatePath, 'utf-8');
    } catch (error) {
        console.error(`Error reading email template ${templateName}:`, error);
        // Return a fallback plain text template
        return `
            Hello {{name}},

            Your verification code is: {{otp}}

            Thanks,
            The NovainHealth Team
        `;
    }
};

export const sendVerificationEmail = async (email: string, name: string, otp: string) => {
  if (!apiKey) {
    console.error("Cannot send email: BREVO_API_KEY is not configured.");
    // In a real app, you might want to throw an error or handle this case more gracefully
    // For now, we'll just log the OTP to the console for development purposes.
    console.log(`OTP for ${email}: ${otp}`);
    return;
  }

  try {
    let htmlContent = readEmailTemplate('otp.html');
    htmlContent = htmlContent.replace(/{{name}}/g, name)
                             .replace(/{{otp}}/g, otp)
                             .replace(/{{appUrl}}/g, process.env.NEXT_PUBLIC_APP_URL || '')
                             .replace(/{{privacyPolicyUrl}}/g, `${process.env.NEXT_PUBLIC_APP_URL}/privacy-policy` || '');


    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "Verify Your NovainHealth Account";
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = { 
      "name": process.env.BREVO_SENDER_NAME || "NovainHealth", 
      "email": process.env.BREVO_SENDER_EMAIL || "noreply@novainhealth.com" 
    };
    sendSmtpEmail.to = [{ "email": email, "name": name }];
    
    const apiResponse = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Verification email sent successfully. API response:', apiResponse.body);

  } catch (error: any) {
    console.error('Error sending verification email:', JSON.stringify(error, null, 2));
    throw new Error('Failed to send verification email.');
  }
};
