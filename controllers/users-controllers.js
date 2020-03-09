const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-errors');
const UserModel = require('../models/UserModel');

const getUserById = async (req, res, next) => {
  const userId = req.params.uid;
  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new HttpError('This is not a valid id'), 404);
  }
  const user = await UserModel.findById(userId);
  if (user === null) {
    console.log('l\'utilisateur ne peut etre trouvé avec cet id', user)
    return next(new HttpError('could not find an user with this id'), 404);
  }
  res.json({ user });
};
const signup = async (req, res, next) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { nickname, mail, password } = req.body;

  let existingUser;
  try {
    existingUser = await UserModel.findOne({ mail: mail });
    console.log(existingUser);
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500
    );
    return next(error);
  }

  const createdUser = new UserModel({
    nickname,
    mail,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userNickname: createdUser.id, mail: createdUser.mail },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ userNickname: createdUser.id, mail: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token
  });
};
// const addNewUser = async (req, res, next) => {
//   const fail = validationResult(req);
//   if (!fail.isEmpty()) {

//     res.status(422).json({ 'users': 'inputs error' })
//   }
//   let user = new UserModel(req.body);
//   user.save()
//     .then(user => {
//       res.status(200).json({ 'user': 'user added successfully' });
//     })
//     .catch(err => {
//       next(new HttpError('adding new user failed'), 400);
//     });
// }
const updatedUser = async (req, res, next) => {
  const fail = validationResult(req);
  if (!fail.isEmpty()) {

    res.status(422).json({ 'users': 'inputs error' })
  }
  UserModel.findById(req.params.uid, function (err, user) {
    console.log(user)
    if (!user)
      res.status(404).send("user is not found");
    else
      user.nickname = req.body.nickname;
    user.fidelity = req.body.fidelity;
    user.mail = req.body.mail;
    user.password = req.body.password;
    user.rank = req.body.rank;
    user.role = req.body.role;
    user.customer = req.body.customer;
    user.save().then(user => {
      res.json('user updated!');
    })
      .catch(err => {
        next(new HttpError('updating user failed'), 400);
      });
  });
}
const removeUserById = async (req, res, next) => {
  UserModel.findOneAndDelete({ "_id": req.params.uid }, function (err, user) {
    console.log(user)
    if (!user)
      next(new HttpError('user is not found'), 404);
    else
      res.status(200).send("user is removed");
  })
    .catch(err => {
      next(new HttpError('remove user failed'), 400);
    });
}

exports.getUserById = getUserById;
// exports.addNewUser = addNewUser;
exports.updatedUser = updatedUser;
exports.removeUserById = removeUserById;
exports.signup= signup;
exports.login=login;