const HttpError = require ('../models/http-errors');
const ProductModel = require('../models/ProductModel');

const getCategoryByGender = async (req, res) => {
    const categoryGender = req.params.gender;    
    const category = await ProductModel.find({ 'category.gender': categoryGender},{'category.type': 1,_id: 0})
    res.json({category});
};

exports.getCategoryByGender = getCategoryByGender;