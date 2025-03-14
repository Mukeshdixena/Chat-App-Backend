const user = require('../models/user');

const { Sequelize } = require('sequelize'); // Ensure Sequelize is imported


exports.getUser = async (req, res, next) => {
    const thisUsers = await user.findAll()
    if (!thisUsers) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(thisUsers);
};


exports.postUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await user.create({
            username,
            email,
            totalAmount: 0,
            password: hashedPassword
        });
        await Password.create({ hashedPassword: hashedPassword, UserId: newUser.id });
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};

