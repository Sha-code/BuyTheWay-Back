const HttpError = require ('../models/http-errors');
const ProductModel = require('../models/ProductModel');

const getAllProducts = async (req, res) => {
    const products = await ProductModel.find({});
      res.json({products});
};

const getProductById = async (req, res) => {
    const productId = req.params.pid;    
    if(!productId.match(/^[0-9a-fA-F]{24}$/)) {
        return next(new HttpError ('could not find an article with this id'),404);
      }
    const product = await ProductModel.findById(productId);
    res.json({product});
};
// TODO : erreur => id trop long trop court, bonne taille mais null

const getProductByCategory = async(req,res) => {
  const categoryId = req.params.cid;
  const category = await ProductModel.find({'category.id': categoryId});
  res.json({category});
}

exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.getProductByCategory = getProductByCategory;

