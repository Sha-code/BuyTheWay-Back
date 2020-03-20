const HttpError = require('../models/http-errors');
const {
  validationResult
} = require('express-validator');
const CartModel = require('../models/CartModel');
const {
  updatedSkuCart,
  updatedSkuCartAtDelete
} = require('../controllers/sku-controllers');
const UserModel = require('../models/UserModel');
const SkuModel = require('../models/SkuModel')
const {
  levelUp
} = require('../controllers/ranks-controllers');

const getCartByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new HttpError('could not find a cart with this user, it does not corresponding to norms'), 404);
  }
  const cart = await CartModel.find({
    "user": userId,
    "status": "en cours"
  });
  if (cart === null) {
    return next(new HttpError('could not find a cart with this user'), 404);
  }
  res.json({
    cart
  });
};


const createCart = async (req, res, next) => {
  console.log("req", req.body);
  const fail = validationResult(req);
  if (!fail.isEmpty()) {
    res.status(422).json({
      'cart': 'inputs error'
    })
  }
  const stock = await SkuModel.findOne({
    productId: req.body.items[0].sku,
    size: req.body.items[0].size
  });
  if (stock.quantity >= req.body.items[0].quantity) {
    CartModel.find({
      "user": req.body.user,
      "status": "en cours"
    }, function (err, existingCart) {

      if (existingCart.length === 0) {

        let cart = new CartModel({
          "user": req.body.user,
          "items": req.body.items,
          "total_price": (req.body.items[0].price) * (req.body.items[0].quantity)
        });
        cart.save()
          .then(cart => {
            updatedSkuCart(({
              "skuId": req.body.items[0].sku,
              "size": req.body.items[0].size,
              "quantity": req.body.items[0].quantity,
            }), res, next);
          })
      } else {
        CartModel.updateOne({
          "user": req.body.user,
          "status": "en cours"
        }, {
          $push: {
            items: {
              "product_id": req.body.items[0].product_id,
              "picture": req.body.items[0].picture,
              "name": req.body.items[0].name,
              "size": req.body.items[0].size,
              "quantity": req.body.items[0].quantity,
              "price": req.body.items[0].price,
              "sku": req.body.items[0].sku
            }
          }
        })
          .then(cart => {
            updatedSkuCart(({
              "skuId": req.body.items[0].sku,
              "size": req.body.items[0].size,
              "quantity": req.body.items[0].quantity,
            }), res, next)
            totalPrice(req.body.user, res, next);
          })
          .catch(err => {
            next(new HttpError('updating cart failed'), 400);
          });
      }
    })
  } else {
    next(new HttpError('too many articles'), 400);
  }
};


const totalPrice = async (req, res, next) => {
  let totalPrice = 0;
  CartModel.find({
    "user": req,
    "status": "en cours"
  }, function (err, existingCart) {
    existingCart[0].items.map((item) => {
      totalPrice = totalPrice + (item.price * item.quantity);
    })
    CartModel.updateOne({
      "user": req,
      "status": "en cours"
    }, {
      $set: {
        "total_price": totalPrice
      }
    })
      .then(cart => { })
      .catch(err => {
        next(new HttpError('updating price failed'), 400);
      });
  })
};

const deleteCart = async (req, res, next) => {
  CartModel.findOneAndDelete({
    "user": req.params.uid,
    "status": "en cours"
  }, function (err, cart) {
    if (!cart)
      next(new HttpError('cart is not found'), 404);
    else
      res.json({
        "message": "cart is removed"
      })
  })
    .then(cart => {
      req.body.items.map((item) => {
        updatedSkuCartAtDelete(({
          "skuId": item.sku,
          "size": item.size,
          "quantity": item.quantity,
        }), res, next)
      })
    })
    .catch(err => {
      next(new HttpError('cart user failed'), 400);
    });
}

const validateCart = async (req, res, next) => {
  cart = await CartModel.findOne({
    "user": req.params.uid,
    "status": "en cours"
  });
  let fidelity = Math.round((cart.total_price * 0.2));
  UserModel.updateOne({
    "_id": req.params.uid
  }, {
    $inc: {
      "fidelity": fidelity
    }
  })
    .then(user => {
      levelUp(req, res, next);
      updatedStatus(req.params.uid, res, next);
    })
    .catch(err => {
      next(new HttpError('updating user fidelity failed'), 400);
    });

};

const updatedStatus = async (req, res, next) => {
  CartModel.updateOne({
    user: req,
    "status": "en cours"
  }, {
    "$set": {
      "status": "validé"
    }
  })
    .then(CartModel => {
      res.status(200).send("Command is validated");
    })
    .catch(err => res.status(422).json(err));
};

exports.createCart = createCart;
exports.getCartByUserId = getCartByUserId;
exports.deleteCart = deleteCart;
exports.validateCart = validateCart;
exports.totalPrice = totalPrice;