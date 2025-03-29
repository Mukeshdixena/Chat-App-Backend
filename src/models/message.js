const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database.js');

const Message = sequelize.define(
    'Message ',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        messageText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },

    {
        tableName: 'messages', // Explicitly set table name to avoid pluralization issues
        timestamps: true, // Adds createdAt & updatedAt fields automatically
    }
);

module.exports = Message;
