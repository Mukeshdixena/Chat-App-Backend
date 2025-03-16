const express = require('express');
const messageController = require('../controllers/messageControllers.js');
const userAuth = require('../middleware/auth.js');

const router = express.Router();

router.get('/api/getMessage', userAuth.authonticate, messageController.getMessage);

router.post('/api/postMessage', userAuth.authonticate, messageController.postMessage);

module.exports = router;
