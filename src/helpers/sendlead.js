
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

async function sendlead(subject, { filename, htmlMessage }) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 545,
        secure: true,

    });
    recipients = 'test@gmail.com';
    // Read the HTML template file
    const templatePath = path.join(__dirname, '..', 'email', filename); // Adjust the path to your template file
    const template = fs.readFileSync(templatePath, 'utf-8');

    // Replace placeholders with actual data
    let htmlContent = template;
    for (const key in htmlMessage) {
        htmlContent = htmlContent.replace(new RegExp(`{{${key}}}`, 'g'), htmlMessage[key]);
    }

    // Send email
    await transporter.sendMail({
        from: 'test@gmail.com',
        to: 'test@gmail.com',
        cc: 'test@gmail.com',
        subject: subject,
        html: htmlContent
    });
}

module.exports = {
    sendlead,
    // other helper functions
};