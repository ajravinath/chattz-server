const express = require('express');
const { getUserById } = require('./userController');
const verifyAuth = require('../../middleware/verifyAuth');

const router = express.Router();

router.get('/:userId', verifyAuth, getUserById);

module.exports = router;
