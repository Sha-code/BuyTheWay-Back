const express = require('express');

const usersControllers = require('../controllers/users-controllers');

const router = express.Router();


router.get('/user/:uid', usersControllers.getUserById)
router.post('/user/add', usersControllers.addNewUser)
router.post('/user/update/:uid', usersControllers.updatedUser)
router.delete('/user/remove/:uid', usersControllers.removeUserById)


module.exports = router;