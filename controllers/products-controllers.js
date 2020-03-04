const HttpError = require('../models/http-errors');
const ProductModel = require('../models/ProductModel');

const getAllProducts = async (req, res) => {
  const products = await ProductModel.find({});
  res.json({ products });
};

const getProductById = async (req, res, next) => {
  const productId = req.params.pid;
  if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new HttpError('could not find an article with this id, it does not corresponding to norms'), 404);
  }
  const product = await ProductModel.findById(productId);
  if (product === null) {
    console.log('le produit ne peut etre trouver avec cet id', product)
    return next(new HttpError('could not find an article with this id'), 404);
  }
  res.json({ product });
};

const getProductByCategory = async (req, res) => {
  const categoryId = req.params.cid;
  const category = await ProductModel.find({ 'category.id': categoryId });
  res.json({ category });
}

const addNewProduct = async (req, res, next) => {
  let product = new ProductModel(req.body);
  console.log(product)
  product.save()
    .then(res => {
      console.log('product added successfully')
      next(new HttpError('product added successfully'), 200);
    })
    .catch(err => {
      console.log(err)
      next(new HttpError('adding new product failed'), 400);
    });
}

exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.getProductByCategory = getProductByCategory;
exports.addNewProduct = addNewProduct;

