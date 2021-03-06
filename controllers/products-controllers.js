const HttpError = require('../models/http-errors');
const {
  validationResult
} = require('express-validator');
const ProductModel = require('../models/ProductModel');
const skuControllers = require('../controllers/sku-controllers');

const getAllProducts = async (req, res, next) => {
  ProductModel.find({} , function(err, response) {
    products = response;
  })
    .then(() => {
      res.json({
        products
      });
    })
    .catch((err) => {
      next(new HttpError('could not get all products'), 400);
    });
};

const getProductByTendance = async (req, res) => {
  const tendances = await ProductModel.find({
    'tendance': true
  });
  res.json({
    tendances
  });
};

const getProductById = async (req, res, next) => {
  const productId = req.params.pid;
  if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new HttpError('could not find an article with this id, it does not corresponding to norms'), 404);
  }
  const product = await ProductModel.findById(productId);
  if (product === null) {
    return next(new HttpError('could not find an article with this id'), 404);
  }
  res.json({
    product
  });
};

const getProductByCategory = async (req, res) => {
  const categoryId = req.params.cid;
  const category = await ProductModel.find({
    'category.id': categoryId
  });
  res.json({
    category
  });
}
const getProductByDate = async (req, res) => {
  ProductModel.find({}).sort({
    created_at: -1
  }).limit(7).exec(function (err, date) {
    res.json({
      date
    });
  });
};
const getRandomProducts = async (req, res) => {

  ProductModel.aggregate([{
      $match: {
        "category.gender": "femme"
      }
    },
    {
      $sample: {
        size: 5
      }
    }
  ]).exec(function (err, r) {
    res.json({
      r
    });
  });
}

const addNewProduct = async (req, res, next) => {
  const fail = validationResult(req);
  if (!fail.isEmpty()) {

    res.status(422).json({
      'products': 'inputs error'
    })
  }
  let product = new ProductModel(req.body);
  product.save()
    .then(product => {
      let sizeQuantity = [{
          "size": "XS",
          "quantity": "15"
        },
        {
          "size": "S",
          "quantity": "30"
        },
        {
          "size": "M",
          "quantity": "35"
        },
        {
          "size": "L",
          "quantity": "30"
        },
        {
          "size": "XL",
          "quantity": "15"
        }
      ]
      sizeQuantity.map((item) => {
        skuControllers.addNewSku(({
          "size": item.size,
          "quantity": item.quantity,
          "productId": product.sku
        }), res, next)
      })

      res.status(200).json({
        'product': 'product and skus added successfully'
      });
    })
    .catch(err => {
      next(new HttpError('adding new product failed'), 400);
    });
}
const removeProductById = async (req, res, next) => {
  ProductModel.findByIdAndRemove(req.params.pid, function (err, product) {
      if (!product)
        next(new HttpError('product is not found'), 404);
      else {
        skuControllers.removeSkuByProductId((product.sku), res, next)
      }
    })
    .catch(err => {
      next(new HttpError('removing product failed'), 400);
    });
}
const updatedProduct = async (req, res, next) => {
  const fail = validationResult(req);
  if (!fail.isEmpty()) {

    res.status(422).json({
      'products': 'inputs error'
    })
  }
  ProductModel.findById(req.params.pid, function (err, product) {
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

const updatedTendance = async (req, res, next) => {

  let tendance;
  product = await ProductModel.findById(req.params.pid);
  if (product.tendance === "true") {
    tendance = "false";
  } else {
    tendance = "true";
  }
  ProductModel.updateOne({
      _id: req.params.pid
    }, {
      "$set": {
        "tendance": tendance
      }
    })
    .then(ProductModel => res.json(ProductModel))
    .catch(err => res.status(422).json(err));

}


exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.getProductByCategory = getProductByCategory;
exports.getProductByTendance = getProductByTendance;
exports.getProductByDate = getProductByDate;
exports.getRandomProducts = getRandomProducts;
exports.addNewProduct = addNewProduct;
exports.updatedProduct = updatedProduct;
exports.updatedTendance = updatedTendance;
exports.removeProductById = removeProductById;