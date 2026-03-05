const Sequelize = require("sequelize");
const db_conn = require("@/configs/database");



const ModulesModal = db_conn.define('modules', {
    module_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    module_name: {
        type: Sequelize.STRING(255),
    },
    icon_component: {
        type: Sequelize.STRING(255),
    },
    module_slug: {
        type: Sequelize.STRING(255),
    },
    sequence: {
        type: Sequelize.BIGINT,
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

module.exports = ModulesModal