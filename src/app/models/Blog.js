const Sequelize = require("sequelize");
// const db_conn = require("@/config/database");
const db_conn = require("@/configs/database");


const Blog = db_conn.define('blog', {
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
    description: {
        type: Sequelize.TEXT('long'),
    },
    category: {
        type: Sequelize.TEXT,
    },
    doctor: {
        type: Sequelize.TEXT,
    },
    thumbnil_image: {
        type: Sequelize.STRING(255),
    },
    banner_image: {
        type: Sequelize.STRING(255),
    },   
    publish_date: {
        type: Sequelize.STRING(255),
    },
    tags : {
        type: Sequelize.STRING(255),
    },
    treatment: {
        type: Sequelize.STRING(255),
    },
    author: {
        type: Sequelize.STRING(255),
    },
    related_doctor: {
        type: Sequelize.STRING(255),
    },
    status: {
        type: Sequelize.STRING(255),
    },
    metaTitle : {
        type: Sequelize.TEXT,
    },
    metaDescription : {
        type: Sequelize.TEXT,
    },
    blogSchema : {
        type: Sequelize.TEXT,
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

module.exports = Blog