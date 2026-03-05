const Sequelize = require("sequelize");
const db_conn = require("@/configs/database");


const MasterModuleModal = db_conn.define('master_module_details', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    module_slug: {
        type: Sequelize.STRING(255),
    },
    title: {
        type: Sequelize.STRING(255),
    },
    link: {
        type: Sequelize.STRING(255),
    },
    sequence: {
        type: Sequelize.BIGINT(11),
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

module.exports = MasterModuleModal