const Sequelize = require("sequelize");
const db_conn = require("@/configs/database");



const DoctorsLead = db_conn.define('leads', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    cityId: {
        type: Sequelize.STRING(255),
    },
    areaId: {
        type: Sequelize.STRING(255),
    },
    location: {
        type: Sequelize.STRING(255),
    },
    doctorId: {
        type: Sequelize.STRING(255),
    },
    speciality: {
        type: Sequelize.STRING(255),
    },
    patientName: {
        type: Sequelize.STRING(255),
    },
    mobileNumber: {
        type: Sequelize.STRING(255),
    },
    message : {
        type: Sequelize.TEXT,
    },
    status : {
        type: Sequelize.STRING(100),
    },
    slug : {
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
    },
    email: {
        type: Sequelize.STRING(255),
    },   
    type: {
        type: Sequelize.STRING(255),
    },
    courseName: {
        type: Sequelize.TEXT,
    },
}, {
    freezeTableName: true,
})

module.exports = DoctorsLead