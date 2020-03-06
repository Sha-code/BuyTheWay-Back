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
const addNewUser = async (req, res, next) => {
  let user = new UserModel(req.body);
  user.save()
    .then(product => {
      res.status(200).json({ 'user': 'user added successfully' });
    })
    .catch(err => {
      next(new HttpError('adding new user failed'), 400);
    });
}
const updatedUser = async (req, res, next) => {
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
  UserModel.findByIdAndRemove(req.params.uid, function (err, user) {
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
exports.addNewUser = addNewUser;
exports.updatedUser = updatedUser;
exports.removeUserById = removeUserById;