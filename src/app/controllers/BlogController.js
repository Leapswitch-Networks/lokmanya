const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const env = require('@/configs/constant');
// const { sendError, sendResponse, sendEmail, checkModules } = require('../helpers');
// const { BASE_URL } = require("@/configs/constant.js");
// const User = require('@/app/models/UserModal.js');
const { v4: uuidv4 } = require('uuid');
const Doctor = require('@/app/models/DoctorModal.js');
const multer = require('multer');
const path = require('path');
// const { Op, Sequelize, fn, literal, where  } = require('sequelize');
const fs = require('fs');
// const sequelize = require('@/configs/database.js');
// const { body, validationResult } = require('express-validator');
// const Blog = require('../models/Blog.js');
const Blog = require('@/app/models/Blog.js');
const Leads = require('@/app/models/Leads.js');
const Category = require('@/app/models/Category.js');




// Define storage for the images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/blog/');
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
const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'blog');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}




exports.addBlog = async (req, res) => {
    upload.fields([{ name: 'thumbnil_image', maxCount: 1 }, { name: 'banner_image', maxCount: 1 }])(req, res, async (err) => {

        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        try {
            const { title, slug, description, doctor, category, publish_date, tags, treatment, author, related_doctor, status, metaTitle, metaDescription, blogSchema } = req.body;
            // Save the image paths if available
            // const thumbnil_image = req.files['thumbnil_image'] ? req.files['thumbnil_image'][0].path : null;
            // const banner_image = req.files['banner_image'] ? req.files['banner_image'][0].path : null;

            const thumbnil_image = req.files['thumbnil_image']
                ? req.files['thumbnil_image'][0].path.replace(/^public/, '')
                : null;

            const banner_image = req.files['banner_image']
                ? req.files['banner_image'][0].path.replace(/^public/, '')
                : null;


            const newBlog = await Blog.create({
                title,
                slug,
                description,
                category,
                thumbnil_image,
                banner_image,
                publish_date,
                tags,
                treatment,
                author,
                related_doctor,
                status,
                metaTitle,
                metaDescription,
                blogSchema,
                doctor

            });

            res.status(201).json({ message: 'Blog created successfully', Blog: newBlog });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    });
};


exports.updateBlog = (req, res) => {
    const { id } = req.query;
    // upload.single('thumbnil_image')(req, res, async (err) => {
    //     if (err) {
    //         return res.status(400).json({ message: 'File upload failed', error: err.message });
    //     }
    upload.fields([{ name: 'thumbnil_image', maxCount: 1 }, { name: 'banner_image', maxCount: 1 }])(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        try {
            const { title, slug, description, doctor, category, publish_date, author, status, metaTitle, metaDescription, blogSchema } = req.body;
            // let featured_images = req.file ? req.file.path : null;
            // let thumbnil_image = req.files['thumbnil_image'] ? req.files['thumbnil_image'][0].path : null;
            // let banner_image = req.files['banner_image'] ? req.files['banner_image'][0].path : null;
            let thumbnil_image = req.files['thumbnil_image']
                ? req.files['thumbnil_image'][0].path.replace(/^public/, '')
                : null;

            let banner_image = req.files['banner_image']
                ? req.files['banner_image'][0].path.replace(/^public/, '')
                : null;

            // Find the existing doctor to get the current image path
            const Blogs = await Blog.findOne({ where: { id } });

            if (!Blogs) {
                return res.status(404).json({ message: 'Blog not found' });
            }

            if (thumbnil_image) {
                // Delete the old image if a new one is uploaded
                if (Blogs.thumbnil_image) {
                    fs.unlink(Blogs.thumbnil_image, (err) => {
                        if (err) {
                            console.error('Failed to delete old image:', err);
                        }
                    });
                }
            } else {
                thumbnil_image = Blogs.thumbnil_image;
            }

            if (banner_image) {
                // Delete the old image if a new one is uploaded
                if (Blogs.banner_image) {
                    fs.unlink(Blogs.banner_image, (err) => {
                        if (err) {
                            console.error('Failed to delete old image:', err);
                        }
                    });
                }
            } else {
                banner_image = Blogs.banner_image;
            }

            const updatedBLog = await Blog.update(
                {
                    title,
                    slug,
                    description,
                    category,
                    thumbnil_image,
                    banner_image,
                    publish_date,
                    author,
                    status,
                    metaTitle,
                    metaDescription,
                    doctor,
                    blogSchema
                },
                { where: { id } }
            );

            if (updatedBLog[0] === 0) {
                return res.status(404).json({ message: 'Blog not found' });
            }

            res.status(200).json({ message: 'Blog updated successfully' });
        } catch (error) {
            // sendError(res, error);
            // res.status(500).json({ message: 'Internal Server Error', error });
        }
    });
};

