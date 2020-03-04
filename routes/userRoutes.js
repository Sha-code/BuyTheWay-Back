const express = require('express');
const usersControllers = require('../controllers/users-controllers');

const router = express.Router();

router.get('/user/:uid', usersControllers.getUserById)

module.exports = router;