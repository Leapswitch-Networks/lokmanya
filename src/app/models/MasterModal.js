const Sequelize = require("sequelize");
const db_conn = require("@/configs/database");



const MasterModal = db_conn.define('masterdata', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    masterName: {
        type: Sequelize.STRING(255),
    },
    type: {
        type: Sequelize.STRING(255),
    },
    city: {
        type: Sequelize.STRING(255),
    },
    slug: {
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

module.exports = MasterModal