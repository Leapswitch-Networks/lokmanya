const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const env = require('@/configs/constant');
const { v4: uuidv4 } = require('uuid');
const Doctor = require('@/app/models/DoctorModal.js');
const multer = require('multer');
const path = require('path');
// const { Op, Sequelize, fn, literal, where  } = require('sequelize');
const fs = require('fs');

const Leads = require('@/app/models/Leads.js');
const Category = require('@/app/models/Category.js');
const videos = require('../models/videos');



// Define storage for the images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/videos/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
// Upload parameters for multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // limit file size to 5MB
    }
});



const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'videos');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}




exports.addVideo = async (req, res) => {
    upload.fields([{ name: 'thumbnil_image', maxCount: 1 }])(req, res, async (err) => {

        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        try {
            const { title, slug, doctor, publish_date, status, videoUrl } = req.body;
            const thumbnil_image = req.files['thumbnil_image']
                ? req.files['thumbnil_image'][0].path.replace(/^public/, '')
                : null;
            const newvideos = await videos.create({
                title,
                slug,
                thumbnil_image,
                publish_date,
                related_doctor: doctor,
                status,
                videoUrl

            });

            res.status(201).json({ message: 'video created successfully', videos: newvideos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    });
};

exports.updateVideo = async (req, res) => {
    const { id } = req.query;
    upload.fields([{ name: 'thumbnil_image', maxCount: 1 }])(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        try {
            const { title, doctor, publish_date, status, videoUrl } = req.body;
            let thumbnil_image = req.files['thumbnil_image']
                ? req.files['thumbnil_image'][0].path.replace(/^public/, '')
                : null;

            // Find the existing video to get the current image path
            const existingVideo = await videos.findOne({ where: { id } });

            if (!existingVideo) {
                return res.status(404).json({ message: 'Video not found' });
            }

            if (thumbnil_image) {
                // Delete the old image if a new one is uploaded
                if (existingVideo.thumbnil_image) {
                    fs.unlink(path.join('public', existingVideo.thumbnil_image), (err) => {
                        if (err) {
                            console.error('Failed to delete old image:', err);
                        }
                    });
                }
            } else {
                thumbnil_image = existingVideo.thumbnil_image;
            }

            const updatedVideo = await videos.update(
                {
                    title,
                    thumbnil_image,
                    publish_date,
                    related_doctor: doctor,
                    status,
                    videoUrl
                },
                { where: { id } }
            );

            if (updatedVideo[0] === 0) {
                return res.status(404).json({ message: 'Video not found' });
            }

            res.status(200).json({ message: 'Video updated successfully' });
        } catch (error) {
            console.error("Error updating video:", error.message);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    });
};


exports.getvideosbackend = async (req, res) => {

    try {
        const { related_doctor } = req.query;

        let filter = {};

        filter.status = "published";

        if (related_doctor) {
            filter.related_doctor = related_doctor;
        }

        const video = await videos.findAll({
            where: filter,
            order: [['id', 'DESC']]
        });

        // Check if no videos were found
        if (!Array.isArray(video) || video.length === 0) {
            return res.status(200).json([]);
        }


        // Set no-cache headers
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");

        res.status(200).json(video);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};





exports.getDoctorsblog = async (req, res) => {
    try {
        let filter = {};
        filter.publish = 'published';

        const doctors = await Doctor.findAll({
            where: filter,
            attribute: [['id', 'doctorName']],
            order: [['doctorName', 'ASC']],
        });

        // Set no-cache headers
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.status(200).json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};



exports.getvideosById = async (req, res) => {
    const { id } = req.query;

    try {
        const video = await videos.findByPk(id);

        if (!video) {
            return res.status(404).json({ message: 'videos not found' });
        }
        // Set no-cache headers
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.status(200).json(video);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};



exports.addLeadBlog = async (req, res) => {
    try {
        const { branch, location, cityId, patientName, mobileNumber, slug, query, leadId } = req.body;



        // Validation: Collect errors for missing fields and format issues
        const errors = {};

        // if (!branch) errors.branch = "Branch  is required.";
        // if (!cityId) errors.cityId = "City  is required.";
        if (!patientName) {
            errors.patientName = "Patient Name is required.";
        } else if (!/^[a-zA-Z\s]+$/.test(patientName)) {
            errors.patientName = "Patient Name must only contain alphabets.";
        }

        if (!mobileNumber) {
            errors.mobileNumber = "Mobile Number is required.";
        } else if (!/^\d+$/.test(mobileNumber)) {
            errors.mobileNumber = "Mobile Number must only contain digits.";
        } else if (mobileNumber.length !== 10) {
            errors.mobileNumber = "Mobile Number must be exactly 10 digits.";
        }


        // If there are errors, return a 400 response with the error messages
        if (Object.keys(errors).length > 0) {
            console.log("errors", errors);
            return res.status(400).json({ message: "Validation failed", errors });
        }

        const type = "blog";

        const newBlogLead = await Leads.create({
            areaId: branch,
            patientName,
            mobileNumber,
            message: query,
            type,
            slug,
            location
            // status: '0',
        });

        if (leadId) {
            const dropUpRecord = await DropUp.findOne({ where: { id: leadId } });
            if (dropUpRecord) {
                await DropUp.destroy({ where: { id: leadId } });
            }
        }

        // Send the lead email with attachments (cover letter and resume)
        const emailResult = await sendLeadEmail({
            patientName,
            mobileNumber,
            message: query,
            location
        });


        res.status(201).json({ message: "Lead created successfully", Lead: newBlogLead });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};



exports.deleteVideos = async (req, res) => {
    const { id } = req.query;

    try {
        const data = await videos.findByPk(id); // Fetch doctor by primary key (ID)

        if (!data) {
            return res.status(404).json({ message: 'Videos not found' });
        }


        // Directory where images are stored
        const uploadsDir = path.join(__dirname, '..');

        // Delete associated images if they exist
        if (data.thumbnil_image) {
            const imagePath = path.join(uploadsDir, data.thumbnil_image);


            // Delete the images if they exist
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

        }


        await data.destroy(); // Delete the doctor from the database

        res.status(200).json({ message: 'Videos deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};



const nodemailer = require("nodemailer");
const { Op } = require('sequelize');
const DropUp = require('../models/dropup');


// Function to send an email with attachments
const sendLeadEmail = async ({ patientName, mobileNumber, message, location }) => {
    try {

        // Configure the SMTP transporter
        const transporter = nodemailer.createTransport({
            host: "mail.lokmanyahospitals.com",
            port: 465,
            secure: true,
            auth: {
                user: "care@lokmanyahospitals.com",
                pass: "Welcome@123",
            },
            tls: {
                rejectUnauthorized: false
            },    // ✅ See the conversation
        });

        // Prepare the email content

        const htmlContent = `
    <table role="presentation" style="width: 600px;border-collapse: collapse;border: 1px solid;">
    <tbody style="background: #fff; border-bottom:1px solid;">
      <tr>
        <td style="padding:10px 0;"><a href="https://lokmanyahospitals.com/" target="_blank" rel="noreferrer">
        <img src="https://lokmanyahospitals.com/uploads/Lokmanya-Logo.png" crossorigin="anonymous" style="height: 30px; margin-bottom: 0px;padding: 0px 15px;"></a>
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <td style="padding: 0px 15px;"><p>Hello Team,</p>  

        <p>We have received a "Request A Call Back!" enquiry from ${patientName}. Below are the details of the lead:</p>

        </td>
      </tr>
    </tbody>
  
    <tbody>

      <tr style="display: flex;border-top: 1px solid;">
        <th style="padding: 16px 12px;max-width: 100px;min-width: 100px;width: 100px;display: block;border-right: 1px solid;">Patient Name</th>
        <td style="padding: 16px 12px;max-width: calc(100% - 100px);min-width: calc(100% - 100px);width: calc(100% - 100px);display: block;"> ${patientName}</td>
      </tr>
      <tr style="display: flex;border-top: 1px solid;">
        <th style="padding: 16px 12px;max-width: 100px;min-width: 100px;width: 100px;display: block;border-right: 1px solid;">Mobile Number</th>
        <td style="padding: 16px 12px;max-width: calc(100% - 100px);min-width: calc(100% - 100px);width: calc(100% - 100px);display: block;"> ${mobileNumber}</td>
      </tr>
            <tr style="display: flex;border-top: 1px solid;">
        <th style="padding: 16px 12px;max-width: 100px;min-width: 100px;width: 100px;display: block;border-right: 1px solid;">Location</th>
        <td style="padding: 16px 12px;max-width: calc(100% - 100px);min-width: calc(100% - 100px);width: calc(100% - 100px);display: block;"> ${location}</td>
      </tr>
       </tr>
            <tr style="display: flex;border-top: 1px solid;">
        <th style="padding: 16px 12px;max-width: 100px;min-width: 100px;width: 100px;display: block;border-right: 1px solid;">Message</th>
        <td style="padding: 16px 12px;max-width: calc(100% - 100px);min-width: calc(100% - 100px);width: calc(100% - 100px);display: block;"> ${message}</td>
      </tr>

   
  
    </tbody>
  </table>
    `;


        // Set up the email options
        const mailOptions = {
            from: '"Lokmanya Hospitals" <care@lokmanyahospitals.com>', // Sender's details
            to: [
                "callcenterlokmanya@gmail.com",
                "callcenter24x7@lokmanyahospitals.com"
            ],
            cc: "swapnil.narake@lokmanyahospitals.in, dheeraj.desai@lokmanyahospitals.com",                          // CC email
            subject: "Lead Enquiry: Request A Call Back From Blog Page",                               // Email subject
            html: htmlContent,                                         // Email body                                             // Attachments
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        if (email) {
            const htmlContents = `<table role="presentation" style="width: 600px;border-collapse: collapse;border: 0px solid;">
    <tbody style="background: #fff; border-bottom:1px solid;">
      <tr>
      <td style="padding:10px 0;"><a href="https://lokmanyahospitals.com/" target="_blank" rel="noreferrer">
      <img src="https://lokmanyahospitals.com/uploads/Lokmanya-Logo.png" crossorigin="anonymous" style="height: 30px; margin-bottom: 0px;padding: 0px 15px;"></a>
      </td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <td style="padding: 0px 15px;">
          <p style="margin-top: 30px">Dear ${patientName},</p>
  
          <p>Thank you for booking an appointment with Lokmanya Hospitals. Our team will connect with you soon to confirm your appointment.</p>
  
          <p>Warm regards,<br>
          Lokmanya Hospitals
          </p>
        </td>
      </tr>
    </tbody>
  </table>`;

            // Set up the email options
            const mailOption = {
                from: '"Lokmanya Hospitals" <care@lokmanyahospitals.com>', // Sender's details
                to: ` ${email}`,
                subject: "Appointment Booking at Lokmanya Hospitals",             // Email subject
                html: htmlContents,                                       // Email body                                          
            };

            // Send the email
            await transporter.sendMail(mailOption);
        }

        console.log(`Email sent successfully: ${info.messageId}`);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send email", error };
    }
};
