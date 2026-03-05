const leads = require('@/app/models/Leads.js');
// const MasterModal = require('@/app/models/MasterModal.js');
// const { sendError, sendResponse, sendEmail, checkModules } = require('../helpers');
// const { sendlead } = require('@/app/helpers/sendlead.js');

const nodemailer = require("nodemailer");
const Doctor = require('@/app/models/DoctorModal.js');
const DoctorConditions = require('@/app/models/DoctorConditions.js');
const MasterModal = require('@/app/models/MasterModal.js');
const sequelize = require('@/configs/database');
const { Sequelize, Op } = require('sequelize');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { sendResponse, sendError } = require('@/helpers/handleResponse.js');
const Blog = require('@/app/models/Blog.js');
const DoctorsLead = require('@/app/models/Leads.js');
const HyperLocal = require('../models/HyperLocal');
const DropUp = require('../models/dropup');
const MasterModuleModal = require('../models/MasterModuleModal');




exports.getDoctors = async (req, res) => {
    try {
        const { doctorName, city, area, specialty, education, status, searchTerm, opdTiming } = req.query;
        // const { opdTiming } = req.body;
        let filter = {};
        // If searchTerm is present, only apply search functionality
        if (searchTerm) {
            filter[Op.or] = [
                // { city: { [Op.like]: `%${searchTerm}%` } },
                { doctorName: { [Op.like]: `%${searchTerm}%` } },

            ];
        } else {
            // Apply filters only if searchTerm is not present
            if (city) {
                filter.city = { [Op.or]: city.split(',').map(val => ({ [Op.like]: `%${val}%` })) };
            }
            if (doctorName) {
                filter.doctorName = { [Op.or]: doctorName.split(',').map(val => ({ [Op.like]: `%${val}%` })) };
            }
            if (area) {
                filter.area = { [Op.or]: area.split(',').map(val => ({ [Op.like]: `%${val}%` })) };
            }
            // if (specialty) {
            //     filter.specialty = { [Op.or]: specialty.split(',').map(val => ({ [Op.like]: `%${val}%` })) };
            // }
            if (specialty) {
                const specialtiesArray = specialty.split(',');

                filter.specialty = {
                    [Op.or]: [
                        { [Op.eq]: specialty },  // Match the exact full string
                        ...specialtiesArray.map(val => ({
                            [Op.or]: [
                                { [Op.eq]: val },  // Match if the column contains only this value
                                { [Op.like]: `${val},%` },  // Match if the value is at the start
                                { [Op.like]: `%,${val},%` },  // Match if the value is in the middle
                                { [Op.like]: `%,${val}` }  // Match if the value is at the end
                            ]
                        }))
                    ]
                };
            }

            if (education) {
                filter.education = { [Op.or]: education.split(',').map(val => ({ [Op.like]: `%${val}%` })) };
            }

            if (opdTiming) {
                // Check if the provided day exists in the schedule and has status true
                filter[Op.and] = [
                    Sequelize.literal(`JSON_EXTRACT(opdTiming, "$.week[0].timings.${opdTiming}.status") = true`)
                ];
            }
            if (status) {
                filter.publish = status;
            }
        }

        const doctors = await Doctor.findAll({
            where: filter,
            order: [
                ['id', 'DESC']
            ]
        });

        if (!doctors || doctors.length === 0) {
            return res.status(200).json({ message: 'No doctors found' });
        }
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

exports.getDoctorById = async (req, res) => {
    const { id } = req.params;

    try {
        const doctor = await Doctor.findByPk(id); // Fetch doctor by primary key (ID)

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        // Set no-cache headers
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.status(200).json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};



// Define storage for the images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/doctors/');
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

// const uploadsDir = path.join(__dirname, '../uploads/doctors');
const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'doctors');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}



exports.addDoctor = async (req, res) => {
    upload.any()(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        try {
            const { description, blog_id, video_id, doctorSchema, metaTitle, metaDescription, city, experience, designation, mobile_no, doctorName, slug, department, specialty, education, area, opdTiming, publish, grade, faq, conditions, expertTagline } = req.body;
            // const featured_images = req.file ? req.file.path : null; // Save the image path
            const featured_images = req.files.find(file => file.fieldname === 'featured_images') ? req.files.find(file => file.fieldname === 'featured_images').path.replace(/^public/, '') : null; // remove 'public' from path

            const newDoctor = await Doctor.create({
                doctorName,
                slug,
                specialty,
                education,
                department,
                area,
                description,
                opdTiming,
                publish,
                featured_images,
                mobile_no,
                experience,
                designation,
                city,
                metaTitle,
                metaDescription,
                doctorSchema,
                blog_id,
                video_id,
                grade,
                faq,
                expertTagline

            });

            if (conditions) {
                const conditionsData = JSON.parse(conditions);
                for (const cond of conditionsData) {
                    const imageFile = req.files.find(file => file.fieldname === `condition_image_${cond.id}`);
                    const imagePath = imageFile ? imageFile.path.replace(/^public/, '') : null;
                    await DoctorConditions.create({
                        doctor_id: newDoctor.id,
                        name: cond.name,
                        image: imagePath
                    });
                }
            }

            res.status(201).json({ message: 'Doctor created successfully', doctor: newDoctor });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    });
};

exports.updateDoctor = (req, res) => {

    const { id } = req.query;
    upload.any()(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        try {
            let { grade, description, video_id, blog_id, doctorSchema, metaTitle, metaDescription, city, slug, experience, designation, doctorId, doctorName, department, specialty, education, area, opdTiming, publish, mobile_no, faqs, conditions, expertTagline } = req.body;
            // let featured_images = req.file ? req.file.path : null; // New image path
            let featured_images = req.files.find(file => file.fieldname === 'featured_images') ? req.files.find(file => file.fieldname === 'featured_images').path.replace(/^public/, '') : null; // remove 'public' from path


            area = area === 'null' || area === 'undefined' || area === null ? '' : area;
            mobile_no = mobile_no === 'null' || mobile_no === 'undefined' || mobile_no === null ? '' : mobile_no;


            // Find the existing doctor to get the current image path
            const doctor = await Doctor.findOne({ where: { id } });

            if (!doctor) {
                return res.status(404).json({ message: 'Doctor not found' });
            }

            if (featured_images) {
                // Delete the old image if a new one is uploaded
                if (doctor.featured_images) {
                    fs.unlink(path.join(process.cwd(), 'public', doctor.featured_images), (err) => {
                        if (err) {
                            console.error('Failed to delete old image:', err);
                        }
                    });
                }
            } else {
                // If no new image is uploaded, keep the existing image path
                featured_images = doctor.featured_images;
            }

            const updatedDoctor = await Doctor.update(
                {
                    doctorName,
                    specialty,
                    education,
                    department,
                    slug,
                    area,
                    opdTiming,
                    publish,
                    description,
                    featured_images,
                    experience,
                    designation,
                    city,
                    mobile_no,
                    metaTitle,
                    metaDescription,
                    doctorSchema,
                    blog_id,
                    video_id,
                    grade,
                    faq: faqs,
                    expertTagline
                },
                { where: { id } }
            );

            if (updatedDoctor[0] === 0) {
                return res.status(404).json({ message: 'Doctor not found' });
            }

            // Handle conditions
            if (conditions) {
                const conditionsData = JSON.parse(conditions);
                // Delete existing conditions
                await DoctorConditions.destroy({ where: { doctor_id: id } });
                // Create new conditions
                for (const cond of conditionsData) {
                    const imageFile = req.files.find(file => file.fieldname === `condition_image_${cond.id}`);
                    const imagePath = imageFile ? imageFile.path.replace(/^public/, '') : cond.image || null;
                    await DoctorConditions.create({
                        doctor_id: id,
                        name: cond.name,
                        image: imagePath
                    });
                }
            }

            res.status(200).json({ message: 'Doctor updated successfully' });
        } catch (error) {
            console.error(error.message);
            sendError(res, error);
            // res.status(500).json({ message: 'Internal Server Error', error });
        }
    });
};



