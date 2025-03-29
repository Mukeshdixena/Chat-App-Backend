const express = require('express');
const chatGroupController = require('../controllers/chatGroupControllers.js');

const router = express.Router();

router.get('/api/getGroup', chatGroupController.getGroup);

router.post('/api/postGroup', chatGroupController.postGroup);


module.exports = router;
