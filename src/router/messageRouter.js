const express = require('express');
const messageController = require('../controllers/messageControllers.js');
const userAuth = require('../middleware/auth.js');

const router = express.Router();

router.get('/api/getMessages', userAuth.authonticate, messageController.getMessages);

router.post('/api/postMessage', userAuth.authonticate, messageController.postMessage);

module.exports = router;
