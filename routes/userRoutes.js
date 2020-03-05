const express = require('express');
var cors = require('cors');
const usersControllers = require('../controllers/users-controllers');

const router = express.Router();

router.get('/user/:uid', cors(), usersControllers.getUserById)
router.post('/user/add', cors(), usersControllers.addNewUser)
router.post('/user/update/:uid', cors(), usersControllers.updatedUser)
router.post('/user/remove/:uid', cors(), usersControllers.removeUserById)

module.exports = router;