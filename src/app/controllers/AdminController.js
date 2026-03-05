const leads = require('../models/Leads.js');
// const MasterModal = require('../models/masterdata.js');

// const Doctor = require('@/models/DoctorModal.js');
const Doctor = require('@/app/models/DoctorModal.js');
const MasterModal = require('@/app/models/MasterModal.js');
const sequelize = require('@/configs/database.js');
const { Op } = require('sequelize');
// const { sendlead } = require('@/app/helpers/sendlead.js');
const DropUp = require('../models/dropup.js');

const nodemailer = require("nodemailer");

// Function to send an email with attachments
const sendLeadEmail = async ({ patientName, mobileNumber, email, location, coverLetterPath, resumePath }) => {
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

        <p>We have received a "Book an Appointment" enquiry from ${patientName}. Below are the details of the lead:</p>

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
      // to: "test@gmail.com",
      cc: "swapnil.narake@lokmanyahospitals.in, dheeraj.desai@lokmanyahospitals.com",                          // CC email
      subject: "Lead Enquiry: Book an Appointment",                               // Email subject
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

// Function to add lead
exports.addLead = async (req, res) => {
  try {
    const {
      doctorId,
      areaId,
      cityId,
      speciality,
      email,
      patientName,
      mobileNumber,
      message,
      paymentType,
      selecteddate,
      location,
      coverLetterPath, // Assuming cover letter and resume paths are provided in the request body
      resumePath,
      formtype,
      slug,
      leadId
    } = req.body;


    // let type; // Declare type outside to ensure it's accessible in all conditions

    //   if (formtype == "Book Appointment") {
    //       type = "book_appointment";
    //   } else if (formtype == "Book Health Checkup") {
    //       type = "health_checkup";
    //   } else if (formtype == "Book a Lab Test") {
    //       type = "lab_test"; 
    //   }
    //   else if (formtype == "Second Opinion") {
    //     type = "second_opinion"; 
    // }



    // Create a new doctor lead
    const newDoctorLead = await leads.create({
      doctorId,
      email,
      patientName,
      mobileNumber,
      speciality,
      message,
      paymentType,
      type: formtype,
      cityId,
      areaId,
      location,
      slug
      // status: '0', // Uncomment if you want to add a status field
    });

    if (leadId) {
      const dropUpRecord = await DropUp.findOne({ where: { id: leadId } });
      if (dropUpRecord) {
        await DropUp.destroy({ where: { id: leadId } });
        console.log(`DropUp record with id ${leadId} deleted.`);
      }
    }

    // Send the lead email with attachments (cover letter and resume)
    const emailResult = await sendLeadEmail({
      patientName,
      mobileNumber,
      selecteddate,
      location
    });

    if (!emailResult.success) {
      // If email fails, return an error
      return res.status(500).json({ message: "Failed to send email", error: emailResult.error });
    }

    // Return success response
    res.status(201).json({ message: 'Lead created successfully', Lead: newDoctorLead.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};



// Function to add lead
exports.addLeadkneereplacement = async (req, res) => {
  try {
    const {
      city,
      doctor,
      fullName,
      phoneNumber
    } = req.body;

    // Send the lead email with attachments (cover letter and resume)
    const emailResult = await sendLeadEmailkneereplacement({
      patientName: fullName,
      mobileNumber: phoneNumber,
      doctor,
      location: city
    });

    if (!emailResult.success) {
      // If email fails, return an error
      return res.status(500).json({ message: "Failed to send email", error: emailResult.error });
    }

    // Return success response
    res.status(201).json({ message: 'Lead created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};



// Function to send an email with attachments
const sendLeadEmailkneereplacement = async ({ patientName, mobileNumber, doctor, location }) => {
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

        <p>We have received a "Book an Appointment" enquiry from ${patientName}. Below are the details of the lead:</p>

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
        <th style="padding: 16px 12px;max-width: 100px;min-width: 100px;width: 100px;display: block;border-right: 1px solid;">Doctor</th>
        <td style="padding: 16px 12px;max-width: calc(100% - 100px);min-width: calc(100% - 100px);width: calc(100% - 100px);display: block;"> ${doctor}</td>
      </tr>

            <tr style="display: flex;border-top: 1px solid;">
        <th style="padding: 16px 12px;max-width: 100px;min-width: 100px;width: 100px;display: block;border-right: 1px solid;">City</th>
        <td style="padding: 16px 12px;max-width: calc(100% - 100px);min-width: calc(100% - 100px);width: calc(100% - 100px);display: block;"> ${location}</td>
      </tr>

   
  
    </tbody>
  </table>
    `;


    // Set up the email options
    const mailOptions = {
      from: '"Lokmanya Hospitals" <care@lokmanyahospitals.com>', // Sender's details
      // to: "test@gmail.com",
      to: [
        "callcenterlokmanya@gmail.com",
        "callcenter24x7@lokmanyahospitals.com"
      ],
      cc: "swapnil.narake@lokmanyahospitals.in, dheeraj.desai@lokmanyahospitals.com",
      subject: "Lead Enquiry: knee replacement (Book an Appointment)",                               // Email subject
      html: htmlContent,                                         // Email body                                             // Attachments
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email", error };
  }
};


const sendLeadEmailcareear = async ({ patientName, mobileNumber, email, selecteddate, coverLetterPath, resumePath }) => {
  try {
    //console.log('Selected date:', selecteddate);

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

	<p>We have received a resume for the job, Below are the details</p>

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
    

 

</tbody>
</table>
`;


    // Prepare the attachments dynamically based on available file paths
    const attachments = [];
    if (coverLetterPath) {
      attachments.push({
        filename: "CoverLetter.pdf",  // Attachment name for the cover letter
        path: coverLetterPath,        // Path to the cover letter file
      });
    }
    if (resumePath) {
      attachments.push({
        filename: "Resume.pdf",       // Attachment name for the resume
        path: resumePath,             // Path to the resume file
      });
    }

    // Set up the email options
    const mailOptions = {
      from: '"Lokmanya Hospitals" <care@lokmanyahospitals.com>', // Sender's details
      // to: "test@gmail.com",
      to: "pankaj.acharya@lokmanyahospitals.in",
      cc: "swapnil.narake@lokmanyahospitals.in, dheeraj.desai@lokmanyahospitals.com",                          // CC email
      subject: "Careers page enquiry",                               // Email subject
      html: htmlContent,                                         // Email body
      attachments,                                               // Attachments (only if provided)
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

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
  
          <p>Thankyou. for applying at Lokmanya Hospitals, Someone from our HR team will connect with you soon</p>
  
          <p>Warm regards,<br>
          Lokmanya Hospitals
          </p>
        </td>
      </tr>
    </tbody>
  </table>`;


    // Set up the email options
    // const mailOption = {
    //   from: '"Lokmanya Hospitals" <Care@lokmanyahospitals.com>', // Sender's details
    //   to: ` ${email}`,                        // CC email
    //   subject: "Applying for job at Lokmanya Hospitals",                               // Email subject
    //   html: htmlContents,                                         // Email body                                              // Attachments (only if provided)
    // };

    // Send the email
    // await transporter.sendMail(mailOption);

    console.log(`Email sent successfully: ${info.messageId}`);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email", error };
  }
};

const sendLeadEmailCourse = async ({ patientName, mobileNumber, email, courseName, resumePath }) => {
  try {
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

    // Email content to HR team
    const htmlContent = `
<table style="width: 600px; border-collapse: collapse; border: 1px solid;">
<tbody style="background: #fff; border-bottom: 1px solid;">
  <tr>
    <td style="padding:10px 0;">
      <a href="https://lokmanyahospitals.com/" target="_blank" rel="noreferrer">
        <img src="https://lokmanyahospitals.com/uploads/Lokmanya-Logo.png" style="height: 30px; padding: 0 15px;">
      </a>
    </td>
  </tr>
</tbody>
<tbody>
  <tr>
    <td style="padding: 0px 15px;">
      <p>Hello Team,</p>
      <p>We have received a course enquiry. Details are below:</p>
    </td>
  </tr>
</tbody>
<tbody>
  <tr style="display: flex; border-top: 1px solid;">
    <th style="padding: 10px; width: 120px; border-right: 1px solid;">Name</th>
    <td style="padding: 10px;">${patientName}</td>
  </tr>
  <tr style="display: flex; border-top: 1px solid;">
    <th style="padding: 10px; width: 120px; border-right: 1px solid;">Mobile</th>
    <td style="padding: 10px;">${mobileNumber}</td>
  </tr>
  <tr style="display: flex; border-top: 1px solid;">
    <th style="padding: 10px; width: 120px; border-right: 1px solid;">Email</th>
    <td style="padding: 10px;">${email}</td>
  </tr>
  <tr style="display: flex; border-top: 1px solid;">
    <th style="padding: 10px; width: 120px; border-right: 1px solid;">Course</th>
    <td style="padding: 10px;">${courseName}</td>
  </tr>
</tbody>
</table>
`;

    const attachments = [];
    if (resumePath) {
      attachments.push({
        filename: "Resume.pdf",
        path: resumePath,
      });
    }

    const mailOptions = {
      from: '"Lokmanya Hospitals" <care@lokmanyahospitals.com>',
      to: "academics.lokmanya@lokmanyahospitals.com",
      // to: "h2001.laxmidhar@gmail.com",
      cc: "",
      subject: "Course Enquiry Submission",
      html: htmlContent,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    // Optional: Email to applicant
    const applicantMailOptions = {
      from: '"Lokmanya Hospitals" <care@lokmanyahospitals.com>',
      to: email,
      subject: "Your Course Enquiry at Lokmanya Hospitals",
      html: `
        <p>Dear ${patientName},</p>
        <p>Thank you for applying for the course: <strong>${courseName}</strong>.</p>
        <p>Our team will get back to you shortly.</p>
        <p>Regards,<br>Lokmanya Hospitals</p>
      `
    };
    await transporter.sendMail(applicantMailOptions);

    return { success: true };
  } catch (error) {
    console.error("Error sending course enquiry email:", error);
    return { success: false, error };
  }
};


const multer = require('multer');
const path = require('path');

// Set storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Change this to where you want to store files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique file name
  }
});

// Initialize multer upload
const upload = multer({ storage: storage });


exports.addLeadcareear = async (req, res) => {
  try {
    // Use upload.fields() to handle multiple files (coverLetter and resume)
    upload.fields([{ name: 'coverLetter', maxCount: 1 }, { name: 'resume', maxCount: 1 }])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'File upload error', error: err.message });
      }

      // Extract form data from req.body (non-file data)
      const { doctorId, areaId, cityId, location, speciality, email, patientName, mobileNumber, message, paymentType, selecteddate, leadId } = req.body;

      // Extract file paths from req.files
      const coverLetterPath = req.files.coverLetter ? req.files.coverLetter[0].path : null;
      const resumePath = req.files.resume ? req.files.resume[0].path : null;


      const type = "careers";

      // Create a new doctor lead
      const newDoctorLead = await leads.create({
        doctorId,
        email,
        patientName,
        mobileNumber,
        speciality,
        message,
        paymentType,
        type,
        cityId,
        areaId,
        location,
        // status: '0', // Uncomment if you want to add a status field
      });

      if (leadId) {
        const dropUpRecord = await DropUp.findOne({ where: { id: leadId } });
        if (dropUpRecord) {
          await DropUp.destroy({ where: { id: leadId } });
        }
      }
      // Send the lead email with attachments (cover letter and resume)
      const emailResult = await sendLeadEmailcareear({
        patientName,
        mobileNumber,
        selecteddate,
        email,
        coverLetterPath,
        resumePath
      });

      if (!emailResult.success) {
        // If email fails, return an error
        return res.status(500).json({ message: "Failed to send email", error: emailResult.error });
      }

      // Return success response
      res.status(201).json({ message: 'Lead created successfully', Lead: newDoctorLead.id });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

exports.addLeadCourse = async (req, res) => {
  try {

    upload.single('resume')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'File upload error', error: err.message });
      }


      const { patientName, mobileNumber, email, courseName } = req.body;

      const resumePath = req.file ? req.file.path : null;

      const type = "course";
      console.log('REQ BODY:', req.body);
      console.log('PATIENT NAME:', patientName);
      console.log('MOBILE NUMBER:', mobileNumber);
      console.log('EMAIL:', email);
      console.log('COURSE NAME:', courseName);
      console.log('TYPE:', type);
      // Store lead in DB
      const newLead = await leads.create({
        patientName,
        mobileNumber,
        email,
        courseName,
        type
      });

      // Send lead email
      const emailResult = await sendLeadEmailCourse({
        patientName,
        mobileNumber,
        email,
        courseName,
        resumePath
      });

      if (!emailResult.success) {
        return res.status(500).json({ message: "Failed to send email", error: emailResult.error });
      }

      res.status(201).json({ message: 'Lead created successfully', Lead: newLead.id });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};


exports.getLead = async (req, res) => {
  try {
    // Extract query parameters
    const { startdate, enddate, type, area, location, paymentType, status } = req.query;

    // Construct the where clause dynamically
    const whereClause = {};
    // if (area) whereClause.areaId = area;
    // if (location) whereClause.cityId = location;
    // if (paymentType) whereClause.paymentType = paymentType;
    if (type) whereClause.type = type;
    if (status) whereClause.status = status;
    // Add date range filter for createdAt column
    if (startdate && enddate) {

      const formatDateTime = (date, isEnd) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const time = isEnd ? '23:59:59' : '00:00:00';
        return `${year}-${month}-${day} ${time}`;
      };

      const startDate = new Date(startdate);
      const endDate = new Date(enddate);

      const formattedStartDate = formatDateTime(startDate, false);
      const formattedEndDate = formatDateTime(endDate, true);

      whereClause.updatedAt = { [Op.between]: [formattedStartDate, formattedEndDate] };
    }

    // Fetch records with the constructed where clause
    const doctorsLeads = await leads.findAll({
      order: [
        ['id', 'DESC']
      ],
      where: whereClause,
      include: [
        {
          model: MasterModal,
          as: 'Area',
          on: {
            col1: sequelize.where(sequelize.col("Area.id"), "=", sequelize.col("leads.areaId"))
          },
          required: false
        },
        {
          model: MasterModal,
          as: 'City',
          on: {
            col2: sequelize.where(sequelize.col("City.id"), "=", sequelize.col("leads.cityId")),
          },
          required: false
        },


        {
          model: Doctor,
          as: 'Doctor',
          on: {
            col1: sequelize.where(sequelize.col("Doctor.id"), "=", sequelize.col("leads.doctorId")),
          },
          required: false
        },

      ],

    });
    // Set no-cache headers
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.status(200).json(doctorsLeads);
  } catch (error) {
    console.error('Error fetching doctors leads:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};




exports.getLeadDropUp = async (req, res) => {
  try {
    // Extract query parameters
    const { startdate, enddate, type, area, location, paymentType, status } = req.query;

    // Construct the where clause dynamically
    const whereClause = {};
    // if (area) whereClause.areaId = area;
    // if (location) whereClause.cityId = location;
    // if (paymentType) whereClause.paymentType = paymentType;
    if (type) whereClause.type = type;
    if (status) whereClause.status = status;
    // Add date range filter for createdAt column
    if (startdate && enddate) {

      const formatDateTime = (date, isEnd) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const time = isEnd ? '23:59:59' : '00:00:00';
        return `${year}-${month}-${day} ${time}`;
      };

      const startDate = new Date(startdate);
      const endDate = new Date(enddate);

      const formattedStartDate = formatDateTime(startDate, false);
      const formattedEndDate = formatDateTime(endDate, true);

      whereClause.updatedAt = { [Op.between]: [formattedStartDate, formattedEndDate] };
    }

    // Fetch records with the constructed where clause
    const doctorsLeads = await DropUp.findAll({
      order: [
        ['id', 'DESC']
      ],
      where: whereClause,
      include: [
        {
          model: MasterModal,
          as: 'Area',
          on: {
            col1: sequelize.where(sequelize.col("Area.id"), "=", sequelize.col("dropup.areaId"))
          },
          required: false
        },
        {
          model: MasterModal,
          as: 'City',
          on: {
            col2: sequelize.where(sequelize.col("City.id"), "=", sequelize.col("dropup.cityId")),
          },
          required: false
        },


        {
          model: Doctor,
          as: 'Doctor',
          on: {
            col1: sequelize.where(sequelize.col("Doctor.id"), "=", sequelize.col("dropup.doctorId")),
          },
          required: false
        },

      ],

    });
    // Set no-cache headers
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.status(200).json(doctorsLeads);
  } catch (error) {
    console.error('Error fetching doctors leads:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


exports.getCity = async (req, res) => {
  try {
    const educations = await MasterModal.findAll({
      where: { type: 'city' }
    });

    if (!educations || educations.length === 0) {
      return res.status(404).json({ message: 'No City found' });
    }
    // Set no-cache headers
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.status(200).json(educations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

exports.getArea = async (req, res) => {
  try {
    const areas = await MasterModal.findAll({
      where: { type: 'area' },
      order: [['id', 'ASC']]
    });

    if (!areas || areas.length === 0) {
      return res.status(404).json({ message: 'No areas found' });
    }

    res.status(200).json({ message: 'Areas fetched successfully', data: areas });
  } catch (error) {
    console.error('Error fetching areas:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


// Function to send an email
const sendLeadEmailDoctor = async ({ doctorname, patientName, mobileNumber, areaName }) => {
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

      <p>We have received a "Book an Appointment" enquiry from ${patientName}. Below are the details of the lead:</p>
    
      </td>
      </tr>
    </tbody>
  
    <tbody>
      <tr style="display: flex;border-top: 1px solid;">
        <th style="padding: 16px 12px;max-width: 100px;min-width: 100px;width: 100px;display: block;border-right: 1px solid;">Doctor Name</th>
        <td style="padding: 16px 12px;max-width: calc(100% - 100px);min-width: calc(100% - 100px);width: calc(100% - 100px);display: block;"> ${doctorname}</td>
      </tr>
      <tr style="display: flex;border-top: 1px solid;">
        <th style="padding: 16px 12px;max-width: 100px;min-width: 100px;width: 100px;display: block;border-right: 1px solid;">Patient Name</th>
        <td style="padding: 16px 12px;max-width: calc(100% - 100px);min-width: calc(100% - 100px);width: calc(100% - 100px);display: block;"> ${patientName}</td>
      </tr>
      <tr style="display: flex;border-top: 1px solid;">
        <th style="padding: 16px 12px;max-width: 100px;min-width: 100px;width: 100px;display: block;border-right: 1px solid;">Mobile Number</th>
        <td style="padding: 16px 12px;max-width: calc(100% - 100px);min-width: calc(100% - 100px);width: calc(100% - 100px);display: block;"> ${mobileNumber}</td>
      </tr>      
      <tr style="display: flex;border-top: 1px solid;">
        <th style="padding: 16px 12px;max-width: 100px;min-width: 100px;width: 100px;display: block;border-right: 1px solid;">Location Name</th>
        <td style="padding: 16px 12px;max-width: calc(100% - 100px);min-width: calc(100% - 100px);width: calc(100% - 100px);display: block;"> ${areaName}</td>
      </tr>

    </tbody>
  </table>
    `;

    // Set up the email options
    const mailOptions = {
      from: '"Lokmanya Hospitals" <care@lokmanyahospitals.com>', // Sender's details
      // to: "test@gmail.com",
      to: [
        "callcenterlokmanya@gmail.com",
        "callcenter24x7@lokmanyahospitals.com"
      ],
      cc: "swapnil.narake@lokmanyahospitals.in, dheeraj.desai@lokmanyahospitals.com",
      subject: `Book an Appointment enquire for ${doctorname}`,                               // Email subject
      html: htmlContent,                                         // Email body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log(`Email sent successfully: ${info.messageId}`);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email", error };
  }
};

// Controller function to add a lead for a doctor
exports.addLeadDoctor = async (req, res) => {
  try {
    const { doctorId, patientName, mobileNumber, areaId, email, leadId } = req.body;
    console.log('leadId', leadId);

    // Validate input
    if (!patientName || !mobileNumber) {
      return res.status(400).json({ message: "Patient name and mobile number are required." });
    }
    const doctor = await Doctor.findOne({ where: { id: doctorId } });
    const doctorname = doctor.doctorName;

    const area = await MasterModal.findOne({ where: { id: areaId } });
    const areaName = area.masterName;

    const type = "doctor";

    // Create a new doctor lead
    const newDoctorLead = await leads.create({
      doctorId,
      patientName,
      mobileNumber,
      areaId,
      type,
      email,
    });

    // ✅ Check if leadId is provided -> delete from DropUp table
    if (leadId) {
      const dropUpRecord = await DropUp.findOne({ where: { id: leadId } });
      if (dropUpRecord) {
        await DropUp.destroy({ where: { id: leadId } });
        console.log(`DropUp record with id ${leadId} deleted.`);
      }
    }


    // Send the doctor appointment lead email
    const emailResult = await sendLeadEmailDoctor({ doctorname, patientName, mobileNumber, areaName });

    // if (!emailResult.success) {
    //   // If email fails, log the error but allow lead creation to succeed
    //   console.error("Email sending failed:", emailResult.error);
    //   return res.status(500).json({ message: "Lead created, but email failed to send", error: emailResult.error });
    // }

    // Return success response
    res.status(201).json({ message: "Lead created successfully", leadId: newDoctorLead.id });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};


// Function to send an email
const sendLeadEmailContactus = async ({ areaId, email, patientName, mobileNumber, message, type }) => {
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

    // Determine the lead type based on the 'type' parameter
    let leadType;
    let mailContent;
    let thankYou;
    let userSubject;
    switch (type) {
      case "Inquiry":
        leadType = "Lead Inquiry for Lokmanya Hospitals";
        mailContent = "We have received a lead, Below are the details of the lead:";
        userSubject = "Lead Inquiry for Lokmanya Hospitals";
        thankYou = "Thank you for your lead, Our team will connect with you soon";

        break;
      case "Feedback":
        leadType = "Feedback from user";
        mailContent = "We have received a feedback for our Hospital, Below are the details";
        userSubject = "Feedback for Lokmanya Hospitals";
        thankYou = "Thank you feedback for our Hospital, Our team will connect with you soon to discuss the matter";
        break;
      case "Complaint":
        leadType = "Complaint from user";
        mailContent = "We have received a complaint for our Hospital, Below are the details";
        userSubject = "Complaint for Lokmanya Hospitals";
        thankYou = "Thank you registering your complaint with us, Our team will connect with you soon to discuss the matter";
        break;
      case "International":
        leadType = `Book an Appointment enquiry from International Patient`;
        mailContent = `We have received a "Book an Appointment" from a International Patient. Below are the details of the lead:`;
        userSubject = "Appointment Booking at Lokmanya Hospitals";
        thankYou = "Thank you for booking an appointment with Lokmanya Hospitals. Our team will connect with you soon to confirm your appointment.";
        break;
      default:
        leadType = "Lead Inquiry for Lokmanya Hospitals";
        mailContent = "We have received a lead, Below are the details of the lead:";
        userSubject = "Lead Inquiry for Lokmanya Hospitals";
        thankYou = "Thank you for your lead, Our team will connect with you soon";
    }


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

	<p> ${mailContent}</p>

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
	<th style="padding: 16px 12px;max-width: 100px;min-width: 100px;width: 100px;display: block;border-right: 1px solid;">Email ID</th>
	<td style="padding: 16px 12px;max-width: calc(100% - 100px);min-width: calc(100% - 100px);width: calc(100% - 100px);display: block;"> ${email}</td>
  </tr>

  <tr style="display: flex;border-top: 1px solid;">
	<th style="padding: 16px 12px;max-width: 100px;min-width: 100px;width: 100px;display: block;border-right: 1px solid;">Hospital Name</th>
	<td style="padding: 16px 12px;max-width: calc(100% - 100px);min-width: calc(100% - 100px);width: calc(100% - 100px);display: block;"> ${areaId}</td>
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
      // to: "test@gmail.com",
      to: [
        "callcenterlokmanya@gmail.com",
        "callcenter24x7@lokmanyahospitals.com"
      ],
      cc: "swapnil.narake@lokmanyahospitals.in, dheeraj.desai@lokmanyahospitals.com",                          // CC email
      subject: `${leadType} Lead`,                              // Email subject
      html: htmlContent,                                         // Email body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);



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
  
          <p> ${thankYou}</p>
  
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
      to: ` ${email}`,                          // Recipient email
      subject: `${userSubject}`,                              // Email subject
      html: htmlContents,                                         // Email body
    };

    // Send the email
    await transporter.sendMail(mailOption);


    console.log(`Email sent successfully: ${info.messageId}`);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email", error };
  }
};

// Controller function to add a lead for a doctor
exports.addLeadContactus = async (req, res) => {
  try {
    const {
      areaId,
      email,
      patientName,
      mobileNumber,
      message,
      type,
      leadId
    } = req.body;

    // Validate input
    if (!patientName || !mobileNumber) {
      return res.status(400).json({ message: "Patient name and mobile number are required." });
    }
    // Create a new doctor lead
    const newDoctorLead = await leads.create({
      areaId,
      email,
      patientName,
      mobileNumber,
      message,
      type,
    });

    if (leadId) {
      const dropUpRecord = await DropUp.findOne({ where: { id: leadId } });
      if (dropUpRecord) {
        await DropUp.destroy({ where: { id: leadId } });
        console.log(`DropUp record with id ${leadId} deleted.`);
      }
    }

    const area = await MasterModal.findOne({ where: { id: areaId } });
    const areaName = area.masterName;

    // Send the doctor appointment lead email
    const emailResult = await sendLeadEmailContactus({
      areaId: areaName,
      email,
      patientName,
      mobileNumber,
      message,
      type,
    });

    if (!emailResult.success) {
      // If email fails, log the error but allow lead creation to succeed
      console.error("Email sending failed:", emailResult.error);
      return res.status(500).json({ message: "Lead created, but email failed to send", error: emailResult.error });
    }

    // Return success response
    res.status(201).json({ message: "Lead created successfully", leadId: newDoctorLead.id });

  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};


exports.createLead = async (req, res) => {
  const { patientName, formtype, doctor } = req.body;

  const newLead = await DropUp.create({ patientName, type: formtype, doctorId: doctor });
  res.status(201).json({ id: newLead.id });
};

//THIS API IS USE FOR DROPUP DATA UPDATE
exports.updateLead = async (req, res) => {
  const { id } = req.body;

  await DropUp.update(req.body, { where: { id } });
  res.status(200).json({ message: "Lead updated" });
};


exports.updateLeadstatus = async (req, res) => {
  const { id } = req.body;

  await leads.update(req.body, { where: { id } });
  res.status(200).json({ message: "Lead updated" });
};