exports.getDoctorslist = async (req, res) => {
    try {
        const { specialty, location, globalSearchVal, opdTiming } = req.query;
        let filter = {};
        const searchTerm = globalSearchVal;
        // Search functionality
        // if (searchTerm) {
        //     filter[Op.or] = [
        //         { doctorName: { [Op.like]: `%${searchTerm}%` } },
        //     ];
        // } 
        if (searchTerm) {
            filter[Op.or] = [
                { doctorName: { [Op.like]: `%${searchTerm}%` } },
                // Add other fields if needed
            ];
        }
        else {
            // Filter by specialty
            if (specialty) {
                const specialtiesArray = specialty.split(',');
                filter.specialty = {
                    [Op.or]: [
                        { [Op.eq]: specialty },
                        ...specialtiesArray.map(val => ({
                            [Op.or]: [
                                { [Op.eq]: val },
                                { [Op.like]: `${val},%` },
                                { [Op.like]: `%,${val},%` },
                                { [Op.like]: `%,${val}` }
                            ]
                        }))
                    ]
                };
            }

            // Filter by location in OPD timing
            if (location) {
                filter.opdTiming = {
                    [Op.or]: {
                        [Op.like]: `%"location":"${location}"%`
                    }
                };
            }
        }

        // Fetch doctors from database
        // const doctors = await Doctor.findAll({
        //     where: filter,
        //     order: [
        //         ['grade', 'ASC'],
        //         [Sequelize.literal('CAST(experience AS SIGNED)'), 'ASC'],
        //         ['doctorName', 'ASC']
        //     ],
        // });
        filter.publish = "published";

        const doctors = await Doctor.findAll({
            where: filter,
            order: [
                ['grade', 'ASC'],
                [Sequelize.literal('CAST(experience AS SIGNED)'), 'DESC'],
                ['doctorName', 'ASC']
            ],
            logging: console.log,
        });

        if (!doctors || doctors.length === 0) {
            return res.status(200).json({ message: 'No doctors found' });
        }

        // Extract and sanitize specialty IDs
        const specialtyIds = [
            ...new Set(
                doctors
                    .flatMap(doc => doc.specialty.split(','))
                    .map(id => parseInt(id, 10))
                    .filter(id => !isNaN(id)) // Filter out NaN values
            )
        ];

        // Fetch masterName for each specialty ID
        const specialties = await MasterModal.findAll({
            where: { id: specialtyIds },
            attributes: ['id', 'masterName']
        });

        const specialtiesMap = specialties.reduce((acc, item) => {
            acc[item.id] = item.masterName;
            return acc;
        }, {});

        // Add masterName to the response as a comma-separated string
        const doctorsWithSpecialties = doctors.map(doc => ({
            ...doc.toJSON(),
            specialtyNames: doc.specialty
                .split(',')
                .map(id => specialtiesMap[parseInt(id, 10)] || null)
                .filter(Boolean) // Remove null values
                .join(', ') // Convert to comma-separated string
        }));

        // Set no-cache headers
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        res.status(200).json(doctorsWithSpecialties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};



exports.getAreaBanner = async (req, res) => {
    try {
        const educations = await MasterModal.findAll({
            where: { type: 'area' }
        });

        if (!educations || educations.length === 0) {
            return res.status(404).json({ message: 'No Area found' });
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
        const educations = await MasterModal.findAll({
            where: { type: 'area' },
            order: [['id', 'ASC']]
        });

        if (!educations || educations.length === 0) {
            return res.status(404).json({ message: 'No Area found' });
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




exports.getSpecialty = async (req, res) => {
    try {
        const speciality = await MasterModal.findAll({
            where: { type: 'speciality' },
            order: [['id', 'ASC']]
        });

        if (!speciality || speciality.length === 0) {
            return res.status(404).json({ message: 'No speciality found' });
        }

        // Set no-cache headers
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        res.status(200).json(speciality);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};


// *********************************************************

//MASTER DATA API *

// *********************************************************


exports.getMasters = async (req, res) => {
    const { type } = req.query;

    try {
        const educations = await MasterModal.findAll({
            where: { type }
        });

        if (!educations || educations.length === 0) {
            return res.status(404).json({ message: 'No education found' });
        }
        // Set no-cache headers
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.status(200).json(educations);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

exports.getEducations = async (req, res) => {
    try {
        const educations = await MasterModal.findAll({
            where: { type: 'education' }
        });

        if (!educations || educations.length === 0) {
            return res.status(404).json({ message: 'No Speciality found' });
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


exports.addmaster = async (req, res) => {
    try {

        const { masterName, type, id, city } = req.body.type;

        if (id) {
            // Update existing education
            const [updated] = await MasterModal.update(
                { masterName, type, city },
                { where: { id } }
            );

            if (updated) {
                res.status(200).json({ message: type + ' updated successfully' });
            } else {
                res.status(404).json({ message: type + ' Education not found' });
            }
        } else {
            // Create new education
            const newEducation = await MasterModal.create({
                masterName,
                type,
                city,
            });

            res.status(201).json({ message: type + ' created successfully', education: newEducation.id });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error });
    }
};


exports.deleteEducation = async (req, res) => {
    try {
        console.log('req.body', req.body.module_type);

        const { id, module_type } = req.body.module_type;

        const result = await MasterModal.destroy({
            where: { id: id }
        });
        console.log("result,result");

        if (result == 0) {
            return res.status(404).json({ message: module_type + ' not found' });
        }
        return res.status(200).json({ message: module_type + ' deleted successfully' });
    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }
}


exports.getSpeciality = async (req, res) => {
    try {
        const educations = await MasterModal.findAll({
            where: { type: 'speciality' }
        });

        if (!educations || educations.length === 0) {
            return res.status(404).json({ message: 'No Speciality found' });
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



exports.getDesignation = async (req, res) => {
    try {
        const educations = await MasterModal.findAll({
            where: { type: 'designation' }
        });

        if (!educations || educations.length === 0) {
            return res.status(404).json({ message: 'No designation found' });
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


exports.getExperience = async (req, res) => {
    try {
        const educations = await MasterModal.findAll({
            where: { type: 'experience' }
        });

        if (!educations || educations.length === 0) {
            return res.status(404).json({ message: 'No experience found' });
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


exports.getAreaCitywise = async (req, res) => {
    try {
        const city = req.query.city;
        let whereCondition = { type: 'area' };
        if (city) {
            whereCondition.city = city;
        }
        const areas = await MasterModal.findAll({
            where: whereCondition
        });
        if (!areas || areas.length === 0) return sendResponse(res, "No Area found", null)
        res.status(200).json(areas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

/****Single doctor page start*****/
exports.getdoctorsingle = async (req, res) => {
    const { slug } = req.query;
    //   const   slug = 'dr-aravind-kulkarni';

    try {
        // Fetch the doctor by slug
        const doctor = await Doctor.findOne({ where: { slug, publish: 'published' } });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Fetch specialty names from mastermodal based on specialty IDs
        const specialtyIds = doctor.specialty ? doctor.specialty.split(',') : [];
        const specialties = await MasterModal.findAll({
            where: {
                id: specialtyIds
            },
            attributes: ['masterName']
        });

        const doctorblog = await Blog.findAll({
            where: {
                doctor: {
                    [Op.regexp]: `(^|,)${doctor.id}($|,)`
                }
            },
            limit: 5
        });

        // Extract master names into a comma-separated string
        const specialtyNames = specialties.map(specialty => specialty.masterName).join(', ');

        // Construct the full response with specialty names
        const response = {
            ...doctor.toJSON(),
            specialtyName: specialtyNames, // Add specialty names to the response
            doctorblog: doctorblog
        };

        // Set no-cache headers
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");

        // Send the response
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};


/****Single doctor page start*****/
exports.getdoctorsinglebyid = async (req, res) => {
    const { id } = req.query;

    try {
        // Fetch the doctor by slug
        const doctor = await Doctor.findOne({ where: { id } });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Fetch specialty names from mastermodal based on specialty IDs
        const specialtyIds = doctor.specialty ? doctor.specialty.split(',') : [];
        const specialties = await MasterModal.findAll({
            where: {
                id: specialtyIds
            },
            attributes: ['masterName']
        });

        // Extract master names into a comma-separated string
        const specialtyNames = specialties.map(specialty => specialty.masterName).join(', ');

        // Construct the full response with specialty names
        const response = {
            ...doctor.toJSON(),
            specialtyName: specialtyNames // Add specialty names to the response
        };

        // Set no-cache headers
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");

        // Send the response
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// exports.addLeadBlog = async (req, res) => {
//     try {
//         const {  branch, cityId, patientName, mobileNumber,slug,query } = req.body;



//         // Validation: Collect errors for missing fields and format issues
//         const errors = {};

//         if (!branch) errors.branch = "Branch  is required.";
//         // if (!cityId) errors.cityId = "City  is required.";
//         if (!patientName) {
//             errors.patientName = "Patient Name is required.";
//         } else if (!/^[a-zA-Z\s]+$/.test(patientName)) {
//             errors.patientName = "Patient Name must only contain alphabets.";
//         }

//         if (!mobileNumber) {
//             errors.mobileNumber = "Mobile Number is required.";
//         } else if (!/^\d+$/.test(mobileNumber)) {
//             errors.mobileNumber = "Mobile Number must only contain digits.";
//         } else if (mobileNumber.length !== 10) {
//             errors.mobileNumber = "Mobile Number must be exactly 10 digits.";
//         }


//         // If there are errors, return a 400 response with the error messages
//         if (Object.keys(errors).length > 0) {
//             console.log("errors", errors);
//             return res.status(400).json({ message: "Validation failed", errors });
//         }

//         const type = "blog";

//         const newBlogLead = await Leads.create({
//             areaId:branch,
//             patientName,
//             mobileNumber,
//             message:query,
//             type,
//             slug
//             // status: '0',
//         });

//         res.status(201).json({ message: "Lead created successfully", Lead: newBlogLead });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error", error });
//     }
// };

// Function to send an email
const sendDoctorLeadEmail = async ({ doctorId, patientName, mobileNumber, branchIds, query }) => {
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
          <td style="padding: 16px 12px;max-width: calc(100% - 100px);min-width: calc(100% - 100px);width: calc(100% - 100px);display: block;"> ${doctorId}</td>
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
          <th style="padding: 16px 12px;max-width: 100px;min-width: 100px;width: 100px;display: block;border-right: 1px solid;">Branch Name</th>
          <td style="padding: 16px 12px;max-width: calc(100% - 100px);min-width: calc(100% - 100px);width: calc(100% - 100px);display: block;"> ${branchIds}</td>
        </tr>
        <tr style="display: flex;border-top: 1px solid;">
          <th style="padding: 16px 12px;max-width: 100px;min-width: 100px;width: 100px;display: block;border-right: 1px solid;">Message</th>
          <td style="padding: 16px 12px;max-width: calc(100% - 100px);min-width: calc(100% - 100px);width: calc(100% - 100px);display: block;"> ${query}</td>
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
            cc: "swapnil.narake@lokmanyahospitals.in",
            subject: `Book an Appointment enquire for ${doctorId}`,                               // Email subject
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
exports.addDoctorLead = async (req, res) => {
    try {
        const { doctorName, patientName, mobileNumber, branch, query, slug, leadId } = req.body;

        // Validate input
        // Validation: Collect errors for missing fields and format issues
        const errors = {};

        if (!branch) errors.branch = "Branch  is required.";
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

        if (!/^[a-zA-Z0-9\s.,!?\'"-]+$/.test(query)) {
            errors.query = "Please enter a valid message";
        }

        // If there are errors, return a 400 response with the error messages
        if (Object.keys(errors).length > 0) {
            console.log("errors", errors);
            return res.status(400).json({ message: "Validation failed", errors });
        }

        const type = "doctor";

        // Create a new doctor lead
        const newDoctorLead = await leads.create({
            doctorId: doctorName,
            patientName,
            mobileNumber,
            areaId: branch,
            query,
            type,
            slug
        });

        if (leadId) {
            const dropUpRecord = await DropUp.findOne({ where: { id: leadId } });
            if (dropUpRecord) {
                await DropUp.destroy({ where: { id: leadId } });
            }
        }

        const doctor = await Doctor.findOne({
            where: { id: doctorName }
        });

        const branchId = await MasterModal.findOne({
            where: { id: branch }
        });
        // Fetch doctor by primary key (ID)
        const doctorId = doctor.doctorName;
        const branchIds = branchId.masterName;

        // Send the doctor appointment lead email
        const emailResult = await sendDoctorLeadEmail({ doctorId, patientName, mobileNumber, branchIds, query });

        if (!emailResult.success) {
            // If email fails, log the error but allow lead creation to succeed
            console.error("Email sending failed:", emailResult.error);
            return res.status(500).json({ message: "Lead created, but email failed to send", error: emailResult.error });
        }

        // Return success response
        res.status(201).json({ status: 201, message: "Lead created successfully", leadId: newDoctorLead.id });
    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};


exports.updateLead = async (req, res) => {
    try {
        const { id, status } = req.body;
        const newDoctorLead = await DoctorsLead.update({
            status
        }, { where: { id } });

        res.status(201).json({ message: 'Lead Updated successfully', Lead: newDoctorLead });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }

};


exports.deleteDoctor = async (req, res) => {
    const { id } = req.query;
    try {
        const doctor = await Doctor.findByPk(id); // Fetch doctor by primary key (ID)

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        const uploadsDir = path.join(__dirname, '../uploads/doctors');
        await DoctorConditions.destroy({ where: { doctor_id: id } });
        // If the doctor has an associated image, delete it from the file system
        if (doctor.featured_images) {
            const fs = require('fs');
            const path = require('path');
            const imagePath = path.join(__dirname, '..', doctor.featured_images);

            // Check if the file exists and delete it
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await doctor.destroy(); // Delete the doctor from the database

        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};



exports.generateSitemap = async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        const blogs = await Blog.findAll();


        const hyperlocals = await HyperLocal.findAll(); // Adjust model name if needed
        const hyperlocalAreas = await MasterModal.findAll({
            where: {
                type: 'hyperlocalarea',
            },
        });

        const templateMap = {
            1: 'best-hospital',
            2: 'best-treatment',
            3: 'best-doctors',
        };


        // javascript
        // Copy
        // Edit
        let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;



        const staticUrls = [
            '',
            'international-patients',
            'careers',
            'orthopedics',
            'cardiology',
            'gastroenterology',
            'neurology',
            'urology',
            'joint-hip-and-knee-replacement',
            'about-us',
            'contact-us',
            'spine',
            'testimonials',
            'our-branch',
            'blogs',
            'doctors',
        ];

        staticUrls.forEach((url) => {
            sitemapXml += `  <url>\n    <loc>https://lokmanyahospitals.com/${url}</loc>\n  </url>\n`;
        });

        doctors.forEach((doctor) => {
            if (doctor.slug) {
                sitemapXml += `  <url>\n    <loc>https://lokmanyahospitals.com/doctors/${doctor.slug}</loc>\n  </url>\n`;
            }
        });

        blogs.forEach((blog) => {
            if (blog.slug) {
                sitemapXml += `  <url>\n    <loc>https://lokmanyahospitals.com/blogs/${blog.slug}</loc>\n  </url>\n`;
            }
        });

        hyperlocals.forEach((hl) => {
            if (hl.slug && hl.templateId && templateMap[hl.templateId]) {
                const prefix = templateMap[hl.templateId];
                hyperlocalAreas.forEach((area) => {
                    const areaSlug = area.masterName.toLowerCase().replace(/\s+/g, '-');
                    sitemapXml += `  <url>\n    <loc>https://lokmanyahospitals.com/${prefix}/${hl.slug}-in-${areaSlug}</loc>\n  </url>\n`;
                });
            }
        });


        sitemapXml += `</urlset>`;

        // ✅ Save in actual public directory at project root
        const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
        await fs.promises.writeFile(sitemapPath, sitemapXml, 'utf8');

        console.log('✅ Sitemap generated at:', sitemapPath);
        return res.status(200).send('Sitemap generated successfully!');
    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        return res.status(500).send('Error generating sitemap');
    }
};


// exports.sitemap = async (req, res) => {
//     try {
//         const doctors = await Doctor.findAll();
//         const blogs = await Blog.findAll();

//         // Start building the XML sitemap
//         let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
//         <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
//            <url>
//                 <loc>${`https://lokmanyahospitals.com/`}</loc>
//             </url>
//             <url>
//                 <loc>${`https://lokmanyahospitals.com/international-patients`}</loc>
//             </url><url>
//                 <loc>${`https://lokmanyahospitals.com/careers`}</loc>
//             </url><url>
//                 <loc>${`https://lokmanyahospitals.com/orthopedics`}</loc>
//             </url><url>
//                 <loc>${`https://lokmanyahospitals.com/cancer`}</loc>
//             </url><url>
//                 <loc>${`https://lokmanyahospitals.com/cardiology`}</loc>
//             </url><url>
//                 <loc>${`https://lokmanyahospitals.com/gastroenterology`}</loc>
//             </url>
//             <url>
//                 <loc>${`https://lokmanyahospitals.com/neurology`}</loc>
//             </url>
//             <url>
//                 <loc>${`https://lokmanyahospitals.com/urology`}</loc>
//             </url>
//             <url>
//                 <loc>${`https://lokmanyahospitals.com/spine-and-back`}</loc>
//             </url>
//             <url>
//                 <loc>${`https://lokmanyahospitals.com/joint-hip-and-knee-replacement`}</loc>
//             </url>
//             <url>
//                 <loc>${`https://lokmanyahospitals.com/about-us`}</loc>
//             </url>
//             <url>
//                 <loc>${`https://lokmanyahospitals.com/contact-us`}</loc>
//             </url>
//             <url>
//                 <loc>${`https://lokmanyahospitals.com/spine`}</loc>
//             </url>
//             <url>
//                 <loc>${`https://lokmanyahospitals.com/testimonials`}</loc>
//             </url>
//             <url>
//                 <loc>${`https://lokmanyahospitals.com/our-branch`}</loc>
//             </url>
//             <url>
//                 <loc>${`https://lokmanyahospitals.com/blogs`}</loc>
//             </url>
//             <url>
//                 <loc>${`https://lokmanyahospitals.com/doctors`}</loc>
//             </url>`;


//         // Loop through doctors and add them to the sitemap
//         doctors.forEach(doctor => {
//             sitemapXml += `
//             <url>
//                 <loc>${`https://lokmanyahospitals.com/doctors/${doctor.slug}`}</loc>                
//             </url>`;
//         });

//         blogs.forEach(blog => {
//             sitemapXml += `
//             <url>
//                 <loc>${`https://lokmanyahospitals.com/blogs/${blog.slug}`}</loc>                
//             </url>`;
//         });




//         // Close the URL set
//         sitemapXml += `
//         </urlset>`;

//         // Define the path where you want to save the sitemap.xml file (in the public folder)
//         const filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'public', 'sitemap.xml'); // Adjust path for public folder

//         // Write the XML content to a file
//         fs.writeFile(filePath, sitemapXml, (err) => {
//             if (err) {
//                 console.error('Error writing sitemap file:', err);
//                 return res.status(500).send('Error writing sitemap file');
//             }
//             console.log('Sitemap file generated successfully!');
//             return res.send('Sitemap file generated successfully!');
//         });

//     } catch (error) {
//         console.error('Error generating sitemap:', error);
//         res.status(500).send('Error generating sitemap');
//     }
// };



/*===============================================
#### Export Lead
===============================================*/
exports.exportDataLead = async (req, res, next) => {
    try {

        const { cityId, areaId, publish, status, date } = req.query;
        const type = req.query.type;
        const typeArray = Array.isArray(type) ? type : type ? [type] : [];

        (req.query)
        // Construct the where condition dynamically
        const whereCondition = {
            id: {
                [Op.ne]: 0,
            },
        };

        //   if (publish && publish.length > 0) {
        //     whereCondition.publish = {
        //       [Op.in]: publish,
        //     };
        //   }
        if (typeArray.length > 0) {
            whereCondition.type = {
                [Op.in]: typeArray,
            };
        }
        //   if (cityId && cityId.length > 0) {
        //     whereCondition.cityId = {
        //       [Op.in]: cityId,
        //     };
        //   }
        if (areaId && areaId.length > 0) {
            whereCondition.areaId = {
                [Op.in]: areaId,
            };
        }
        if (status && status.length > 0) {
            if (status.includes('0')) {
                whereCondition.status = {
                    [Op.or]: [
                        { [Op.eq]: 0 },
                        { [Op.is]: null }
                    ]
                };
            } else {
                whereCondition.status = {
                    [Op.in]: status
                };
            }
        }
        if (date && date.startdatelead && date.startdatelead != '') {

            // Set hours for startdate to 00:00:00 and enddate to 23:59:59
            const start = new Date(date.startdatelead);
            start.setHours(0, 0, 0, 0);

            const end = new Date(date.enddatelead);
            end.setHours(23, 59, 59, 999);

            whereCondition.createdAt = {
                [Op.between]: [start, end],
            };
        }

        // Fetch data from the database with joins
        const doctors = await DoctorsLead.findAll({
            where: whereCondition,
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
            order: [['id', 'DESC']], // Ordering by ID in descending order
        });


        if (type == 'doctor') {
            // Define CSV headers
            const csvFields = ['Doctor Name', 'City Name', 'Hospital Name',
                'Patient Name', 'Mobile Number',
                'Date'];
            const csvRows = [];

            // Add the header row
            csvRows.push(csvFields.join(','));

            for (const doctor of doctors) {
                const dateObject = new Date(doctor.createdAt);
                const formattedDate = dateObject.toISOString().split('T')[0];
                const row = [

                    doctor.Doctor ? doctor.Doctor.doctorName : '-', // If Doctor is null, set to 'N/A'
                    doctor.City ? doctor.City.masterName : '-', // If City is null, set to 'N/A'
                    doctor.Area ? doctor.Area.masterName : '-', // If Area is null, set to 'N/A'
                    // doctor.type,
                    doctor.patientName,
                    doctor.mobileNumber,
                    // doctor.message,
                    formattedDate,
                ];

                // Add row to CSV rows
                csvRows.push(row.join(','));
            }
            const csv = csvRows.join('\n');
            res.setHeader('Content-Type', 'text/csv; charset=utf-8');
            res.setHeader('Content-Disposition', 'attachment; filename=doctors.csv');
            res.setHeader('Cache-Control', 'no-cache');
            res.status(200).send('\uFEFF' + csv); // Add BOM for Excel to support UTF-8
            res.status(200).send(csv);
        }

        if (type == 'book_appointment') {
            // Define CSV headers
            const csvFields = ['Patient Name', 'Mobile Number',
                'location', 'Date'];
            const csvRows = [];

            // Add the header row
            csvRows.push(csvFields.join(','));

            for (const doctor of doctors) {
                const dateObject = new Date(doctor.createdAt);
                const formattedDate = dateObject.toISOString().split('T')[0];
                const row = [
                    doctor.patientName,
                    doctor.mobileNumber,
                    doctor.location,
                    formattedDate,
                ];

                // Add row to CSV rows
                csvRows.push(row.join(','));
            }
            const csv = csvRows.join('\n');
            res.setHeader('Content-Disposition', 'attachment; filename=doctors.csv');
            res.setHeader('Content-Type', 'text/csv');
            res.status(200).send(csv);
        }

        if (type == 'hyperlocal') {
            // Define CSV headers
            const csvFields = ['Patient Name', 'Mobile Number',
                'location', 'Date'];
            const csvRows = [];

            // Add the header row
            csvRows.push(csvFields.join(','));

            for (const doctor of doctors) {
                const dateObject = new Date(doctor.createdAt);
                const formattedDate = dateObject.toISOString().split('T')[0];
                const row = [
                    doctor.patientName,
                    doctor.mobileNumber,
                    doctor.location,
                    formattedDate,
                ];

                // Add row to CSV rows
                csvRows.push(row.join(','));
            }
            const csv = csvRows.join('\n');
            res.setHeader('Content-Disposition', 'attachment; filename=doctors.csv');
            res.setHeader('Content-Type', 'text/csv');
            res.status(200).send(csv);
        }

        if (type == 'lab_test') {
            // Define CSV headers
            const csvFields = ['Patient Name', 'Mobile Number',
                'Location', 'Date'];
            const csvRows = [];

            // Add the header row
            csvRows.push(csvFields.join(','));

            for (const doctor of doctors) {
                const dateObject = new Date(doctor.createdAt);
                const formattedDate = dateObject.toISOString().split('T')[0];
                const row = [
                    doctor.patientName,
                    doctor.mobileNumber,
                    doctor.location,
                    formattedDate,
                ];

                // Add row to CSV rows
                csvRows.push(row.join(','));
            }
            const csv = csvRows.join('\n');
            res.setHeader('Content-Disposition', 'attachment; filename=doctors.csv');
            res.setHeader('Content-Type', 'text/csv');
            res.status(200).send(csv);
        }

        if (type == 'health_checkup') {
            // Define CSV headers
            const csvFields = ['Patient Name', 'Mobile Number',
                'Location', 'Date'];
            const csvRows = [];

            // Add the header row
            csvRows.push(csvFields.join(','));

            for (const doctor of doctors) {
                const dateObject = new Date(doctor.createdAt);
                const formattedDate = dateObject.toISOString().split('T')[0];
                const row = [
                    doctor.patientName,
                    doctor.mobileNumber,
                    doctor.location,
                    formattedDate,
                ];

                // Add row to CSV rows
                csvRows.push(row.join(','));
            }
            const csv = csvRows.join('\n');
            res.setHeader('Content-Disposition', 'attachment; filename=doctors.csv');
            res.setHeader('Content-Type', 'text/csv');
            res.status(200).send(csv);
        }
        if (type == 'second_opinion') {
            // Define CSV headers
            const csvFields = ['Patient Name', 'Mobile Number',
                'Location', 'Date'];
            const csvRows = [];

            // Add the header row
            csvRows.push(csvFields.join(','));

            for (const doctor of doctors) {
                const dateObject = new Date(doctor.createdAt);
                const formattedDate = dateObject.toISOString().split('T')[0];
                const row = [
                    doctor.patientName,
                    doctor.mobileNumber,
                    doctor.location,
                    formattedDate,
                ];

                // Add row to CSV rows
                csvRows.push(row.join(','));
            }
            const csv = csvRows.join('\n');
            res.setHeader('Content-Disposition', 'attachment; filename=doctors.csv');
            res.setHeader('Content-Type', 'text/csv');
            res.status(200).send(csv);
        }
        if (type == 'blog') {
            // Define CSV headers
            const csvFields = ['Patient Name', 'Mobile Number',
                'Location', 'Source', 'Date'];
            const csvRows = [];

            // Add the header row
            csvRows.push(csvFields.join(','));

            for (const doctor of doctors) {
                const dateObject = new Date(doctor.createdAt);
                const formattedDate = dateObject.toISOString().split('T')[0];
                const row = [
                    doctor.patientName,
                    doctor.mobileNumber,
                    doctor.location,
                    doctor.slug,
                    formattedDate,
                ];

                // Add row to CSV rows
                csvRows.push(row.join(','));
            }
            const csv = csvRows.join('\n');
            res.setHeader('Content-Disposition', 'attachment; filename=doctors.csv');
            res.setHeader('Content-Type', 'text/csv');
            res.status(200).send(csv);
        }
        if (type == 'Inquiry') {
            // Define CSV headers
            const csvFields = ['Patient Name', 'Mobile Number',
                'Email', 'Hospital', 'Date'];
            const csvRows = [];

            // Add the header row
            csvRows.push(csvFields.join(','));

            for (const doctor of doctors) {
                const dateObject = new Date(doctor.createdAt);
                const formattedDate = dateObject.toISOString().split('T')[0];
                const row = [
                    doctor.patientName,
                    doctor.mobileNumber,
                    doctor.email,
                    doctor.Area ? doctor.Area.masterName : '-',
                    formattedDate,
                ];

                // Add row to CSV rows
                csvRows.push(row.join(','));
            }
            const csv = csvRows.join('\n');
            res.setHeader('Content-Disposition', 'attachment; filename=doctors.csv');
            res.setHeader('Content-Type', 'text/csv');
            res.status(200).send(csv);
        }


    } catch (error) {
        console.error('Error fetching doctors from DB:', error);
        next(error);
    }



};


exports.getDoctorConditions = async (req, res) => {
    try {
        const { doctor_id } = req.query;
        const conditions = await DoctorConditions.findAll({
            where: { doctor_id },
            order: [['id', 'ASC']]
        });
        res.status(200).json(conditions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

exports.getDoctorslistSpeciality = async (req, res) => {
    try {
        const { slug } = req.query;
        const specialityID = await MasterModal.findOne({
            where: {
                slug: slug,
                type: 'speciality'
            }
        });
        if (!specialityID) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        const specialty = specialityID.id;

        let filter = {};

        if (specialty) {
            const specialtyStr = String(specialty); // Convert to string to use split
            const specialtiesArray = specialtyStr.split(',');

            filter.specialty = {
                [Op.or]: [
                    { [Op.eq]: specialtyStr },
                    ...specialtiesArray.map(val => ({
                        [Op.or]: [
                            { [Op.eq]: val },
                            { [Op.like]: `${val},%` },
                            { [Op.like]: `%,${val},%` },
                            { [Op.like]: `%,${val}` }
                        ]
                    }))
                ]
            };
        }

        const doctors = await Doctor.findAll({
            where: filter,
            attributes: ['id', 'doctorName', 'experience', 'designation', 'specialty', 'featured_images'],
            order: [
                ['grade', 'ASC'],
                [Sequelize.literal('CAST(experience AS SIGNED)'), 'DESC'],
                ['doctorName', 'ASC']
            ]
        });

        if (!doctors || doctors.length === 0) {
            return res.status(200).json({ message: 'No doctors found' });
        }

        // Extract and sanitize specialty IDs
        const specialtyIds = [
            ...new Set(
                doctors
                    .flatMap(doc => doc.specialty?.split(',') || [])
                    .map(id => parseInt(id, 10))
                    .filter(id => !isNaN(id))
            )
        ];

        const specialties = await MasterModal.findAll({
            where: { id: specialtyIds },
            attributes: ['id', 'masterName']
        });

        const specialtiesMap = specialties.reduce((acc, item) => {
            acc[item.id] = item.masterName;
            return acc;
        }, {});

        const doctorsWithSpecialties = doctors.map(doc => ({
            ...doc.toJSON(),
            specialtyNames: doc.specialty
                ?.split(',')
                .map(id => specialtiesMap[parseInt(id, 10)] || null)
                .filter(Boolean)
                .join(', ') || ''
        }));

        // No-cache headers
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        res.status(200).json(doctorsWithSpecialties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
