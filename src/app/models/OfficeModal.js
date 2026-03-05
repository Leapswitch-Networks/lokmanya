const Sequelize = require("sequelize");
const db_conn = require("@/configs/database");



const OfficeModal = db_conn.define('office_details', {
    office_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.BIGINT,
    },
    role: {
        type: Sequelize.STRING(255),
    },
    responsibility: {
        type: Sequelize.STRING(255),
    },
    current_assigned_initiative: {
        type: Sequelize.STRING(255),
    },
    current_assigned_jamiat: {
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

module.exports = OfficeModal