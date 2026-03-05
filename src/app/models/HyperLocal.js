const Sequelize = require("sequelize");
const db_conn = require("@/configs/database");


const HyperLocal = db_conn.define('hyperlocal', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.TEXT,
    },
    slug: {
        type: Sequelize.TEXT,
    },
    categoryId: {
        type: Sequelize.INTEGER,
    },
    areaId: {
        type: Sequelize.STRING(255),
    },
    description: {
        type: Sequelize.TEXT,
    },
    templateId: {
        type: Sequelize.TEXT,
    },
    related_doctor: {
        type: Sequelize.STRING(255),
    },
    featured_image: {
        type: Sequelize.TEXT,
    },
    featured_images_mobile: {
        type: Sequelize.TEXT,
    },
    aboutus_images: {
        type: Sequelize.TEXT,
    },
    faqs: {
        type: Sequelize.TEXT,
    },
    treatmentHeading: {
        type: Sequelize.TEXT,
    },
    comprehensiveHeading: {
        type: Sequelize.TEXT,
    },
    metaTitle: { type: Sequelize.TEXT, allowNull: true },
    metaDescription: { type: Sequelize.TEXT, allowNull: true },
    status: {
        type: Sequelize.STRING(100),
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



module.exports = HyperLocal