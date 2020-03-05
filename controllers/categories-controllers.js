const HttpError = require ('../models/http-errors');
const CategoryModel = require('../models/CategoryModel');

const getCategoryByGender = async (req, res) => {
    const categoryGender = req.params.gender;    
    const category = await CategoryModel.find({ 'gender': categoryGender},{'name': 1,_id: 0})
    if (category === null) {
        console.log('la category ne peut etre trouver avec cet id', category)
        return next(new HttpError('could not find a category'), 404);
      }
    res.json({category});
};

exports.getCategoryByGender = getCategoryByGender;