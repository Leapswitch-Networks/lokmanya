const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/database'); // Adjust the path to your database configuration
const sequelize = require('@/configs/database'); // Adjust the path to your database configuration

class TreatmentProcedure extends Model {}

TreatmentProcedure.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    question: {
        type: DataTypes.TEXT,
        allowNull: false,
    },    
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },    
    isActive: {
        type: DataTypes.STRING, // Path to the image file
        allowNull: true,
    },
    hyperlocalId: {
        type: DataTypes.BIGINT,
        references: {
            model: 'hypelocal', // Adjust based on your table name
            key: 'id',
        },
        onDelete: 'CASCADE', // Deletes related treatment procedures if department is deleted
    },
}, {
    sequelize,
    modelName: 'TreatmentProcedure',
    tableName: 'treatmentprocedures', // Adjust the table name if necessary
    timestamps: true, // Add createdAt and updatedAt timestamps
});

module.exports = TreatmentProcedure;
