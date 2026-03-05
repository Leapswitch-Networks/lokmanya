// models/HyperlocalCategory.js
const Sequelize = require("sequelize");
const db_conn = require("@/configs/database");


const HyperlocalCategory = db_conn.define("hyperlocalcategories", {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    parent_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    level: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
    },
    slug: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
    },
}, {
    freezeTableName: true,
});

// Self-association: parent → children
HyperlocalCategory.hasMany(HyperlocalCategory, {
    as: 'children',
    foreignKey: 'parent_id',
});

HyperlocalCategory.belongsTo(HyperlocalCategory, {
    as: 'parent',
    foreignKey: 'parent_id',
});

module.exports = HyperlocalCategory;
