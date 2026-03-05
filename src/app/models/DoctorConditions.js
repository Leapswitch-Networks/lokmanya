const Sequelize = require("sequelize");
const db_conn = require("@/configs/database");

const DoctorConditions = db_conn.define('doctor_conditions', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    doctor_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'doctor',
            key: 'id'
        }
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    image: {
        type: Sequelize.STRING(255),
         allowNull: true
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
});

module.exports = DoctorConditions;