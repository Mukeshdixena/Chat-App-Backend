const User = require('../models/user');

const { Op } = require('sequelize');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

exports.getUser = async (req, res, next) => {
    const thisUsers = await User.findAll()
    if (!thisUsers) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(thisUsers);
};

exports.postUser = async (req, res, next) => {
    try {
        const { username, email, phonenumber, password } = req.body;


        // Check if user already exists
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email }, { phonenumber }]
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            username,
            email,
            phonenumber,
            password: hashedPassword
        });

        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};

function generateAccestoken(id, name) {
    return jwt.sign({ UserId: id, name: name }, process.env.PRIVET_KEY)
}

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const currUser = await User.findOne({ where: { email } });
        if (!currUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, currUser.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }

        res.json({
            success: true,
            message: 'Login successful',
            token: generateAccestoken(currUser.id, currUser.name)
        });
    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
