const ChatGroup = require('../models/ChatGroup');

const { Op } = require('sequelize');  // Ensure Op is imported from Sequelize


exports.getGroup = async (req, res, next) => {
    const thisGroup = await ChatGroup.findAll()
    if (!thisGroup) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(thisGroup);
};

exports.postGroup = async (req, res, next) => {
    try {
        const { name } = req.body;

        const newChatGroup = await ChatGroup.create({
            name
        });

        res.status(201).json(newChatGroup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};