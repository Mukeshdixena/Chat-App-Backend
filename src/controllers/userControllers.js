const user = require('../models/user');

const bcrypt = require('bcryptjs');


exports.getUser = async (req, res, next) => {
    const thisUsers = await user.findAll()
    if (!thisUsers) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(thisUsers);
};

exports.postUser = async (req, res, next) => {
    try {
        const { username, email, phonenumber, password } = req.body;

        // Check if user already exists
        const existingUser = await user.findOne({
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
        const newUser = await user.create({
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


