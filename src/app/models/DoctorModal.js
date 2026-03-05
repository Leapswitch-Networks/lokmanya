const Sequelize = require("sequelize");
const db_conn = require("@/configs/database");



const Doctor = db_conn.define('doctor', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    doctorName: {
        type: Sequelize.STRING(255),
    },
    mobile_no: {
        type: Sequelize.STRING(255),
    },
    designation: {
        type: Sequelize.STRING(255),
    },
    experience: {
        type: Sequelize.STRING(255),
    },
    grade : {
        type: Sequelize.INTEGER(11),
    },
    city: {
        type: Sequelize.STRING(255),
    },
    slug: {
        type: Sequelize.TEXT,
    },
    specialty: {
        type: Sequelize.STRING(255),
    },
   
    department: {
        type: Sequelize.TEXT,
    },
    description : {
        type: Sequelize.TEXT,
    },
    education: {
        type: Sequelize.TEXT,
    },
    area: {
        type: Sequelize.STRING(255),
    },
    opdTiming: {
        type: Sequelize.TEXT,
    },
    amount: {
        type: Sequelize.STRING(),
    },
    amount_status: {
        type: Sequelize.INTEGER(),
    },
    publish: {
        type: Sequelize.STRING(255),
    },
    featured_images: {
        type: Sequelize.STRING(255),
    },
    metaTitle : {
        type: Sequelize.TEXT,
    },
    metaDescription : {
        type: Sequelize.TEXT,
    },
    doctorSchema : {
        type: Sequelize.TEXT,
    },
     faq: {
    type: Sequelize.TEXT,
    },

    blog_id : {
        type: Sequelize.INTEGER(11),
    },
    video_id : {
        type: Sequelize.INTEGER(11),
    },
    expertTagline: {
        type: Sequelize.STRING(255),
    },

    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
    }
}, {
    freezeTableName: true,
})

module.exports = Doctor