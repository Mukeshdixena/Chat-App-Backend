const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database.js');

const ChatGroup = sequelize.define(
    'ChatGroup',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },

    {
        tableName: 'ChatGroups', // Explicitly set table name to avoid pluralization issues
        timestamps: true, // Adds createdAt & updatedAt fields automatically
    }
);

module.exports = ChatGroup;
