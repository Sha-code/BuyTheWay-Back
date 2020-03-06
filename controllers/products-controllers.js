const HttpError = require('../models/http-errors');
const ProductModel = require('../models/ProductModel');
const skuControllers = require('../controllers/sku-controllers');


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
  product.save()
    .then(product => {
      let sizeQuantity = [
        { "size": "XS", "quantity": "15" },
        { "size": "S", "quantity": "30" },
        { "size": "M", "quantity": "35" },
        { "size": "L", "quantity": "30" },
        { "size": "XL", "quantity": "15" }
      ]
      console.log(product, product.sku);
      sizeQuantity.map((item) => {
        console.log(item)
        skuControllers.addNewSku(({
          "size": item.size,
          "quantity": item.quantity,
          "productId": product.sku
        }), res, next)
      })

      // res.status(200).json({ 'product': 'product added successfully' });
    })
    .catch(err => {
      next(new HttpError('adding new product failed'), 400);
    });
}
const removeProductById = async (req, res, next) => {
  ProductModel.findByIdAndRemove(req.params.pid, function (err, product) {
    console.log(product)
    if (!product)
      next(new HttpError('product is not found'), 404);
    else {
      console.log(product.sku)
      skuControllers.removeSkuByProductId((product.sku), res, next)
      // res.status(200).send("product is removed");
    }
  })
    .catch(err => {
      next(new HttpError('removing product failed'), 400);
    });
}
const updatedProduct = async (req, res, next) => {
  ProductModel.findById(req.params.pid, function (err, product) {
    console.log(product)
    if (!product)
      res.status(404).send("data is not found");
    else
      product.sku = req.body.sku;
    product.description = req.body.description;
    product.category = req.body.category;
    product.name = req.body.name;
    product.price = req.body.price;
    product.picture = req.body.picture;
    product.save().then(product => {
      res.json('product updated!');
    })
      .catch(err => {
        next(new HttpError('updating product failed'), 400);
      });
  });
}


exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.getProductByCategory = getProductByCategory;
exports.addNewProduct = addNewProduct;
exports.updatedProduct = updatedProduct;
exports.removeProductById = removeProductById;


