const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const sendEmail = async (recipients, subject, htmlMessage, attachments) => {
    try {
        // Read the HTML file
        const emailTemplatePath = await path.join(__dirname, '..', 'email', htmlMessage.filename);
        const emailTemplate = await fs.readFileSync(emailTemplatePath, 'utf-8');
        const html = ejs.render(emailTemplate, htmlMessage.options);

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS
            }
        });

        const promises = recipients.map(async (recipient) => {
            const mailOptions = {
                from: process.env.EMAIL_ID,
                to: recipient,
                subject: `${subject}`,
                html,
            };
            if (attachments?.length) mailOptions.attachments = attachments

            // const info = await transporter.sendMail(mailOptions);

            await transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                } else {
                }
            });

            // console.log('Email sent to', recipient, ':', info.response);
            return true;
        });

        await Promise.all(promises);
        return true;
    } catch (error) {
        console.log('Error sending email:', error.message);
        throw new Error('Error sending email',error.message);
    }
};


module.exports = { sendEmail };
