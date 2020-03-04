const HttpError = require ('../models/http-errors');
const UserModel = require('../models/UserModel');

const getUserById = async (req, res) => {
    const userId = req.params.uid;    
    if(!userId.match(/^[0-9a-fA-F]{24}$/)) {
        return next(new HttpError ('could not find an user with this id'),404);
      }
    const user = await UserModel.findById(userId);
    res.json({user});
};

exports.getUserById = getUserById;