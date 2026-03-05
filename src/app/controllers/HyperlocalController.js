const leads = require('@/app/models/Leads.js');
const MasterModal = require('@/app/models/MasterModal.js');
const sequelize = require('@/configs/database');
const { Sequelize, Op } = require('sequelize');
const { sendResponse, sendError } = require('@/helpers/handleResponse.js');
const HyperlocalCategory = require('../models/HyperlocalCategory');
const HyperLocal = require('../models/HyperLocal');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const TreatmentProcedure = require('../models/TreatmentProcedure');
const HyperlocalBenifit = require('../models/HyperlocalBenifit');
const ComprehensiveCare = require('../models/ComprehensiveCare');
const Doctor = require('../models/DoctorModal');



exports.addarea = async (req, res) => {
    try {
        const { masterName, id } = req.body;
        const type = "hyperlocalarea";
        const city = "Pune";

        const slugify = (text) => {
            if (!text) return ''; // safely return empty string
            return text
                .toString()
                .toLowerCase()
                .trim()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-');
        };


        const slug = slugify(masterName);
        if (id) {
            // Update existing education
            const [updated] = await MasterModal.update(
                { masterName, slug, type, city },
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
                slug,
                city,
            });

            res.status(201).json({ message: type + ' created successfully', education: newEducation.id });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error });
    }
};



