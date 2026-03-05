const { Model, DataTypes } = require('sequelize');
const sequelize = require('@/configs/database'); // Adjust the path to your database configuration

class HyperlocalBenifit extends Model {}

HyperlocalBenifit.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    benifitTitle: {
        type: DataTypes.TEXT,
        allowNull: true,
    },  
    benifitImage: {
        type: DataTypes.TEXT,
        allowNull: true,
    },  
    benifitDescription: {
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
    modelName: 'HyperlocalBenifit',
    tableName: 'hyperlocalbenifit', // Adjust the table name if necessary
    timestamps: true, // Add createdAt and updatedAt timestamps
});

module.exports = HyperlocalBenifit;
