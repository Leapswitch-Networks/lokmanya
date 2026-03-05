const { Model, DataTypes } = require('sequelize');
const sequelize = require('@/configs/database'); // Adjust the path to your database configuration

class ComprehensiveCare extends Model {}

ComprehensiveCare.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    comprehensiveTitle: {
        type: DataTypes.TEXT,
        allowNull: false,
    },  
    comprehensiveImage: {
        type: DataTypes.TEXT,
        allowNull: true,
    },  
    comprehensiveDescription: {
        type: DataTypes.TEXT,
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
    modelName: 'ComprehensiveCare',
    tableName: 'comprehensivecare', // Adjust the table name if necessary
    timestamps: true, // Add createdAt and updatedAt timestamps
});

module.exports = ComprehensiveCare;
