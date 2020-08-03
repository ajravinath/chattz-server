const express = require('express');

const { loginUser, signUpUser } = require('./authController');

const router = express.Router();

router.post('/login', loginUser);
router.post('/sign-up', signUpUser);

module.exports = router;