exports.getHyperlocalArea = async (req, res) => {
    try {
        const areas = await MasterModal.findAll({
            where: { type: 'hyperlocalarea' },
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






exports.getHyperlocalAreaById = async (req, res) => {
    try {
        // Extract data from the request body
        const { id } = req.query;

        // Insert data into the Treat table
        const newCategory = await MasterModal.findOne({ where: { id } });

        // Set no-cache headers
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");

        // Respond with the newly created entry
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error Updated Category:', error);
        res.status(500).json({ message: 'Error adding Category', error });
    }
};




exports.updateHyperlocalArea = async (req, res) => {
    try {
        const { id } = req.query;
        const { masterName } = req.body;

        const slugify = (text) => {
            if (!text) return ''; // safely return empty string
            return text
                .toString()
                .toLowerCase()
                .trim()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-');
        };

        const slug = slugify(masterName);
        // Insert data into the Treat table
        const newcategory = await MasterModal.update({
            masterName, slug
        }, { where: { id } });

        // Respond with the newly created entry
        res.status(200).json({ message: 'Category Updated successfully' });
    } catch (error) {
        console.error('Error Updated treatment:', error);
        res.status(500).json({ message: 'Error adding treatment', error });
    }
};


// exports.addCategory = async (req, res) => {
//     try {
//         console.log('req.body');

//         const { name,parent_id } = req.body;
//         let level = 1;
//         // const parent_id = 2;
//         if (parent_id) {
//             const parent = await HyperlocalCategory.findByPk(parent_id);
//             if (!parent) {
//                 return res.status(400).json({ message: 'Invalid parent_id' });
//             }
//             level = parent.level + 1;
//         }

//         const newCategory = await HyperlocalCategory.create({
//             name,
//             parent_id: parent_id || null,
//             level,
//         });

//         res.status(201).json({
//             message: 'Category added successfully',
//             data: newCategory,
//         });
//     } catch (err) {
//         console.error('Add Category Error:', err.message);
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };


// Custom slugify function (no npm package)
const generateSlugPart = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')  // remove symbols
        .replace(/\s+/g, '-')      // spaces → dashes
        .replace(/--+/g, '-');     // double dashes → single
};

// Recursive function to build full parent slug path
const buildFullSlugPath = async (categoryIdList = []) => {
    let fullPath = [];

    for (const categoryId of categoryIdList) {
        const category = await HyperlocalCategory.findByPk(categoryId);
        if (category) {
            fullPath.unshift(generateSlugPart(category.name));
            if (category.parent_id) {
                const parentPath = await buildFullSlugPath([category.parent_id]);
                fullPath = [...parentPath, ...fullPath];
            }
        }
    }

    return fullPath;
};

exports.addCategory = async (req, res) => {
    try {
        const { name, parent_id } = req.body;
        let level = 1;
        let slug = generateSlugPart(name);

        let fullPath = [slug];

        if (parent_id) {
            const parent = await HyperlocalCategory.findByPk(parent_id);
            if (!parent) {
                return res.status(400).json({ message: 'Invalid parent_id' });
            }

            level = parent.level + 1;

            // Get parent slug path recursively
            const parentSlugParts = await buildFullSlugPath([parent_id]);
            fullPath = [...parentSlugParts, slug];
        }

        const finalSlug = fullPath.join('/');

        const newCategory = await HyperlocalCategory.create({
            name,
            parent_id: parent_id || null,
            level,
            slug: finalSlug,
        });

        res.status(201).json({
            message: 'Category added successfully',
            data: newCategory,
        });

    } catch (err) {
        console.error('Add Category Error:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


exports.getCategoryList = async (req, res) => {
    try {
        const categories = await HyperlocalCategory.findAll({
            order: [['name', 'ASC']],
            raw: true,
        });

        // Build tree
        const categoryMap = {};
        categories.forEach(cat => {
            cat.children = [];
            categoryMap[cat.id] = cat;
        });

        const tree = [];

        categories.forEach(cat => {
            if (cat.parent_id) {
                if (categoryMap[cat.parent_id]) {
                    categoryMap[cat.parent_id].children.push(cat);
                }
            } else {
                tree.push(cat);
            }
        });

        return res.status(200).json({
            message: 'Category list fetched successfully',
            data: tree,
        });
    } catch (err) {
        console.error('Get Category List Error:', err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};


// Define storage for the images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/hyperlocal/');
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


// const uploadsDir = path.join(__dirname, '../uploads/blog');
const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'hyperlocal');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}



const generateUniqueSlug = async (title) => {
    let baseSlug = slugify(title);
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (await HyperLocal.findOne({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
    }
    return uniqueSlug;
};

const slugify = (text) => {
    if (!text) return ''; // safely return empty string
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
};

exports.getHyperlocalList = async (req, res) => {
    try {
        const { typeId, area, status, searchTerm } = req.query;

        const where = {};

        if (typeId) {
            where.templateId = typeId;
        }

        if (area) {
            where.area = area;
        }

        if (status) {
            where.status = status;
        }

        if (searchTerm) {
            where.title = {
                [Op.like]: `%${searchTerm}%`
            };
        }

        const HyperlocalList = await HyperLocal.findAll({
            where,
            order: [['id', 'DESC']],
            include: [
                {
                    model: HyperlocalCategory,
                    as: 'category',
                    attributes: ['id', 'name'] // You can customize this
                }
            ]
        });

        return res.status(200).json({
            message: 'Hyperlocal list fetched successfully',
            data: HyperlocalList,
        });
    } catch (err) {
        console.error('Get Hyperlocal List Error:', err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// exports.getHyperlocalList = async (req, res) => {
//     try {
//         const { typeId, area, status, searchTerm } = req.query;

//         const where = {};

//         if (typeId) {
//             where.templateId = typeId;
//         }

//         if (area) {
//             where.area = area;
//         }

//         if (status) {
//             where.status = status;
//         }

//         if (searchTerm) {
//             where.title = {
//                 [Op.like]: `%${searchTerm}%`
//             };
//         }

//         const HyperlocalList = await HyperLocal.findAll({
//             where,
//             order: [['id', 'DESC']],
//         });

//         return res.status(200).json({
//             message: 'Hyperlocal list fetched successfully',
//             data: HyperlocalList,
//         });
//     } catch (err) {
//         console.error('Get Hyperlocal List Error:', err);
//         return res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };


//BEST HOSPITAL
exports.getbesthospitalHyperlocalbyid = async (req, res) => {
    try {
        const { id } = req.query;

        const hyperlocals = await HyperLocal.findByPk(id, {
            include: [
                {
                    model: TreatmentProcedure,
                    required: false
                },
                {
                    model: HyperlocalBenifit,
                    required: false
                },
                {
                    model: ComprehensiveCare,
                    required: false
                }
            ]
        });

        if (!hyperlocals) {
            return res.status(404).json({ message: 'No Hyperlocal found' });
        }


        res.status(200).json(hyperlocals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};






// exports.getBestAHospitalHyperlocalFrontend = async (req, res) => {
//   try {
//     const { slug } = req.query;
// console.log('slug',slug);

//     const hyperlocal = await HyperLocal.findOne({
//       where: { slug:slug,templateId:1 }, // ✅ filter using slug
//       include: [
//         {
//           model: TreatmentProcedure,
//           required: false,
//         },
//         {
//           model: HyperlocalBenifit,
//           required: false,
//         },
//         {
//           model: ComprehensiveCare,
//           required: false,
//         },
//       ],
//     });

//     if (!hyperlocal) {
//       return res.status(404).json({ message: 'No Hyperlocal found' });
//     }

//     res.status(200).json(hyperlocal);
//   } catch (error) {
//     console.error('Error fetching hyperlocal by slug:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// };


exports.updateBestHospital = async (req, res) => {
    upload.fields([
        { name: 'featured_images', maxCount: 1 },
        { name: 'featured_images_mobile', maxCount: 1 },
        { name: 'sub_icon', maxCount: 1 },
        { name: 'comprehensiveProceduresImages', maxCount: 10 }
    ])(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }
        try {
            const { id } = req.query;
            let {
                title, description, categoryId, faqs, status,
                benefitsProcedures, treatmentProcedures, comprehensiveProcedures,
                metaTitle, metaDescription, isActive,
                treatmentHeading, comprehensiveHeading
            } = req.body;

            if (!id || !title) {
                return res.status(400).json({ message: "Hyperlocal ID and name are required" });
            }

            description = description === 'null' || description === null ? '' : description;
            metaTitle = metaTitle === 'null' || metaTitle === null ? '' : metaTitle;
            metaDescription = metaDescription === 'null' || metaDescription === null ? '' : metaDescription;

            let parsedTreatmentProcedures = [];
            let parsedBenefitsProcedures = [];
            let parsedComprehensiveProcedures = [];

            try { if (treatmentProcedures) parsedTreatmentProcedures = JSON.parse(treatmentProcedures); } catch { return res.status(400).json({ message: 'Invalid treatmentProcedures format' }); }
            try { if (benefitsProcedures) parsedBenefitsProcedures = JSON.parse(benefitsProcedures); } catch { return res.status(400).json({ message: 'Invalid benefitsProcedures format' }); }
            try { if (comprehensiveProcedures) parsedComprehensiveProcedures = JSON.parse(comprehensiveProcedures); } catch { return res.status(400).json({ message: 'Invalid comprehensiveProcedures format' }); }

            const category = await HyperlocalCategory.findByPk(categoryId);
            if (!category) return res.status(400).json({ message: 'Invalid categoryId' });

            const titleSlug = slugify(title);
            let fullSlugBase = category.level === 1
                ? `${titleSlug}`
                : `${category.slug.split('/').slice(0, -1).join('/')}/${titleSlug}`;
            const slug = fullSlugBase;

            let featured_image = req.files['featured_images']?.[0]?.path || null;
            let featured_images_mobile = req.files['featured_images_mobile']?.[0]?.path || null;

            const HyperLocalData = await HyperLocal.findOne({ where: { id } });
            if (!HyperLocalData) return res.status(404).json({ message: 'Department not found' });

            const replaceImage = (newImage, oldImage) => {
                if (newImage) {
                    if (oldImage && fs.existsSync(oldImage)) fs.unlink(oldImage, err => err && console.error(err));
                    return newImage.replace(/^public[\\/]/, '');
                }
                return oldImage;
            };

            featured_image = replaceImage(featured_image, HyperLocalData.featured_image);
            featured_images_mobile = replaceImage(featured_images_mobile, HyperLocalData.featured_images_mobile);

            const updatedDepartment = await HyperLocal.update(
                {
                    title, categoryId, featured_images_mobile, slug, treatmentHeading, comprehensiveHeading,
                    description, featured_image, faqs, status, metaTitle, metaDescription
                },
                { where: { id } }
            );

            if (updatedDepartment[0] === 0) return res.status(404).json({ message: 'Department not found' });

            // Treatment Procedures
            const existingTreatmentProcedures = await TreatmentProcedure.findAll({ where: { hyperlocalId: id } });
            const existingTreatmentProcedureIds = new Set(existingTreatmentProcedures.map(proc => proc.id));

            for (const procedure of parsedTreatmentProcedures) {
                if (procedure.id) {
                    await TreatmentProcedure.update(
                        { question: procedure.question, isActive: procedure.isActive, description: procedure.description },
                        { where: { id: procedure.id, hyperlocalId: id } }
                    );
                    existingTreatmentProcedureIds.delete(procedure.id);
                } else {
                    await TreatmentProcedure.create({
                        question: procedure.question, description: procedure.description, isActive: procedure.isActive, hyperlocalId: id
                    });
                }
            }
            for (const procId of existingTreatmentProcedureIds) {
                await TreatmentProcedure.destroy({ where: { id: procId } });
            }

            // Benefits Procedures
            const existingBenefitsProcedures = await HyperlocalBenifit.findAll({ where: { hyperlocalId: id } });
            const existingBenefitsProceduresIds = new Set(existingBenefitsProcedures.map(proc => proc.id));

            for (const procedure of parsedBenefitsProcedures) {
                if (procedure.id) {
                    await HyperlocalBenifit.update(
                        {
                            benifitTitle: procedure.benifitTitle,
                            benifitDescription: procedure.benifitDescription,
                            benifitImage: procedure.benifitImage,
                        },
                        { where: { id: procedure.id, hyperlocalId: id } }
                    );
                    existingBenefitsProceduresIds.delete(procedure.id);
                } else {
                    await HyperlocalBenifit.create({
                        benifitTitle: procedure.benifitTitle,
                        benifitDescription: procedure.benifitDescription,
                        benifitImage: procedure.benifitImage,
                        hyperlocalId: id,
                    });
                }
            }
            for (const procId of existingBenefitsProceduresIds) {
                await HyperlocalBenifit.destroy({ where: { id: procId } });
            }

            // Comprehensive Procedures with image handling
            const existingComprehensiveProcedures = await ComprehensiveCare.findAll({ where: { hyperlocalId: id } });
            const existingComprehensiveProceduresMap = new Map(existingComprehensiveProcedures.map(proc => [proc.id, proc]));

            for (let idx = 0; idx < parsedComprehensiveProcedures.length; idx++) {
                const procedure = parsedComprehensiveProcedures[idx];
                let imgPath = procedure.comprehensiveImage;

                const file = req.files['comprehensiveProceduresImages']?.[idx];
                if (file) {
                    if (procedure.id && existingComprehensiveProceduresMap.has(procedure.id)) {
                        const oldImg = existingComprehensiveProceduresMap.get(procedure.id).comprehensiveImage;
                        if (oldImg) {
                            const oldPath = path.join('public', 'uploads', 'hyperlocal', 'compCare', oldImg);
                            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                        }
                    }
                    const ts = Date.now();
                    const ext = path.extname(file.originalname);
                    const newName = `${procedure.comprehensiveTitle.replace(/\s+/g, '_')}_${ts}${ext}`;
                    const relPath = path.join('uploads', 'hyperlocal', 'compCare', newName);
                    fs.renameSync(file.path, path.join('public', relPath));
                    imgPath = newName;
                }

                if (procedure.id) {
                    await ComprehensiveCare.update(
                        {
                            comprehensiveTitle: procedure.comprehensiveTitle,
                            comprehensiveDescription: procedure.comprehensiveDescription,
                            comprehensiveImage: imgPath
                        },
                        { where: { id: procedure.id, hyperlocalId: id } }
                    );
                    existingComprehensiveProceduresMap.delete(procedure.id);
                } else {
                    await ComprehensiveCare.create({
                        comprehensiveTitle: procedure.comprehensiveTitle,
                        comprehensiveDescription: procedure.comprehensiveDescription,
                        comprehensiveImage: imgPath,
                        hyperlocalId: id
                    });
                }
            }

            for (const [procId, procData] of existingComprehensiveProceduresMap) {
                if (procData.comprehensiveImage) {
                    const oldPath = path.join('public', 'uploads', 'hyperlocal', 'compCare', procData.comprehensiveImage);
                    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                }
                await ComprehensiveCare.destroy({ where: { id: procId } });
            }

            return res.status(200).json({ message: "Hyperlocal updated successfully" });

        } catch (error) {
            console.error('Error updating Department:', error);
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    });
};




exports.addHyperlocalNearMe = async (req, res) => {
    upload.fields([
        { name: 'featured_images', maxCount: 1 },
        { name: 'featured_images_mobile', maxCount: 1 },
        { name: 'sub_icon', maxCount: 1 },
        { name: 'comprehensiveProceduresImages', maxCount: 10 } // allow multiple

    ])(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        try {
            const {
                title,
                description,
                faqs,
                status,
                comprehensiveProcedures,
                benefitsProcedures,
                treatmentProcedures,
                metaTitle,
                metaDescription,
                categoryId,
                treatmentHeading,
                comprehensiveHeading
            } = req.body;

            // Process featured image
            let featured_image = req.files['featured_images'] ? req.files['featured_images'][0].path : null;
            let featured_images_mobile = req.files['featured_images_mobile'] ? req.files['featured_images_mobile'][0].path : null;
            if (featured_image) {
                featured_image = featured_image.replace(/^public[\\/]/, '');
            }
            if (featured_images_mobile) {
                featured_images_mobile = featured_images_mobile.replace(/^public[\\/]/, '');
            }

            // Fetch category
            const category = await HyperlocalCategory.findByPk(categoryId);
            if (!category) {
                return res.status(400).json({ message: 'Invalid categoryId' });
            }

            // Create the slug (category-based only)
            const titleSlug = slugify(title); // e.g., best-ortho-doctor
            let categorySlug = category.slug;

            let fullSlugBase = '';
            if (category.level === 1) {
                fullSlugBase = `${titleSlug}`;
            } else {
                const parts = category.slug.split('/');
                parts.pop(); // remove last part
                categorySlug = parts.join('/'); // remaining path
                fullSlugBase = `${categorySlug}/${titleSlug}`;
            }

            const areas = await MasterModal.findAll({
                where: { type: 'hyperlocalarea' },
                order: [['id', 'ASC']]
            });

            // Extract only the IDs
            const areaIds = areas.map(area => area.id).join(',');

            // Create only one main record
            const newDepartment = await HyperLocal.create({
                title: title,
                slug: fullSlugBase,
                description,
                featured_image,
                featured_images_mobile,
                faqs,
                status,
                templateId: 1,
                metaTitle,
                metaDescription,
                treatmentHeading,
                comprehensiveHeading,
                areaId: areaIds, // storing comma-separated area IDs (you can process to array if needed)
                categoryId: category.id
            });

            // Add treatment procedures
            if (treatmentProcedures && Array.isArray(treatmentProcedures)) {
                const proceduresData = treatmentProcedures
                    .filter(proc => proc.question && proc.question.trim() !== '')
                    .map(proc => ({
                        question: proc.question,
                        isActive: proc.isActive,
                        description: proc.description,
                        image: proc.image,
                        hyperlocalId: newDepartment.id
                    }));
                if (proceduresData.length > 0) {
                    await TreatmentProcedure.bulkCreate(proceduresData);
                }
            }

            // Add benefits
            if (benefitsProcedures && Array.isArray(benefitsProcedures)) {
                const benefitData = benefitsProcedures
                    .filter(proc => proc.title && proc.title.trim() !== '')
                    .map(proc => ({
                        benifitTitle: proc.title,
                        benifitDescription: proc.description,
                        benifitImage: proc.image,
                        hyperlocalId: newDepartment.id
                    }));
                if (benefitData.length > 0) {
                    await HyperlocalBenifit.bulkCreate(benefitData);
                }
            }

            // Add comprehensive care
            if (comprehensiveProcedures && Array.isArray(comprehensiveProcedures)) {
                const comprehensiveData = comprehensiveProcedures
                    .filter(proc => proc.title && proc.title.trim() !== '')
                    .map((proc, idx) => {
                        let imgPath = null;
                        const file = req.files['comprehensiveProceduresImages']?.[idx];
                        if (file) {
                            const ts = Date.now(); // Timestamp in ms
                            const ext = path.extname(file.originalname);
                            const newName = `${proc.title.replace(/\s+/g, '_')}_${ts}${ext}`;
                            const relPath = path.join('uploads', 'hyperlocal', 'compCare', newName);

                            // Rename (move) the uploaded file into public/uploads folder
                            fs.renameSync(file.path, path.join('public', relPath));
                            imgPath = newName; // Store relative path for DB
                        }

                        return {
                            comprehensiveTitle: proc.title,
                            comprehensiveDescription: proc.description,
                            comprehensiveImage: imgPath, // relative path including folder
                            hyperlocalId: newDepartment.id
                        };
                    });

                if (comprehensiveData.length > 0) {
                    await ComprehensiveCare.bulkCreate(comprehensiveData);
                }
            }

            return res.status(201).json({
                message: `HyperLocal entry created successfully`,
                hyperlocalId: newDepartment.id
            });

        } catch (error) {
            console.error('Error creating hyperlocal:', error);
            return res.status(500).json({
                message: 'Internal Server Error',
                error
            });
        }
    });
};



// BEST TREATMENTS
exports.addHyperlocalBestTreatment = async (req, res) => {
    upload.fields([
        { name: 'featured_images', maxCount: 1 },
        { name: 'featured_images_mobile', maxCount: 1 },
        { name: 'aboutus_images', maxCount: 1 },
        { name: 'sub_icon', maxCount: 1 },
        { name: 'comprehensiveProceduresImages', maxCount: 10 } // allow multiple

    ])(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        try {
            const {
                title,
                description,
                faqs,
                status,
                comprehensiveProcedures,
                benefitsProcedures,
                treatmentProcedures,
                metaTitle,
                metaDescription,
                categoryId,
                related_doctor,
                treatmentHeading,
                comprehensiveHeading
            } = req.body;

            // Process featured image
            let featured_image = req.files['featured_images'] ? req.files['featured_images'][0].path : null;
            if (featured_image) {
                featured_image = featured_image.replace(/^public[\\/]/, '');
            }
            let featured_images_mobile = req.files['featured_images_mobile'] ? req.files['featured_images_mobile'][0].path : null;

            if (featured_images_mobile) {
                featured_images_mobile = featured_images_mobile.replace(/^public[\\/]/, '');
            }
            let aboutus_images = req.files['aboutus_images'] ? req.files['aboutus_images'][0].path : null;
            if (aboutus_images) {
                aboutus_images = aboutus_images.replace(/^public[\\/]/, '');
            }
            // Fetch category
            const category = await HyperlocalCategory.findByPk(categoryId);
            if (!category) {
                return res.status(400).json({ message: 'Invalid categoryId' });
            }

            // Create the slug (category-based only)
            const titleSlug = slugify(title); // e.g., best-ortho-doctor
            let categorySlug = category.slug;

            let fullSlugBase = '';
            if (category.level === 1) {
                fullSlugBase = `${titleSlug}`;
            } else {
                const parts = category.slug.split('/');
                parts.pop(); // remove last part
                categorySlug = parts.join('/'); // remaining path
                fullSlugBase = `${categorySlug}/${titleSlug}`;
            }

            const areas = await MasterModal.findAll({
                where: { type: 'hyperlocalarea' },
                order: [['id', 'ASC']]
            });

            // Extract only the IDs
            const areaIds = areas.map(area => area.id).join(',');

            // Create only one main record
            const newDepartment = await HyperLocal.create({
                title: title,
                slug: fullSlugBase,
                description,
                featured_image,
                aboutus_images,
                faqs,
                status,
                metaTitle,
                templateId: 2,
                metaDescription,
                treatmentHeading,
                comprehensiveHeading,
                related_doctor,
                featured_images_mobile,
                areaId: areaIds, // storing comma-separated area IDs (you can process to array if needed)
                categoryId: category.id
            });

            // Add treatment procedures
            if (treatmentProcedures && Array.isArray(treatmentProcedures)) {
                const proceduresData = treatmentProcedures
                    .filter(proc => proc.question && proc.question.trim() !== '')
                    .map(proc => ({
                        question: proc.question,
                        isActive: proc.isActive,
                        description: proc.description,
                        image: proc.image,
                        hyperlocalId: newDepartment.id
                    }));
                if (proceduresData.length > 0) {
                    await TreatmentProcedure.bulkCreate(proceduresData);
                }
            }

            // Add benefits
            if (benefitsProcedures && Array.isArray(benefitsProcedures)) {
                const benefitData = benefitsProcedures
                    .filter(proc => proc.title && proc.title.trim() !== '')
                    .map(proc => ({
                        benifitTitle: proc.title,
                        benifitDescription: proc.description,
                        benifitImage: proc.image,
                        hyperlocalId: newDepartment.id
                    }));
                if (benefitData.length > 0) {
                    await HyperlocalBenifit.bulkCreate(benefitData);
                }
            }

            // Add comprehensive care
            if (comprehensiveProcedures && Array.isArray(comprehensiveProcedures)) {
                const comprehensiveData = comprehensiveProcedures
                    .filter(proc => proc.title && proc.title.trim() !== '')
                    .map((proc, idx) => {
                        let imgPath = null;
                        const file = req.files['comprehensiveProceduresImages']?.[idx];
                        if (file) {
                            const ts = Date.now(); // Timestamp in ms
                            const ext = path.extname(file.originalname);
                            const newName = `${proc.title.replace(/\s+/g, '_')}_${ts}${ext}`;
                            const relPath = path.join('uploads', 'hyperlocal', 'compCare', newName);

                            // Rename (move) the uploaded file into public/uploads folder
                            fs.renameSync(file.path, path.join('public', relPath));
                            imgPath = newName; // Store relative path for DB
                        }

                        return {
                            comprehensiveTitle: proc.title,
                            comprehensiveDescription: proc.description,
                            comprehensiveImage: imgPath, // relative path including folder
                            hyperlocalId: newDepartment.id
                        };
                    });

                if (comprehensiveData.length > 0) {
                    await ComprehensiveCare.bulkCreate(comprehensiveData);
                }
            }

            return res.status(201).json({
                message: `HyperLocal entry created successfully`,
                hyperlocalId: newDepartment.id
            });

        } catch (error) {
            console.error('Error creating hyperlocal:', error);
            return res.status(500).json({
                message: 'Internal Server Error',
                error
            });
        }
    });
};



exports.getBestTreatmentHyperlocalbyid = async (req, res) => {
    try {
        const { id } = req.query;

        const hyperlocals = await HyperLocal.findByPk(id, {
            include: [
                {
                    model: TreatmentProcedure,
                    required: false
                },
                {
                    model: HyperlocalBenifit,
                    required: false
                },
                {
                    model: ComprehensiveCare,
                    required: false
                }
            ]
        });

        if (!hyperlocals) {
            return res.status(404).json({ message: 'No Hyperlocal found' });
        }


        res.status(200).json(hyperlocals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};




exports.updateBestTreatment = async (req, res) => {
    upload.fields([
        { name: 'featured_images', maxCount: 1 },
        { name: 'featured_images_mobile', maxCount: 1 },
        { name: 'aboutus_images', maxCount: 1 },
        { name: 'sub_icon', maxCount: 1 },
        { name: 'comprehensiveProceduresImages', maxCount: 10 }
    ])(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }
        try {
            const { id } = req.query;
            let {
                title, description, categoryId, faqs, status,
                benefitsProcedures, treatmentProcedures, comprehensiveProcedures,
                metaTitle, metaDescription, isActive, related_doctor,
                treatmentHeading, comprehensiveHeading
            } = req.body;

            if (!id || !title) {
                return res.status(400).json({ message: "Hyperlocal ID and name are required" });
            }

            description = description === 'null' || description === null ? '' : description;
            metaTitle = metaTitle === 'null' || metaTitle === null ? '' : metaTitle;
            metaDescription = metaDescription === 'null' || metaDescription === null ? '' : metaDescription;

            let parsedTreatmentProcedures = [];
            let parsedBenefitsProcedures = [];
            let parsedComprehensiveProcedures = [];

            try { if (treatmentProcedures) parsedTreatmentProcedures = JSON.parse(treatmentProcedures); } catch { return res.status(400).json({ message: 'Invalid treatmentProcedures format' }); }
            try { if (benefitsProcedures) parsedBenefitsProcedures = JSON.parse(benefitsProcedures); } catch { return res.status(400).json({ message: 'Invalid benefitsProcedures format' }); }
            try { if (comprehensiveProcedures) parsedComprehensiveProcedures = JSON.parse(comprehensiveProcedures); } catch { return res.status(400).json({ message: 'Invalid comprehensiveProcedures format' }); }

            let featured_image = req.files['featured_images']?.[0]?.path || null;
            let featured_images_mobile = req.files['featured_images_mobile']?.[0]?.path || null;
            let aboutus_images = req.files['aboutus_images']?.[0]?.path || null;

            const HyperLocalData = await HyperLocal.findOne({ where: { id } });
            if (!HyperLocalData) return res.status(404).json({ message: 'Department not found' });

            const replaceImage = (newImage, oldImage) => {
                if (newImage) {
                    if (oldImage && fs.existsSync(oldImage)) fs.unlink(oldImage, err => err && console.error(err));
                    return newImage.replace(/^public[\\/]/, '');
                }
                return oldImage;
            };

            featured_image = replaceImage(featured_image, HyperLocalData.featured_image);
            featured_images_mobile = replaceImage(featured_images_mobile, HyperLocalData.featured_images_mobile);
            aboutus_images = replaceImage(aboutus_images, HyperLocalData.aboutus_images);

            const category = await HyperlocalCategory.findByPk(categoryId);
            if (!category) return res.status(400).json({ message: 'Invalid categoryId' });

            const titleSlug = slugify(title);
            let fullSlugBase = category.level === 1
                ? `${titleSlug}`
                : `${category.slug.split('/').slice(0, -1).join('/')}/${titleSlug}`;
            const slug = fullSlugBase;

            const updatedDepartment = await HyperLocal.update(
                {
                    title, related_doctor, treatmentHeading, comprehensiveHeading, slug, categoryId,
                    description, featured_image, featured_images_mobile, aboutus_images,
                    faqs, status, metaTitle, metaDescription
                },
                { where: { id } }
            );
            if (updatedDepartment[0] === 0) return res.status(404).json({ message: 'Department not found' });

            // Treatment Procedures
            const existingTreatmentProcedures = await TreatmentProcedure.findAll({ where: { hyperlocalId: id } });
            const existingTreatmentProcedureIds = new Set(existingTreatmentProcedures.map(proc => proc.id));

            for (const procedure of parsedTreatmentProcedures) {
                if (procedure.id) {
                    await TreatmentProcedure.update(
                        { question: procedure.question, isActive: procedure.isActive, description: procedure.description },
                        { where: { id: procedure.id, hyperlocalId: id } }
                    );
                    existingTreatmentProcedureIds.delete(procedure.id);
                } else {
                    await TreatmentProcedure.create({
                        question: procedure.question, description: procedure.description,
                        isActive: procedure.isActive, hyperlocalId: id
                    });
                }
            }
            for (const procId of existingTreatmentProcedureIds) {
                await TreatmentProcedure.destroy({ where: { id: procId } });
            }

            // Benefits Procedures
            const existingBenefitsProcedures = await HyperlocalBenifit.findAll({ where: { hyperlocalId: id } });
            const existingBenefitsProceduresIds = new Set(existingBenefitsProcedures.map(proc => proc.id));

            for (const procedure of parsedBenefitsProcedures) {
                if (procedure.id) {
                    await HyperlocalBenifit.update(
                        {
                            benifitTitle: procedure.benifitTitle,
                            benifitDescription: procedure.benifitDescription,
                            benifitImage: procedure.benifitImage,
                        },
                        { where: { id: procedure.id, hyperlocalId: id } }
                    );
                    existingBenefitsProceduresIds.delete(procedure.id);
                } else {
                    await HyperlocalBenifit.create({
                        benifitTitle: procedure.benifitTitle,
                        benifitDescription: procedure.benifitDescription,
                        benifitImage: procedure.benifitImage,
                        hyperlocalId: id,
                    });
                }
            }
            for (const procId of existingBenefitsProceduresIds) {
                await HyperlocalBenifit.destroy({ where: { id: procId } });
            }

            // Comprehensive Procedures (with image handling)
            const existingComprehensiveProcedures = await ComprehensiveCare.findAll({ where: { hyperlocalId: id } });
            const existingComprehensiveProceduresMap = new Map(existingComprehensiveProcedures.map(proc => [proc.id, proc]));

            for (let idx = 0; idx < parsedComprehensiveProcedures.length; idx++) {
                const procedure = parsedComprehensiveProcedures[idx];
                let imgPath = procedure.comprehensiveImage;

                const file = req.files['comprehensiveProceduresImages']?.[idx];
                if (file) {
                    if (procedure.id && existingComprehensiveProceduresMap.has(procedure.id)) {
                        const oldImg = existingComprehensiveProceduresMap.get(procedure.id).comprehensiveImage;
                        if (oldImg) {
                            const oldPath = path.join('public', 'uploads', 'hyperlocal', 'compCare', oldImg);
                            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                        }
                    }
                    const ts = Date.now();
                    const ext = path.extname(file.originalname);
                    const newName = `${procedure.comprehensiveTitle.replace(/\s+/g, '_')}_${ts}${ext}`;
                    const relPath = path.join('uploads', 'hyperlocal', 'compCare', newName);
                    fs.renameSync(file.path, path.join('public', relPath));
                    imgPath = newName;
                }

                if (procedure.id) {
                    await ComprehensiveCare.update(
                        {
                            comprehensiveTitle: procedure.comprehensiveTitle,
                            comprehensiveDescription: procedure.comprehensiveDescription,
                            comprehensiveImage: imgPath
                        },
                        { where: { id: procedure.id, hyperlocalId: id } }
                    );
                    existingComprehensiveProceduresMap.delete(procedure.id);
                } else {
                    await ComprehensiveCare.create({
                        comprehensiveTitle: procedure.comprehensiveTitle,
                        comprehensiveDescription: procedure.comprehensiveDescription,
                        comprehensiveImage: imgPath,
                        hyperlocalId: id
                    });
                }
            }

            for (const [procId, procData] of existingComprehensiveProceduresMap) {
                if (procData.comprehensiveImage) {
                    const oldPath = path.join('public', 'uploads', 'hyperlocal', 'compCare', procData.comprehensiveImage);
                    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                }
                await ComprehensiveCare.destroy({ where: { id: procId } });
            }

            return res.status(200).json({ message: "Hyperlocal updated successfully" });

        } catch (error) {
            console.error('Error updating Department:', error);
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    });
};







// BEST Doctor
exports.addHyperlocalBestDoctor = async (req, res) => {
    upload.fields([
        { name: 'featured_images', maxCount: 1 },
        { name: 'featured_images_mobile', maxCount: 1 },
        { name: 'aboutus_images', maxCount: 1 },
        { name: 'sub_icon', maxCount: 1 },
        { name: 'comprehensiveProceduresImages', maxCount: 10 } // allow multiple
    ])(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        try {
            const {
                title,
                description,
                faqs,
                status,
                comprehensiveProcedures,
                benefitsProcedures,
                treatmentProcedures,
                metaTitle,
                metaDescription,
                categoryId,
                related_doctor,
                treatmentHeading,
                comprehensiveHeading
            } = req.body;

            // Process featured image
            let featured_image = req.files['featured_images'] ? req.files['featured_images'][0].path : null;
            if (featured_image) {
                featured_image = featured_image.replace(/^public[\\/]/, '');
            }
            let featured_images_mobile = req.files['featured_images_mobile'] ? req.files['featured_images_mobile'][0].path : null;
            if (featured_images_mobile) {
                featured_images_mobile = featured_images_mobile.replace(/^public[\\/]/, '');
            }
            let aboutus_images = req.files['aboutus_images'] ? req.files['aboutus_images'][0].path : null;
            if (aboutus_images) {
                aboutus_images = aboutus_images.replace(/^public[\\/]/, '');
            }

            // Fetch category
            const category = await HyperlocalCategory.findByPk(categoryId);
            if (!category) {
                return res.status(400).json({ message: 'Invalid categoryId' });
            }

            // Create the slug (category-based only)
            const titleSlug = slugify(title); // e.g., best-ortho-doctor
            let categorySlug = category.slug;

            let fullSlugBase = '';
            if (category.level === 1) {
                fullSlugBase = `${titleSlug}`;
            } else {
                const parts = category.slug.split('/');
                parts.pop(); // remove last part
                categorySlug = parts.join('/'); // remaining path
                fullSlugBase = `${categorySlug}/${titleSlug}`;
            }

            const areas = await MasterModal.findAll({
                where: { type: 'hyperlocalarea' },
                order: [['id', 'ASC']]
            });

            // Extract only the IDs
            const areaIds = areas.map(area => area.id).join(',');

            // Create only one main record
            const newDepartment = await HyperLocal.create({
                title: title,
                slug: fullSlugBase,
                description,
                featured_image,
                featured_images_mobile,
                faqs,
                aboutus_images,
                status,
                metaTitle,
                templateId: 3,
                metaDescription,
                related_doctor,
                treatmentHeading,
                comprehensiveHeading,
                areaId: areaIds, // storing comma-separated area IDs (you can process to array if needed)
                categoryId: category.id
            });

            // Add treatment procedures
            if (treatmentProcedures && Array.isArray(treatmentProcedures)) {
                const proceduresData = treatmentProcedures
                    .filter(proc => proc.question && proc.question.trim() !== '')
                    .map(proc => ({
                        question: proc.question,
                        isActive: proc.isActive,
                        description: proc.description,
                        image: proc.image,
                        hyperlocalId: newDepartment.id
                    }));
                if (proceduresData.length > 0) {
                    await TreatmentProcedure.bulkCreate(proceduresData);
                }
            }

            // Add benefits
            if (benefitsProcedures && Array.isArray(benefitsProcedures)) {
                const benefitData = benefitsProcedures
                    .filter(proc => proc.title && proc.title.trim() !== '')
                    .map(proc => ({
                        benifitTitle: proc.title,
                        benifitDescription: proc.description,
                        benifitImage: proc.image,
                        hyperlocalId: newDepartment.id
                    }));
                if (benefitData.length > 0) {
                    await HyperlocalBenifit.bulkCreate(benefitData);
                }
            }

            // Add comprehensive care
            if (comprehensiveProcedures && Array.isArray(comprehensiveProcedures)) {
                const comprehensiveData = comprehensiveProcedures
                    .filter(proc => proc.title && proc.title.trim() !== '')
                    .map((proc, idx) => {
                        let imgPath = null;
                        const file = req.files['comprehensiveProceduresImages']?.[idx];
                        if (file) {
                            const ts = Date.now(); // Timestamp in ms
                            const ext = path.extname(file.originalname);
                            const newName = `${proc.title.replace(/\s+/g, '_')}_${ts}${ext}`;
                            const relPath = path.join('uploads', 'hyperlocal', 'compCare', newName);

                            // Rename (move) the uploaded file into public/uploads folder
                            fs.renameSync(file.path, path.join('public', relPath));
                            imgPath = newName; // Store relative path for DB
                        }

                        return {
                            comprehensiveTitle: proc.title,
                            comprehensiveDescription: proc.description,
                            comprehensiveImage: imgPath, // relative path including folder
                            hyperlocalId: newDepartment.id
                        };
                    });

                if (comprehensiveData.length > 0) {
                    await ComprehensiveCare.bulkCreate(comprehensiveData);
                }
            }


            return res.status(201).json({
                message: `HyperLocal entry created successfully`,
                hyperlocalId: newDepartment.id
            });

        } catch (error) {
            console.error('Error creating hyperlocal:', error);
            return res.status(500).json({
                message: 'Internal Server Error',
                error
            });
        }
    });
};

exports.getBestDoctorHyperlocalbyid = async (req, res) => {
    try {
        const { id } = req.query;

        const hyperlocals = await HyperLocal.findByPk(id, {
            include: [
                {
                    model: TreatmentProcedure,
                    required: false
                },
                {
                    model: HyperlocalBenifit,
                    required: false
                },
                {
                    model: ComprehensiveCare,
                    required: false
                }
            ]
        });

        if (!hyperlocals) {
            return res.status(404).json({ message: 'No Hyperlocal found' });
        }


        res.status(200).json(hyperlocals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

exports.updateBestDoctor = async (req, res) => {
    upload.fields([
        { name: 'featured_images', maxCount: 1 },
        { name: 'featured_images_mobile', maxCount: 1 },
        { name: 'aboutus_images', maxCount: 1 },
        { name: 'sub_icon', maxCount: 1 },
        { name: 'comprehensiveProceduresImages', maxCount: 10 }
    ])(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        try {
            const { id } = req.query;
            let {
                title, description, categoryId, faqs, status,
                benefitsProcedures, treatmentProcedures, comprehensiveProcedures,
                metaTitle, metaDescription, related_doctor, treatmentHeading, comprehensiveHeading
            } = req.body;

            if (!id || !title) {
                return res.status(400).json({ message: "Hyperlocal ID and name are required" });
            }

            description = description === 'null' ? '' : description;
            metaTitle = metaTitle === 'null' ? '' : metaTitle;
            metaDescription = metaDescription === 'null' ? '' : metaDescription;

            let parsedTreatmentProcedures = [];
            let parsedBenefitsProcedures = [];
            let parsedComprehensiveProcedures = [];

            try { if (treatmentProcedures) parsedTreatmentProcedures = JSON.parse(treatmentProcedures); } catch { return res.status(400).json({ message: 'Invalid treatmentProcedures format' }); }
            try { if (benefitsProcedures) parsedBenefitsProcedures = JSON.parse(benefitsProcedures); } catch { return res.status(400).json({ message: 'Invalid benefitsProcedures format' }); }
            try { if (comprehensiveProcedures) parsedComprehensiveProcedures = JSON.parse(comprehensiveProcedures); } catch { return res.status(400).json({ message: 'Invalid comprehensiveProcedures format' }); }

            let featured_image = req.files['featured_images']?.[0]?.path || null;
            let featured_images_mobile = req.files['featured_images_mobile']?.[0]?.path || null;
            let aboutus_images = req.files['aboutus_images']?.[0]?.path || null;

            const HyperLocalData = await HyperLocal.findOne({ where: { id } });
            if (!HyperLocalData) return res.status(404).json({ message: 'Department not found' });

            const replaceImage = (newImage, oldImage) => {
                if (newImage) {
                    if (oldImage && fs.existsSync(oldImage)) fs.unlink(oldImage, err => err && console.error(err));
                    return newImage.replace(/^public[\\/]/, '');
                }
                return oldImage;
            };

            featured_image = replaceImage(featured_image, HyperLocalData.featured_image);
            featured_images_mobile = replaceImage(featured_images_mobile, HyperLocalData.featured_images_mobile);
            aboutus_images = replaceImage(aboutus_images, HyperLocalData.aboutus_images);

            const category = await HyperlocalCategory.findByPk(categoryId);
            if (!category) return res.status(400).json({ message: 'Invalid categoryId' });

            const titleSlug = slugify(title);
            let fullSlugBase = category.level === 1
                ? `${titleSlug}`
                : `${category.slug.split('/').slice(0, -1).join('/')}/${titleSlug}`;

            const slug = fullSlugBase;

            const updatedDepartment = await HyperLocal.update(
                {
                    title, related_doctor, status, treatmentHeading, comprehensiveHeading, slug,
                    categoryId, description, featured_image, aboutus_images, featured_images_mobile,
                    faqs, metaTitle, metaDescription
                },
                { where: { id } }
            );

            if (updatedDepartment[0] === 0) return res.status(404).json({ message: 'Department not found' });

            // Treatment Procedures
            const existingTreatmentProcedures = await TreatmentProcedure.findAll({ where: { hyperlocalId: id } });
            const existingTreatmentProcedureIds = new Set(existingTreatmentProcedures.map(proc => proc.id));

            for (const procedure of parsedTreatmentProcedures) {
                if (procedure.id) {
                    await TreatmentProcedure.update(
                        { question: procedure.question, isActive: procedure.isActive, description: procedure.description },
                        { where: { id: procedure.id, hyperlocalId: id } }
                    );
                    existingTreatmentProcedureIds.delete(procedure.id);
                } else {
                    await TreatmentProcedure.create({
                        question: procedure.question, description: procedure.description, isActive: procedure.isActive, hyperlocalId: id
                    });
                }
            }
            for (const procId of existingTreatmentProcedureIds) {
                await TreatmentProcedure.destroy({ where: { id: procId } });
            }

            // Benefits Procedures
            const existingBenefitsProcedures = await HyperlocalBenifit.findAll({ where: { hyperlocalId: id } });
            const existingBenefitsProceduresIds = new Set(existingBenefitsProcedures.map(proc => proc.id));

            for (const procedure of parsedBenefitsProcedures) {
                if (procedure.id) {
                    await HyperlocalBenifit.update(
                        {
                            benifitTitle: procedure.benifitTitle,
                            benifitDescription: procedure.benifitDescription,
                            benifitImage: procedure.benifitImage,
                        },
                        { where: { id: procedure.id, hyperlocalId: id } }
                    );
                    existingBenefitsProceduresIds.delete(procedure.id);
                } else {
                    await HyperlocalBenifit.create({
                        benifitTitle: procedure.benifitTitle,
                        benifitDescription: procedure.benifitDescription,
                        benifitImage: procedure.benifitImage,
                        hyperlocalId: id,
                    });
                }
            }
            for (const procId of existingBenefitsProceduresIds) {
                await HyperlocalBenifit.destroy({ where: { id: procId } });
            }

            // Comprehensive Procedures
            const existingComprehensiveProcedures = await ComprehensiveCare.findAll({ where: { hyperlocalId: id } });
            const existingComprehensiveProceduresMap = new Map(existingComprehensiveProcedures.map(proc => [proc.id, proc]));

            for (let idx = 0; idx < parsedComprehensiveProcedures.length; idx++) {
                const procedure = parsedComprehensiveProcedures[idx];
                let imgPath = procedure.comprehensiveImage;

                const file = req.files['comprehensiveProceduresImages']?.[idx];
                if (file) {
                    if (procedure.id && existingComprehensiveProceduresMap.has(procedure.id)) {
                        const oldImg = existingComprehensiveProceduresMap.get(procedure.id).comprehensiveImage;
                        if (oldImg) {
                            const oldPath = path.join('public', 'uploads', 'hyperlocal', 'compCare', oldImg);
                            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                        }
                    }
                    const ts = Date.now();
                    const ext = path.extname(file.originalname);
                    const newName = `${procedure.comprehensiveTitle.replace(/\s+/g, '_')}_${ts}${ext}`;
                    const relPath = path.join('uploads', 'hyperlocal', 'compCare', newName);
                    fs.renameSync(file.path, path.join('public', relPath));
                    imgPath = newName;
                }

                if (procedure.id) {
                    await ComprehensiveCare.update(
                        {
                            comprehensiveTitle: procedure.comprehensiveTitle,
                            comprehensiveDescription: procedure.comprehensiveDescription,
                            comprehensiveImage: imgPath
                        },
                        { where: { id: procedure.id, hyperlocalId: id } }
                    );
                    existingComprehensiveProceduresMap.delete(procedure.id);
                } else {
                    await ComprehensiveCare.create({
                        comprehensiveTitle: procedure.comprehensiveTitle,
                        comprehensiveDescription: procedure.comprehensiveDescription,
                        comprehensiveImage: imgPath,
                        hyperlocalId: id
                    });
                }
            }

            // Delete removed comprehensive procedures
            for (const [procId, procData] of existingComprehensiveProceduresMap) {
                if (procData.comprehensiveImage) {
                    const oldPath = path.join('public', 'uploads', 'hyperlocal', 'compCare', procData.comprehensiveImage);
                    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                }
                await ComprehensiveCare.destroy({ where: { id: procId } });
            }

            return res.status(200).json({ message: "Hyperlocal updated successfully" });

        } catch (error) {
            console.error('Error updating Department:', error);
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    });
};


exports.getBestAHospitalHyperlocalFrontend = async (req, res) => {
    try {
        let { slug } = req.query;

        // ✅ Catch-all route gives array, join it to a full slug
        if (Array.isArray(slug)) {
            slug = slug.join('/');
        }

        // Step 1: Split slug into actualSlug and area
        const [actualSlug, areaName] = slug.split('-in-');

        if (!actualSlug || !areaName) {
            return res.status(400).json({ message: 'Invalid slug format.' });
        }

        // Step 2: Find area ID from MasterModal
        const matchedArea = await MasterModal.findOne({
            where: {
                type: 'hyperlocalarea',
                slug: areaName
            }
        });

        if (!matchedArea) {
            return res.status(404).json({ status: 404, message: `Area "${areaName}" not found in master list.` });
        }

        const areaId = matchedArea.id.toString();

        // Step 3: Fetch the hyperlocal entry
        const hyperlocal = await HyperLocal.findOne({
            where: {
                slug: actualSlug,
                templateId: "1", // Best Doctor
                areaId: {
                    [Op.like]: `%${areaId}%`
                }
            },
            include: [
                { model: TreatmentProcedure, required: false },
                { model: HyperlocalBenifit, required: false },
                { model: ComprehensiveCare, required: false },
            ]
        });

        if (!hyperlocal) {
            return res.status(404).json({ message: 'No Hyperlocal found for this area and slug.' });
        }
        // Step 5: Return response
        // return res.status(200).json(hyperlocal);
        return res.status(200).json({
            status: 200,
            message: 'Success',
            data: {
                hyperlocal,
                matchedArea,
            }
        });


    } catch (error) {
        console.error('Error fetching hyperlocal by slug:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


exports.getBestTreatmentsHyperlocalFrontend = async (req, res) => {
    try {
        let { slug } = req.query;

        // ✅ Catch-all route gives array, join it to a full slug
        if (Array.isArray(slug)) {
            slug = slug.join('/');
        }

        console.log('Joined slug:', slug);

        // Step 1: Split slug into actualSlug and area
        const [actualSlug, areaName] = slug.split('-in-');

        if (!actualSlug || !areaName) {
            return res.status(400).json({ message: 'Invalid slug format.' });
        }

        // Step 2: Find area ID from MasterModal
        const matchedArea = await MasterModal.findOne({
            where: {
                type: 'hyperlocalarea',
                slug: areaName
            }
        });

        if (!matchedArea) {
            return res.status(404).json({ message: `Area "${areaName}" not found in master list.` });
        }

        const areaId = matchedArea.id.toString();

        // Step 3: Fetch the hyperlocal entry
        const hyperlocal = await HyperLocal.findOne({
            where: {
                slug: actualSlug,
                templateId: "2", // Best Doctor
                areaId: {
                    [Op.like]: `%${areaId}%`
                }
            },
            include: [
                { model: TreatmentProcedure, required: false },
                { model: HyperlocalBenifit, required: false },
                { model: ComprehensiveCare, required: false },
            ]
        });

        if (!hyperlocal) {
            return res.status(404).json({ message: 'No Hyperlocal found for this area and slug.' });
        }

        // Step 4: Fetch related doctors
        let relatedDoctors = [];
        if (hyperlocal.related_doctor) {
            const doctorIds = hyperlocal.related_doctor
                .split(',')
                .map(id => parseInt(id.trim()))
                .filter(id => !isNaN(id));

            if (doctorIds.length > 0) {
                relatedDoctors = await Doctor.findAll({
                    where: {
                        id: { [Op.in]: doctorIds }
                    }
                });
            }
        }

        // Step 5: Return response
        // return res.status(200).json({
        //     ...hyperlocal.toJSON(),
        //     relatedDoctors: relatedDoctors.map(doc => doc.toJSON())
        // });
        const hyperlocalData = hyperlocal.toJSON();
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: {
                hyperlocal: {
                    ...hyperlocalData,
                    relatedDoctors: relatedDoctors.map(doc => doc.toJSON()),
                },
                matchedArea: matchedArea?.toJSON(), // if Sequelize instance
            }
        });


    } catch (error) {
        console.error('Error fetching hyperlocal by slug:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

exports.getBestDoctorsHyperlocalFrontend = async (req, res) => {
    try {
        let { slug } = req.query;

        // ✅ Catch-all route gives array, join it to a full slug
        if (Array.isArray(slug)) {
            slug = slug.join('/');
        }

        console.log('Joined slug:', slug);

        // Step 1: Split slug into actualSlug and area
        const [actualSlug, areaName] = slug.split('-in-');

        if (!actualSlug || !areaName) {
            return res.status(400).json({ message: 'Invalid slug format.' });
        }

        // Step 2: Find area ID from MasterModal
        const matchedArea = await MasterModal.findOne({
            where: {
                type: 'hyperlocalarea',
                slug: areaName
            }
        });

        if (!matchedArea) {
            return res.status(404).json({ status: 404, message: `Area "${areaName}" not found in master list.` });
        }

        const areaId = matchedArea.id.toString();

        // Step 3: Fetch the hyperlocal entry
        const hyperlocal = await HyperLocal.findOne({
            where: {
                slug: actualSlug,
                templateId: "3", // Best Doctor
                areaId: {
                    [Op.like]: `%${areaId}%`
                }
            },
            include: [
                { model: TreatmentProcedure, required: false },
                { model: HyperlocalBenifit, required: false },
                { model: ComprehensiveCare, required: false },
            ]
        });

        if (!hyperlocal) {
            return res.status(404).json({ message: 'No Hyperlocal found for this area and slug.' });
        }

        // Step 4: Fetch related doctors
        let relatedDoctors = [];
        if (hyperlocal.related_doctor) {
            const doctorIds = hyperlocal.related_doctor
                .split(',')
                .map(id => parseInt(id.trim()))
                .filter(id => !isNaN(id));

            if (doctorIds.length > 0) {
                relatedDoctors = await Doctor.findAll({
                    where: {
                        id: { [Op.in]: doctorIds }
                    }
                });
            }
        }

        // Step 5: Return response
        // return res.status(200).json({
        //     ...hyperlocal.toJSON(),
        //     relatedDoctors: relatedDoctors.map(doc => doc.toJSON())
        // });
        const hyperlocalData = hyperlocal.toJSON();
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: {
                hyperlocal: {
                    ...hyperlocalData,
                    relatedDoctors: relatedDoctors.map(doc => doc.toJSON()),
                },
                matchedArea: matchedArea?.toJSON(), // if Sequelize instance
            }
        });

    } catch (error) {
        console.error('Error fetching hyperlocal by slug:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};








































/****Single Hyperlocal page start*****/
// exports.getbesthospitalHyperlocalbyid = async (req, res) => {
//     const { id } = req.query;

//     try {
//         // Fetch the doctor by slug
//         const hyperlocals = await HyperLocal.findOne({ where: { id } });

//         if (!hyperlocals) {
//             return res.status(404).json({ message: "hyperlocals not found" });
//         }

//         // Fetch specialty names from mastermodal based on specialty IDs
//         const categoryIds = hyperlocals.categoryId;
//         const categories = await HyperlocalCategory.findAll({
//             where: {
//                 id: categoryIds
//             },
//             attributes: ['name']
//         });

//         // Extract master names into a comma-separated string
//         const categoryNames = categories.map(category => category.name).join(', ');

//         // Construct the full response with specialty names
//         const response = {
//             ...hyperlocals.toJSON(),
//             categoryName: categoryNames // Add specialty names to the response
//         };

//         // Set no-cache headers
//         res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
//         res.setHeader("Pragma", "no-cache");
//         res.setHeader("Expires", "0");

//         // Send the response
//         res.status(200).json(response);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error", error });
//     }
// };


// Multiple record API
// exports.addHyperlocalNearMe = async (req, res) => {
//     upload.fields([
//         { name: 'featured_images', maxCount: 1 },
//         { name: 'featured_images_mobile', maxCount: 1 },
//         { name: 'sub_icon', maxCount: 1 }
//     ])(req, res, async (err) => {
//         if (err) {
//             return res.status(400).json({ message: 'File upload failed', error: err.message });
//         }

//         try {
//             const {
//                 title,
//                 description,
//                 faqs,
//                 status,
//                 comprehensiveProcedures,
//                 benefitsProcedures,
//                 treatmentProcedures,
//                 metaTitle,
//                 metaDescription,
//                 categoryId
//             } = req.body;

//             // Save featured image path (remove 'public/' prefix)
//             let featured_image = req.files['featured_images'] ? req.files['featured_images'][0].path : null;
//             if (featured_image) {
//                 featured_image = featured_image.replace(/^public[\\/]/, '');
//             }

//             // Fetch the selected category
//             const category = await HyperlocalCategory.findByPk(categoryId);
//             if (!category) {
//                 return res.status(400).json({ message: 'Invalid categoryId' });
//             }
//             console.log('category', category);

//             // Fetch all hyperlocal areas
//             const areas = await MasterModal.findAll({
//                 where: { type: 'hyperlocalarea' },
//                 order: [['id', 'ASC']]
//             });

//             const created = [];

//             for (const area of areas) {
//                 const areaSlug = slugify(area.masterName); // e.g., pune
//                 const titleSlug = slugify(title);          // e.g., best-back-pain-hospital
//                 let categorySlug = category.slug;        // e.g., ortho/spine

//                 let fullSlugBase = '';
//                 if (category.level === 1) {
//                     fullSlugBase = `best-hospital/${titleSlug}-in-${areaSlug}`;
//                 } else {
//                     const parts = category.slug.split('/');
//                     parts.pop(); // remove last part
//                     categorySlug = parts.join('/'); // remaining path
//                     fullSlugBase = `best-hospital/${categorySlug}/${titleSlug}-in-${areaSlug}`;
//                 }

//                 // const finalSlug = await generateUniqueSlug(fullSlugBase); // ensures uniqueness


//                 // Create main HyperLocal entry
//                 const newDepartment = await HyperLocal.create({
//                     title: title,
//                     slug: fullSlugBase,
//                     description,
//                     featured_image,
//                     faqs,
//                     status,
//                     metaTitle,
//                     metaDescription,
//                     areaId: area.id,
//                     categoryId: category.id
//                 });

//                 // Add treatment procedures
//                 if (treatmentProcedures && Array.isArray(treatmentProcedures)) {
//                     const proceduresData = treatmentProcedures
//                         .filter(proc => proc.question && proc.question.trim() !== '')
//                         .map(proc => ({
//                             question: proc.question,
//                             isActive: proc.isActive,
//                             description: proc.description,
//                             image: proc.image,
//                             hyperlocalId: newDepartment.id
//                         }));
//                     if (proceduresData.length > 0) {
//                         await TreatmentProcedure.bulkCreate(proceduresData);
//                     }
//                 }

//                 // Add benefits
//                 if (benefitsProcedures && Array.isArray(benefitsProcedures)) {
//                     const benefitData = benefitsProcedures
//                         .filter(proc => proc.title && proc.title.trim() !== '')
//                         .map(proc => ({
//                             benifitTitle: proc.title,
//                             benifitDescription: proc.description,
//                             benifitImage: proc.image,
//                             hyperlocalId: newDepartment.id
//                         }));
//                     if (benefitData.length > 0) {
//                         await HyperlocalBenifit.bulkCreate(benefitData);
//                     }
//                 }

//                 // Add comprehensive care
//                 if (comprehensiveProcedures && Array.isArray(comprehensiveProcedures)) {
//                     const comprehensiveData = comprehensiveProcedures
//                         .filter(proc => proc.title && proc.title.trim() !== '')
//                         .map(proc => ({
//                             comprehensiveTitle: proc.title,
//                             comprehensiveDescription: proc.description,
//                             comprehensiveImage: proc.image,
//                             hyperlocalId: newDepartment.id
//                         }));
//                     if (comprehensiveData.length > 0) {
//                         await ComprehensiveCare.bulkCreate(comprehensiveData);
//                     }
//                 }

//                 created.push(newDepartment.id);
//             }

//             return res.status(201).json({
//                 message: `${created.length} HyperLocal entries created (one for each area)`,
//                 departmentIds: created
//             });

//         } catch (error) {
//             console.error('Error creating hyperlocals:', error);
//             return res.status(500).json({
//                 message: 'Internal Server Error',
//                 error
//             });
//         }
//     });
// };




// const generateUniqueSlug = async (title) => {
//     let baseSlug = slugify(title); // Generate initial slug
//     let uniqueSlug = baseSlug;
//     let counter = 1;

//     // Check if the slug exists, and keep incrementing until a unique slug is found
//     while (await HyperLocal.findOne({ where: { slug: uniqueSlug } })) {
//         uniqueSlug = `${baseSlug}-${counter}`;
//         counter++;
//     }

//     return uniqueSlug;
// };


// const slugify = (text) => {
//     return text
//         .toString()  // Convert to string
//         .toLowerCase()  // Convert to lowercase
//         .trim()  // Remove whitespace from both sides
//         .replace(/\s+/g, '-')  // Replace spaces with -
//         .replace(/[^\w\-]+/g, '')  // Remove all non-word characters
//         .replace(/\-\-+/g, '-');  // Replace multiple - with single -
// };


// exports.addHyperlocalNearMe = async (req, res) => {
//     upload.fields([{ name: 'featured_images', maxCount: 1 }, { name: 'featured_images_mobile', maxCount: 1 }, { name: 'sub_icon', maxCount: 1 }])(req, res, async (err) => {

//         if (err) {
//             return res.status(400).json({ message: 'File upload failed', error: err.message });
//         }
//         try {
//             const {
//                 title,
//                 description,
//                 faqs,
//                 status,
//                 comprehensiveProcedures,
//                 benefitsProcedures,
//                 treatmentProcedures,
//                 metaTitle,
//                 metaDescription,
//             } = req.body;

//             // Generate a unique slug
//             const slug = await generateUniqueSlug(title);

//             // Save the image paths if available
//             let featured_image = req.files['featured_images'] ? req.files['featured_images'][0].path : null;
//             if (featured_image) {
//                 featured_image = featured_image.replace(/^public[\\/]/, '');
//             }

//             // Create a new department
//             const newDepartment = await HyperLocal.create({
//                 title,
//                 slug,
//                 description,
//                 featured_image,
//                 faqs,
//                 status,
//                 metaTitle,
//                 metaDescription,
//             });
//             // Check if treatment procedures are provided
//             if (treatmentProcedures && Array.isArray(treatmentProcedures)) {
//                 const proceduresData = treatmentProcedures
//                     .filter(proc => proc.question && proc.question.trim() !== '') // Ensure question has a value
//                     .map(proc => ({
//                         question: proc.question,
//                         isActive: proc.isActive,
//                         description: proc.description,
//                         image: proc.image, // Assuming image is a file object
//                         hyperlocalId: newDepartment.id // Link to the newly created department
//                     }));

//                 // Store treatment procedures in the database if there are valid entries
//                 if (proceduresData.length > 0) {
//                     await TreatmentProcedure.bulkCreate(proceduresData);
//                 }
//             }

//             // Check if benefitsProceduresare provided and have a valid title
//             if (benefitsProcedures && Array.isArray(benefitsProcedures)) {
//                 const benfitData = benefitsProcedures
//                     .filter(proc => proc.title && proc.title.trim() !== '')
//                     .map(proc => ({
//                         benifitTitle: proc.title,
//                         benifitDescription: proc.description,
//                         benifitImage: proc.image,
//                         hyperlocalId: newDepartment.id
//                     }));


//                 if (benfitData.length > 0) {
//                     await HyperlocalBenifit.bulkCreate(benfitData);
//                 }
//             }
//             // Check if comprehensiveProcedures provided and have a valid title
//             if (comprehensiveProcedures && Array.isArray(comprehensiveProcedures)) {

//                 const comprehensiveData = comprehensiveProcedures
//                     .filter(proc => proc.title && proc.title.trim() !== '')
//                     .map(proc => ({
//                         comprehensiveTitle: proc.title,
//                         comprehensiveDescription: proc.description,
//                         comprehensiveImage: proc.image,
//                         hyperlocalId: newDepartment.id
//                     }));


//                 if (comprehensiveData.length > 0) {
//                     await ComprehensiveCare.bulkCreate(comprehensiveData);
//                 }
//             }
//             // Send a success response with the ID of the new department
//             res.status(201).json({
//                 message: 'Hyperlocal created successfully',
//                 DepartmentId: newDepartment.id
//             });

//         } catch (error) {
//             // Log and return any errors
//             console.error('Error creating department:', error);
//             res.status(500).json({
//                 message: 'Internal Server Error',
//                 error
//             });
//         }
//     });
// };


// exports.getCategoryList = async (req, res) => {
//   try {
//     const categories = await HyperlocalCategory.findAll({
//       where: { parent_id: null }, // Top-level only
//       include: [
//         {
//           model: HyperlocalCategory,
//           as: 'children',
//           include: [
//             {
//               model: HyperlocalCategory,
//               as: 'children',
//               include: [
//                 {
//                   model: HyperlocalCategory,
//                   as: 'children'
//                 },
//               ]
//             }
//           ]
//         }
//       ],
//       order: [['name', 'ASC']],
//     });

//     return res.status(200).json({
//       message: 'Category list fetched successfully',
//       data: categories,
//     });
//   } catch (err) {
//     console.error('Get Category List Error:', err);
//     return res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };


