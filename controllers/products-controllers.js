const HttpError = require('../models/http-errors');
const ProductModel = require('../models/ProductModel');

const getAllProducts = async (req, res) => {
  const products = await ProductModel.find({});
  res.json({ products });
};

const getProductById = async (req, res, next) => {
  const productId = req.params.pid;
  const product = await ProductModel.findById(productId);
  // if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
  //   return next(new HttpError('could not find an article with this id'), 404);
  // }
  if (product === null) {
    console.log('le produit ne peut etre trouver avec cet id', product)
    return next(new HttpError('could not find an article with this id'), 404);
  }

  res.json({ product });
};
// TODO : erreur => id trop long trop court, bonne taille mais null

const getProductByCategory = async (req, res) => {
  const categoryId = req.params.cid;
  const category = await ProductModel.find({ 'category.id': categoryId });
  res.json({ category });
}

exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.getProductByCategory = getProductByCategory;

