const message = require('../models/message.js');

exports.getMessages = async (req, res, next) => {
    const thisMessage = await message.findAll()
    if (!thisMessage) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(thisMessage);
};

exports.postMessage = async (req, res, next) => {
    try {
        const { messageText } = req.body;

        const UserId = req.user.id;
        // Create user
        const newMessage = await message.create({
            messageText,
            UserId
        });

        res.status(201).json(newMessage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};
