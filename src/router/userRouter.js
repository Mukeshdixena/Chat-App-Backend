const express = require('express');
const userController = require('../controllers/userControllers.js');

const router = express.Router();

router.get('/api/getUser', userController.getUser);

router.post('/api/postUser', userController.postUser);

router.post('/api/signin', userController.signin);

module.exports = router;
