const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database.js');

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true, // Ensures a valid email format
            },
        },
        phonenumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isNumeric: true, // Ensures only numbers
                len: [10, 15]    // Adjust as per phone number length
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 255], // Ensures password length is at least 6 characters
            },
        }
    },

    {
        tableName: 'users', // Explicitly set table name to avoid pluralization issues
        timestamps: true, // Adds createdAt & updatedAt fields automatically
    }
);

module.exports = User;
