const Sequelize = require("sequelize");
const db_conn = require("@/configs/database");



const PostDetails = db_conn.define('post_details', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    post_id: {
        type: Sequelize.INTEGER(11),
    },
    doctor_id: {
        type: Sequelize.INTEGER(11),
    },
    title: {
        type: Sequelize.TEXT(),
    },
    image: {
        type: Sequelize.TEXT(),
    },
    link: {
        type: Sequelize.TEXT(),
    },
    type: {
        type: Sequelize.STRING(255),
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
    },
}, {
    freezeTableName: true,
})

module.exports = PostDetails