const Sequelize = require("sequelize");
const db_conn = require("@/configs/database");



const User = db_conn.define('users', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    user_type: {
        type: Sequelize.STRING(100),
    },
    name: {
        type: Sequelize.STRING(100),
    },   
    
    profile_pic: {
        type: Sequelize.STRING()
    },
    email: {
        type: Sequelize.STRING(100),
    },
    phone: {
        type: Sequelize.STRING(100),
    },  
  
    city: {
        type: Sequelize.STRING(50),
    },
  
    password: {
        type: Sequelize.TEXT,
    },
    role: {
        type: Sequelize.STRING(255),
    },
    status: {
        type: Sequelize.STRING(50),
    },
    user_status: {
        type: Sequelize.STRING(50),
    },
    module_assign: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
  
    tnc_verify: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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

module.exports = User