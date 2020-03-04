const HttpError = require ('../models/http-errors');
const UserModel = require('../models/UserModel');

const getUserById = async (req, res) => {
    const userId = req.params.uid;    
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return next(new HttpError('This is not a valid id'), 404);
    }
    const user = await UserModel.findById(userId);
    if (user === null) {
      console.log('l\'utilisateur ne peut etre trouvé avec cet id', product)
      return next(new HttpError('could not find an user with this id'), 404);
    }
    res.json({user});
};

exports.getUserById = getUserById;