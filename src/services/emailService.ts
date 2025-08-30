
'use server';

import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// SMTP Configuration from environment variables
const smtpConfig = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465", 10),
    secure: parseInt(process.env.SMTP_PORT || "465", 10) === 465, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
};

const readEmailTemplate = (templateName: string): string => {
    try {
        const templatePath = path.join(process.cwd(), 'src', 'email-templates', templateName);
        return fs.readFileSync(templatePath, 'utf-8');
    } catch (error) {
        console.error(`Error reading email template ${templateName}:`, error);
        return `Hello {{name}}, Your verification code is: {{otp}}.`;
    }
};

export const sendVerificationEmail = async (email: string, name: string, otp: string) => {
    if (!smtpConfig.host || !smtpConfig.auth.user || !smtpConfig.auth.pass) {
        console.error("Cannot send email: SMTP configuration is incomplete. Please check your environment variables.");
        console.log(`DEV ONLY: OTP for ${email}: ${otp}`);
        return;
    }

    try {
        const transporter = nodemailer.createTransport(smtpConfig);

        let htmlContent = readEmailTemplate('otp.html');
        htmlContent = htmlContent.replace(/{{name}}/g, name)
                                 .replace(/{{otp}}/g, otp)
                                 .replace(/{{appUrl}}/g, process.env.NEXT_PUBLIC_APP_URL || '')
                                 .replace(/{{privacyPolicyUrl}}/g, `${process.env.NEXT_PUBLIC_APP_URL}/privacy-policy` || '');

        const mailOptions = {
            from: `"${process.env.SMTP_SENDER_NAME || 'NovainHealth'}" <${process.env.SMTP_SENDER_EMAIL || smtpConfig.auth.user}>`,
            to: email,
            subject: "Verify Your NovainHealth Account",
            html: htmlContent,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully. Message ID:', info.messageId);

    } catch (error: any) {
        console.error('Error sending verification email:', JSON.stringify(error, null, 2));
        throw new Error('Failed to send verification email.');
    }
};
