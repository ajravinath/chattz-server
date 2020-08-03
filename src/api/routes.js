const express = require('express');
const authRoutes = require('./auth/routes');
const userRoutes = require('./user/routes');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.send('Chattz API v1');
});

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;
