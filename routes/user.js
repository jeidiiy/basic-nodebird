const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { addFollowing, removeFollowing } = require('../controllers/user');
const User = require('../models/user');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, addFollowing);
router.patch('/:id/unfollow', isLoggedIn, removeFollowing)

module.exports = router;