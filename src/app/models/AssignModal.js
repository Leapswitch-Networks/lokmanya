const Sequelize = require("sequelize");
const db_conn = require("@/configs/database");


const AssignModule = db_conn.define('module_assign', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    role: {
        type: Sequelize.ENUM('user', 'admin'),
    },
    assign_module_id: {
        type: Sequelize.BIGINT,
    },
    permission: {
        type: Sequelize.JSON,
    }
}, {
    freezeTableName: true,
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['assign_module_id','user_id'],
            name: 'unique_module_user_constraint',
        },
    ],
})

module.exports = AssignModule