exports.getBlog = async (req, res) => {

    try {
        const { department, status, searchTerm, startdate, enddate } = req.query;

        let filter = {};

        // Search term filter
        if (searchTerm) {
            filter[Op.or] = [
                { title: { [Op.like]: `%${searchTerm}%` } },
            ];
        } else {


            // Status filter
            if (status) {
                filter.publish = status;
            }

            // Date range filter
            if (startdate && enddate) {
                filter.publish_date = {
                    [Op.between]: [new Date(startdate), new Date(enddate)]
                };
            }
        }

        // Fetch blog posts
        const blog = await Blog.findAll({
            where: filter,
            order: [['id', 'DESC']]
        });

        // Check if no blogs were found
        if (!Array.isArray(blog) || blog.length === 0) {
            return res.status(200).json([]);
        }


        // Set no-cache headers
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");

        res.status(200).json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};



// exports.getBlog = async (req, res) => {
//     try {
//         const { department,  status, searchTerm } = req.query;

//         let filter = {};
//         if (searchTerm) {
//             filter[Op.or] = [
//                 { title: { [Op.like]: `%${searchTerm}%` } },
//             ];
//         } else {           

//             if (department) {
//                 const departmentArray = department.split(',');

//                 filter.department = {
//                     [Op.or]: [
//                         { [Op.eq]: department },  // Match the exact full string
//                         ...departmentArray.map(val => ({
//                             [Op.or]: [
//                                 { [Op.eq]: val },  // Match if the column contains only this value
//                                 { [Op.like]: `${val},%` },  // Match if the value is at the start
//                                 { [Op.like]: `%,${val},%` },  // Match if the value is in the middle
//                                 { [Op.like]: `%,${val}` }  // Match if the value is at the end
//                             ]
//                         }))
//                     ]
//                 };
//             }
//             if (status) {
//                 filter.publish = status;
//             }
//         }

//         const blog = await Blog.findAll({
//             where: filter,
//             order: [
//                 ['id', 'DESC']
//             ]
//         });

//         if (!blog || blog.length === 0) {
//             return res.status(200).json({ message: 'No Blog found' });
//         }

//         res.status(200).json(blog);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error', error });
//     }
// };

exports.getBlogList = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const pageSize = parseInt(req.query.pageSize) || 15; // Default page size to 10

        // Fetch the initial blogs
        const initialBlogs = await Blog.findAll({
            attributes: ['id', 'title', 'slug', 'publish_date', 'thumbnil_image', 'category'],
            where: { status: 'published' },
            order: [['publish_date', 'DESC']],
            limit: 5,
        });

        // Process initial blogs to include category names
        const initialBlogsWithCategories = await Promise.all(
            initialBlogs.map(async (blog) => {
                const categoryIds = blog.category.split(',').map((id) => parseInt(id.trim()));
                const categories = await Category.findAll({
                    where: { id: { [Op.in]: categoryIds } },
                    attributes: ['id', 'categoryName'],
                });
                return {
                    ...blog.toJSON(),
                    categories: categories.map((cat) => cat.categoryName),
                };
            })
        );

        // Extract IDs of initial blogs to exclude
        const excludedIds = initialBlogs.map((blog) => blog.id);

        // Calculate offset for pagination
        const offset = (page - 1) * pageSize;

        // Fetch paginated blogs excluding initial blogs
        const paginatedBlogs = await Blog.findAll({
            attributes: ['id', 'title', 'slug', 'publish_date', 'thumbnil_image', 'category'],
            where: {
                id: { [Op.notIn]: excludedIds },
                status: 'published',
            },
            order: [['publish_date', 'DESC']],
            limit: pageSize,
            offset,
        });

        // Process paginated blogs to include category names
        const paginatedBlogsWithCategories = await Promise.all(
            paginatedBlogs.map(async (blog) => {
                const categoryIds = blog.category.split(',').map((id) => parseInt(id.trim()));
                const categories = await Category.findAll({
                    where: { id: { [Op.in]: categoryIds } },
                    attributes: ['id', 'categoryName'],
                });
                return {
                    ...blog.toJSON(),
                    categories: categories.map((cat) => cat.categoryName),
                };
            })
        );


        const totalCount = await Blog.count({
            where: {
                id: { [Op.notIn]: excludedIds }, // Exclude initial blogs
                status: 'published',
            },
        });

        // Set no-cache headers
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");

        res.status(200).json({
            totalCount,
            initialBlogs: initialBlogsWithCategories,
            paginatedBlogs: paginatedBlogsWithCategories,
            page,
            pageSize,

        });
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



exports.getblogById = async (req, res) => {
    const { id } = req.query;

    try {
        const Blogs = await Blog.findByPk(id);

        if (!Blogs) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        // Set no-cache headers
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.status(200).json(Blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};


exports.getTags = async (req, res) => {
    try {
        const { search } = req.query;

        let tags = [];

        if (search) {
            // Fetch records where `tags` field contains words that start with the `search` term
            tags = await Blog.findAll({
                attributes: ['tags'],
                where: {
                    tags: {
                        [Op.like]: `%${search}%`
                    }
                },
                limit: 10,
            });

            // Filter tags to only include those that start with `search` term
            tags = tags
                .map(tag => tag.tags ? tag.tags.split(',') : [])  // Split tags by comma
                .flat()
                .filter(tag => tag.trim().toLowerCase().startsWith(search.toLowerCase()));  // Filter for tags starting with search term
        } else {
            // If 'search' parameter doesn't exist, fetch all tags
            tags = await Blog.findAll({
                attributes: ['tags'],
            });

            tags = tags
                .map(tag => tag.tags ? tag.tags.split(',') : [])  // Split tags by comma
                .flat();
        }

        // Remove duplicates and format as required
        const uniqueTags = [...new Set(tags.map(tag => tag.trim()))];
        const formattedTags = uniqueTags.map(tag => ({ tagsname: tag }));

        // Set no-cache headers
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");

        res.status(200).json(formattedTags);
    } catch (error) {
        console.error("Error fetching tags:", error);
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

exports.getblogsingle = async (req, res) => {
    const { slug } = req.query;

    try {
        // Fetch the blog by slug
        const blog = await Blog.findOne({ where: { slug, status: 'published' } });

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Extract category IDs from the blog's `category` field
        const categoryIds = blog.category
            ? blog.category.split(",").map((id) => id.trim())
            : [];

        // Fetch category names for the extracted IDs
        const categories = await Category.findAll({
            where: { id: { [Op.in]: categoryIds } },
            attributes: ["id", "categoryName"], // Fetch only id and categoryName
        });

        // Map the category IDs to their names
        const categoryNames = categories.map((category) => category.categoryName);

        // Fetch related blogs with overlapping category IDs
        let relatedBlogs = await Blog.findAll({
            where: {
                [Op.and]: [
                    {
                        category: {
                            [Op.or]: categoryIds.map((id) => ({
                                [Op.like]: `%${id}%`,
                            })), // Match blogs with any of the category IDs
                        },
                    },
                    { slug: { [Op.ne]: slug } },
                    { status: 'published' }  // Exclude the current blog
                ],
            },
            limit: 4, // Limit to 4 related blogs
            attributes: ["id", "title", "slug", "publish_date", "thumbnil_image"], // Fetch only necessary fields
        });

        // If no related blogs are found, fetch the latest 4 blogs
        if (relatedBlogs.length === 0) {
            relatedBlogs = await Blog.findAll({
                where: { id: { [Op.ne]: blog.id }, status: 'published' }, // Exclude the current blog by its ID
                order: [["publish_date", "DESC"]], // Sort by most recent publish date
                limit: 4, // Limit to 4 blogs
                attributes: ["id", "title", "slug", "publish_date", "thumbnil_image"], // Fetch only necessary fields
            });
        }

        // Fetch the previous and next blogs based on the current blog's ID
        const previousBlog = await Blog.findOne({
            where: { id: { [Op.lt]: blog.id }, status: 'published' }, // Find blogs with ID less than current blog's ID
            order: [["publish_date", "DESC"]], // Get the highest ID less than the current one
            attributes: ["id", "title", "slug", "thumbnil_image", 'publish_date'], // Fetch only necessary fields
        });

        const nextBlog = await Blog.findOne({
            where: { id: { [Op.gt]: blog.id }, status: 'published' }, // Find blogs with ID greater than current blog's ID
            order: [["publish_date", "ASC"]], // Get the lowest ID greater than the current one
            attributes: ["id", "title", "slug", "thumbnil_image"], // Fetch only necessary fields
        });

        // Prepare the previous and next blog response
        const previousNext = {
            previous: previousBlog || null, // Null if no previous blog
            next: nextBlog || null,         // Null if no next blog
        };

        const relatedDoctor = await Doctor.findOne({
            where: { id: blog.doctor }, // Adjust attributes as per your need
        });

        // Construct the full response
        const response = {
            ...blog.toJSON(), // Convert Sequelize instance to plain object
            categoryName: categoryNames, // Add category names to the response
            relatedBlogs,
            previousNext,
            relatedDoctor
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

// exports.getblogsingle = async (req, res) => {
//     const { slug } = req.params;

//     try {
//         // Fetch the blog by slug
//         const blog = await Blog.findOne({ where: { slug } });

//         if (!blog) {
//             return res.status(404).json({ message: 'Blog not found' });
//         }

//         // Extract the department field (comma-separated IDs)
//         const categoryIds = blog.category
//             ? blog.category.split(',').map(id => id.trim())
//             : [];

//         // Fetch department names for the given IDs
//         const categorys = await Category.findAll({
//             where: { id: { [Op.in]: categoryIds } },
//             attributes: ['id', 'categoryName'], // Only fetch id and departmentName
//         });

//         // Map the department IDs to their names
//         const categoryNames = categorys.map(dept => dept.categoryName);

//         // Fetch related blogs with overlapping department IDs
//         let relatedBlogs = await Blog.findAll({
//             where: {
//                 [Op.and]: [
//                     {
//                         category: {
//                             [Op.or]: categoryIds.map(
//                                 id => ({ [Op.like]: `%${id}%` }) // Match blogs with any of the department IDs
//                             ),
//                         },
//                     },
//                     { slug: { [Op.ne]: slug } } // Exclude the current blog
//                 ],
//             },
//             limit: 4, // Limit the number of related blogs
//             attributes: ['id', 'title', 'slug', 'publish_date', 'thumbnil_image'], // Fetch only necessary fields
//         });

//         // If no related blogs are found, fetch the latest 4 blogs
//         if (relatedBlogs.length === 0) {
//             relatedBlogs = await Blog.findAll({
//                 where: {
//                     id: { [Op.ne]: blog.id } // Exclude the current blog by its ID
//                 },
//                 order: [['publish_date', 'DESC']], // Sort by most recent publish date
//                 limit: 4, // Limit to 4 blogs
//                 attributes: ['id', 'title', 'slug', 'publish_date', 'thumbnil_image'], // Fetch only necessary fields
//             });
//         }

//         // Fetch the previous and next blogs based on the current blog's id
//         const previousBlog = await Blog.findOne({
//             where: { id: { [Op.lt]: blog.id } }, // Find the blog with id less than the current blog's id
//             order: [['publish_date', 'DESC']], // Get the highest id less than the current one
//             attributes: ['id', 'title', 'slug', 'thumbnil_image'], // Fetch only necessary fields
//         });

//         const nextBlog = await Blog.findOne({
//             where: { id: { [Op.gt]: blog.id } }, // Find the blog with id greater than the current blog's id
//             order: [['publish_date', 'ASC']], // Get the lowest id greater than the current one
//             attributes: ['id', 'title', 'slug', 'thumbnil_image'], // Fetch only necessary fields
//         });

//         // Prepare the previous and next blog array
//         const previousNext = {
//             previous: previousBlog || null, // If no previous blog, return null
//             next: nextBlog || null,         // If no next blog, return null
//         };

//         // Add the department names, related blogs, and previous/next blogs to the response
//         const response = {
//             ...blog.toJSON(), // Convert Sequelize instance to plain object
//             department: categoryNames,
//             relatedBlogs,
//             previousNext,
//         };

//         // Set no-cache headers
//         res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
//         res.setHeader('Pragma', 'no-cache');
//         res.setHeader('Expires', '0');

//         // Send the response
//         res.status(200).json(response);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error', error });
//     }
// };



exports.getDepartmentBlog = async (req, res) => {
    try {

        const { searchTerm } = req.query;
        let filter = {};

        if (searchTerm) {
            filter[Op.or] = [
                { departmentName: { [Op.like]: `%${searchTerm}%` } }
            ];
        }

        // Fetch all departments
        //   const departments = await Department.findAll();
        const departments = await Department.findAll({
            where: filter,
            order: [
                ['id', 'DESC']
            ]
        });
        // Check if the departments array is empty or null
        if (!departments || departments.length === 0) {
            return res.status(404).json({ message: 'No Department found' });
        }

        // Set no-cache headers to ensure fresh data is always returned
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        // Send back the department data
        res.status(200).json(departments);

    } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};


exports.getDepartmentBlog = async (req, res) => {
    try {
        // Fetch all blogs to get department IDs
        const blogs = await Blog.findAll({
            attributes: ['department'], // Only fetch the department column
        });

        // Check if no blogs found
        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: 'No Blogs found' });
        }

        // Extract and clean department IDs (remove duplicates)
        const departmentIds = [...new Set(blogs.flatMap(blog => blog.department.split(',')))];

        // Fetch departments based on the extracted IDs
        const departments = await Department.findAll({
            where: {
                id: {
                    [Op.in]: departmentIds
                }
            }
        });

        // Check if no departments were found
        if (!departments || departments.length === 0) {
            return res.status(404).json({ message: 'No Departments found' });
        }

        // Format the response with department id and departmentName
        const departmentResponse = departments.map(department => ({
            id: department.id,
            departmentName: department.departmentName
        }));

        // Set no-cache headers to ensure fresh data
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        // Send back the department data
        res.status(200).json(departmentResponse);

    } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};


exports.treatListBlog = async (req, res) => {
    try {
        // Step 1: Fetch all blogs to get treatment IDs
        const blogs = await Blog.findAll({
            attributes: ['treatment'], // Only fetch the treatment column
        });

        // Check if no blogs are found
        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: 'No Blogs found' });
        }

        // Step 2: Extract treatment IDs and remove duplicates
        const treatmentIds = [...new Set(blogs.flatMap(blog => blog.treatment.split(',')))];

        // Step 3: Fetch treatments from the Treat table using the extracted IDs
        const treatments = await Treat.findAll({
            where: {
                id: {
                    [Op.in]: treatmentIds, // Match the treatment IDs from the Blog table
                }
            }
        });

        // Check if no treatments are found
        if (!treatments || treatments.length === 0) {
            return res.status(404).json({ message: 'No Treatments found' });
        }

        // Step 4: Format the response with treatment id and treatName
        const treatmentResponse = treatments.map(treatment => ({
            id: treatment.id,
            treatName: treatment.treatName
        }));

        // Set no-cache headers
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        // Send back the treatment data
        res.status(200).json(treatmentResponse);

    } catch (error) {
        console.error('Error fetching treatments:', error);
        res.status(500).json({ message: 'Error fetching treatments', error });
    }
};




// CATEGORY BLOG



// Treat List All
exports.categoryList = async (req, res) => {
    try {
        const { searchTerm } = req.query; // Get the search term from query parameters
        const filter = {}; // Initialize an empty filter object

        if (searchTerm) {
            filter[Op.or] = [
                { categoryName: { [Op.like]: `%${searchTerm}%` } }
            ];
        }

        const Categorys = await Category.findAll({ where: filter });

        // Set no-cache headers
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");

        res.status(200).json(Categorys);
    } catch (error) {
        console.error('Error fetching Category:', error);
        res.status(500).json({ message: 'Error fetching Category', error });
    }
};




exports.updateCategory = async (req, res) => {
    try {
        // Extract data from the request body
        console.log('req.query', req.body);

        const { id } = req.query;
        const { categoryName, parent } = req.body;

        // Insert data into the Treat table
        const newcategory = await Category.update({
            categoryName,
            parent,
            // slug,           
        }, { where: { id } });

        // Respond with the newly created entry
        res.status(200).json({ message: 'Category Updated successfully' });
    } catch (error) {
        console.error('Error Updated treatment:', error);
        res.status(500).json({ message: 'Error adding treatment', error });
    }
};

exports.addCategory = async (req, res) => {
    try {
        // Extract data from the request body
        const { categoryName, parent } = req.body;

        // Insert data into the Treat table
        const newTreat = await Category.create({
            categoryName,
            parent,
        });

        // Respond with the newly created entry
        res.status(201).json({ message: 'Category created successfully' });
    } catch (error) {
        console.error('Error adding treatment:', error);
        res.status(500).json({ message: 'Error adding treatment', error });
    }
};




exports.getCategoryById = async (req, res) => {
    try {
        // Extract data from the request body
        const { id } = req.query;

        // Insert data into the Treat table
        const newCategory = await Category.findOne({ where: { id } });

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



exports.deleteblog = async (req, res) => {
    const { id } = req.query;

    try {
        const data = await Blog.findByPk(id); // Fetch doctor by primary key (ID)

        if (!data) {
            return res.status(404).json({ message: 'Blog not found' });
        }


        // Directory where images are stored
        const uploadsDir = path.join(__dirname, '..');

        // Delete associated images if they exist
        if (data.thumbnil_image) {
            const imagePath = path.join(uploadsDir, data.thumbnil_image);
            const banner_image = path.join(uploadsDir, data.banner_image);


            // Delete the images if they exist
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
            if (fs.existsSync(banner_image)) {
                fs.unlinkSync(banner_image);
            }
        }


        await data.destroy(); // Delete the doctor from the database

        res.status(200).json({ message: 'Blog deleted successfully' });
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
