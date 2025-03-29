const { Where } = require('sequelize/lib/utils');
const Message = require('../models/message.js');

const { Op } = require('sequelize');  // Ensure Op is imported from Sequelize

exports.getMessages = async (req, res, next) => {
    try {
        // Use req.query for GET requests instead of req.body
        const { ChatGroupId } = req.query;
        console.log(ChatGroupId, req.user.id);

        // Fetch messages based on ChatGroupId and UserId
        const thisMessage = await Message.findAll({
            where: {
                UserId: req.user.id,
                ChatGroupId: ChatGroupId
            }
        });

        // Handle case where no messages are found
        if (!thisMessage || thisMessage.length === 0) {
            return res.status(404).json({ message: 'No messages found for this user in the specified group' });
        }

        // Return the found messages
        res.status(200).json(thisMessage);
    } catch (error) {
        console.error(error);
        next(error); // Pass error to global error handler
    }
};

exports.postMessage = async (req, res, next) => {
    try {
        const { messageText, ChatGroupId } = req.body;

        const UserId = req.user.id;
        // Create user
        const newMessage = await Message.create({
            messageText,
            UserId,
            ChatGroupId
        });

        res.status(201).json(newMessage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};


exports.getNewMessage = async (req, res, next) => {
    try {
        let { lastMsgId } = req.params;

        // Ensure lastMsgId is a valid number
        lastMsgId = parseInt(lastMsgId, 10);



        if (isNaN(lastMsgId)) {
            return res.status(400).json({ message: 'Invalid lastMsgId' });
        }

        // Fetch new messages with id greater than lastMsgId
        const newMessages = await Message.findAll({
            where: {
                id: { [Op.gt]: lastMsgId }
            },
        });

        if (!newMessages.length) {
            return res.status(404).json({ message: 'No new messages found' });
        }

        res.status(200).json(newMessages);

    } catch (err) {
        res.status(500).json({ message: 'Something went wrong!' });
    }
};