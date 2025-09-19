
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

const sendEmail = async (mailOptions: nodemailer.SendMailOptions) => {
     if (!smtpConfig.host || !smtpConfig.auth.user || !smtpConfig.auth.pass) {
        console.error("Cannot send email: SMTP configuration is incomplete. Please check your environment variables.");
        console.log(`DEV ONLY: Email to ${mailOptions.to} with subject "${mailOptions.subject}" was not sent.`);
        return;
    }
    try {
        const transporter = nodemailer.createTransport(smtpConfig);
        const info = await transporter.sendMail({
            from: `"${process.env.SMTP_SENDER_NAME || 'NovainHealth'}" <${process.env.SMTP_SENDER_EMAIL || smtpConfig.auth.user}>`,
            ...mailOptions
        });
        console.log(`Email sent successfully to ${mailOptions.to}. Message ID:`, info.messageId);
    } catch (error) {
        console.error(`Error sending email to ${mailOptions.to}:`, JSON.stringify(error, null, 2));
        throw new Error('Failed to send email.');
    }
}

export const sendVerificationEmail = async (email: string, name: string, otp: string) => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    const appLogoUrl = `${appUrl}logo.png`;

    let htmlContent = readEmailTemplate('otp.html');
    htmlContent = htmlContent.replace(/{{name}}/g, name)
                                .replace(/{{otp}}/g, otp)
                                .replace(/{{appUrl}}/g, appUrl)
                                .replace(/{{appLogoUrl}}/g, appLogoUrl)
                                .replace(/{{privacyPolicyUrl}}/g, `${appUrl}privacy-policy`);

    await sendEmail({
        to: email,
        subject: "Verify Your NovainHealth Account",
        html: htmlContent,
    });
};

type AppointmentEmailPayload = {
    patient: { name: string, email: string };
    doctor: { name: string, email: string };
    appointmentDate: string;
    appointmentTime: string;
    appointmentId: string;
}

export const sendAppointmentRequestEmails = async (payload: AppointmentEmailPayload) => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    const appLogoUrl = `${appUrl}logo.png`;
    const commonValues = {
        appUrl,
        appLogoUrl,
        privacyPolicyUrl: `${appUrl}privacy-policy`,
        appointmentDate: payload.appointmentDate,
        appointmentTime: payload.appointmentTime,
    };

    // Patient Email
    let patientHtml = readEmailTemplate('appointment-request-patient.html');
    patientHtml = patientHtml.replace(/{{patientName}}/g, payload.patient.name)
                             .replace(/{{doctorName}}/g, payload.doctor.name)
                             .replace(/{{appUrl}}/g, commonValues.appUrl)
                             .replace(/{{appLogoUrl}}/g, commonValues.appLogoUrl)
                             .replace(/{{privacyPolicyUrl}}/g, commonValues.privacyPolicyUrl)
                             .replace(/{{appointmentDate}}/g, commonValues.appointmentDate)
                             .replace(/{{appointmentTime}}/g, commonValues.appointmentTime);
    
    await sendEmail({
        to: payload.patient.email,
        subject: "Your Appointment Request has been Sent",
        html: patientHtml,
    });

    // Doctor Email
    let doctorHtml = readEmailTemplate('appointment-request-doctor.html');
    doctorHtml = doctorHtml.replace(/{{doctorName}}/g, payload.doctor.name)
                           .replace(/{{patientName}}/g, payload.patient.name)
                           .replace(/{{dashboardUrl}}/g, `${appUrl}doctor/appointments`)
                           .replace(/{{appUrl}}/g, commonValues.appUrl)
                           .replace(/{{appLogoUrl}}/g, commonValues.appLogoUrl)
                           .replace(/{{privacyPolicyUrl}}/g, commonValues.privacyPolicyUrl)
                           .replace(/{{appointmentDate}}/g, commonValues.appointmentDate)
                           .replace(/{{appointmentTime}}/g, commonValues.appointmentTime);

     await sendEmail({
        to: payload.doctor.email,
        subject: "New Appointment Request",
        html: doctorHtml,
    });
}

type AppointmentConfirmedPayload = {
    patient: { name: string, email: string };
    doctorName: string;
    appointmentDate: string;
    appointmentTime: string;
}

export const sendAppointmentConfirmedEmail = async (payload: AppointmentConfirmedPayload) => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    let htmlContent = readEmailTemplate('appointment-confirmed-patient.html');
    htmlContent = htmlContent.replace(/{{patientName}}/g, payload.patient.name)
                             .replace(/{{doctorName}}/g, payload.doctorName)
                             .replace(/{{appointmentDate}}/g, payload.appointmentDate)
                             .replace(/{{appointmentTime}}/g, payload.appointmentTime)
                             .replace(/{{appUrl}}/g, appUrl)
                             .replace(/{{appLogoUrl}}/g, `${appUrl}logo.png`)
                             .replace(/{{privacyPolicyUrl}}/g, `${appUrl}privacy-policy`);

    await sendEmail({
        to: payload.patient.email,
        subject: "Your Appointment is Confirmed!",
        html: htmlContent,
    });
};

type AppointmentRescheduledPayload = {
    patient: { name: string, email: string };
    doctorName: string;
    appointmentDate: string;
    appointmentTime: string;
}

export const sendAppointmentRescheduledEmail = async (payload: AppointmentRescheduledPayload) => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    let htmlContent = readEmailTemplate('appointment-rescheduled-patient.html');
    htmlContent = htmlContent.replace(/{{patientName}}/g, payload.patient.name)
                             .replace(/{{doctorName}}/g, payload.doctorName)
                             .replace(/{{appointmentDate}}/g, payload.appointmentDate)
                             .replace(/{{appointmentTime}}/g, payload.appointmentTime)
                             .replace(/{{appUrl}}/g, appUrl)
                             .replace(/{{appLogoUrl}}/g, `${appUrl}logo.png`)
                             .replace(/{{privacyPolicyUrl}}/g, `${appUrl}privacy-policy`);

    await sendEmail({
        to: payload.patient.email,
        subject: "Your Appointment Change Request has been Submitted",
        html: htmlContent,
    });
};


type AppointmentCancelledPayload = {
    patient: { name: string, email: string };
    doctorName: string;
    appointmentDate: string;
    appointmentTime: string;
    reason: string;
}

export const sendAppointmentCancelledEmail = async (payload: AppointmentCancelledPayload) => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    let htmlContent = readEmailTemplate('appointment-cancelled-patient.html');
    htmlContent = htmlContent.replace(/{{patientName}}/g, payload.patient.name)
                             .replace(/{{doctorName}}/g, payload.doctorName)
                             .replace(/{{appointmentDate}}/g, payload.appointmentDate)
                             .replace(/{{appointmentTime}}/g, payload.appointmentTime)
                             .replace(/{{reason}}/g, payload.reason)
                             .replace(/{{appUrl}}/g, appUrl)
                             .replace(/{{appLogoUrl}}/g, `${appUrl}logo.png`)
                             .replace(/{{privacyPolicyUrl}}/g, `${appUrl}privacy-policy`);

    await sendEmail({
        to: payload.patient.email,
        subject: "Your Appointment Has Been Cancelled",
        html: htmlContent,
    });
};
