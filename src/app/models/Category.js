const Sequelize = require('sequelize');
const db_conn = require("@/configs/database");


const Category = db_conn.define('category', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    categoryName: {
        type: Sequelize.STRING|(255),
        allowNull: true // Added to ensure every record has a treatName
    },
    parent: {
        type: Sequelize.INTEGER,
        allowNull: true // Added to ensure every record has a specialityId
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
    freezeTableName: true, // Ensures the table name is not pluralized
    timestamps: true       // Automatically manages createdAt and updatedAt fields
});

module.exports = Category;
