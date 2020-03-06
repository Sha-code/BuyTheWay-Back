const express = require('express');
const { check } = require('express-validator')

const usersControllers = require('../controllers/users-controllers');

const router = express.Router();


router.get('/user/:uid', usersControllers.getUserById)
router.post('/user/add',[
    check('nickname')
        .not()
        .isEmpty(),
    check('mail')  
        .normalizeEmail()
        .isEmail(),
    check('password').isLength({ min:6 })
],usersControllers.addNewUser)
router.post('/user/update/:uid',
[
    check('nickname')
        .not()
        .isEmpty(),
    check('mail')  
        .normalizeEmail()
        .isEmail(),
    check('password').isLength({ min:6 })
], usersControllers.updatedUser)
router.post('/user/remove/:uid', usersControllers.removeUserById)


module.exports = router;