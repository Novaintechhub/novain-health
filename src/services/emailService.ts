import * as SibApiV3Sdk from '@sendinblue/client';
import fs from 'fs';
import path from 'path';

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

const readEmailTemplate = (templateName: string): string => {
    const templatePath = path.join(process.cwd(), 'src', 'email-templates', templateName);
    return fs.readFileSync(templatePath, 'utf-8');
};

export const sendVerificationEmail = async (email: string, name: string, otp: string) => {
  try {
    let htmlContent = readEmailTemplate('otp.html');
    htmlContent = htmlContent.replace('{{name}}', name).replace('{{otp}}', otp);

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "Verify Your NovainHealth Account";
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = { "name": "NovainHealth", "email": "noreply@novainhealth.com" };
    sendSmtpEmail.to = [{ "email": email, "name": name }];
    
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Verification email sent successfully.');

  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email.');
  }
};
