const express = require('express');
const { check } = require('express-validator')

const usersControllers = require('../controllers/users-controllers');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/user/login', usersControllers.login);
router.get('/user/:uid', usersControllers.getUserById);
router.post(
  '/user/signup',
  [
    check('nickname')
      .not()
      .isEmpty(),
    check('mail')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  usersControllers.signup
);
router.post('/user/update/:uid',
  [
    check('nickname')
      .not()
      .isEmpty(),
    check('mail')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 })
  ], usersControllers.updatedUser);
router.get('/user/:uid',checkAuth, usersControllers.getUserById);
router.delete('/user/remove/:uid',checkAuth, usersControllers.removeUserById);

module.exports = router;
