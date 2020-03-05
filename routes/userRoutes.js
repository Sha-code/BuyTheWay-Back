const express = require('express');
var cors = require('cors');
const usersControllers = require('../controllers/users-controllers');

const router = express.Router();

router.get('/user/:uid',cors(), usersControllers.getUserById)

module.exports = router;