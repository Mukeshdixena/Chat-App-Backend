const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database.js');

const message = sequelize.define(
    'message',
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

module.exports = message;
