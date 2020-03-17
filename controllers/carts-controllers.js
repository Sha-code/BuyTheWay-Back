const HttpError = require('../models/http-errors');
const {
  validationResult
} = require('express-validator');
const CartModel = require('../models/CartModel');
const {
  updatedSkuCart, updatedSkuCartAtDelete
} = require('../controllers/sku-controllers');
const UserModel =  require ('../models/UserModel');
const ProductModel = require ('../models/ProductModel')


const getCartByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new HttpError('could not find a cart with this user, it does not corresponding to norms'), 404);
  }
  const cart = await CartModel.find({
    "user": userId
  });
  if (cart === null) {
    console.log('le panier ne peut etre trouver avec cet user', cart);
    return next(new HttpError('could not find a cart with this user'), 404);
  }
  res.json({
    cart
  });
};

const createCart = async (req, res, next) => {
  const fail = validationResult(req);
  if (!fail.isEmpty()) {
    res.status(422).json({
      'cart': 'inputs error'
    })
  }
  CartModel.find({
    "user": req.body.user
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
          "user": req.body.user
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
          totalPrice(req.body.user, res,next);
        })
        .catch(err => {
          next(new HttpError('updating cart failed'), 400);
        });
    }
  })
};

const totalPrice = async (req, res, next) => {  
  let totalPrice = 0;
  CartModel.find({
    "user": req
  }, function (err, existingCart) {
    existingCart[0].items.map((item) => {
      totalPrice = totalPrice + (item.price * item.quantity);
    })
    CartModel.updateOne({
      "user": req
    }, {
      $set: { "total_price": totalPrice }
    }) 
    .then(cart => {
    console.log("update price ok");
    })
    .catch(err => {
      next(new HttpError('updating price failed'), 400);
    });
  })
};



const deleteCart = async (req, res, next) => {
  CartModel.findOneAndDelete({ "user": req.params.uid }, function (err, cart) {
    console.log(cart)
    if (!cart)
      next(new HttpError('cart is not found'), 404);
    else
    console.log("cart is remove")
      // res.status(200).send("cart is removed");
  })
  .then(cart => {
    req.body.items.map((item)=>{
      console.log("sku", item.sku)
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
  cart = getCartByUserId(req.params.uid, res, next);
  console.log(cart);
  let fidelity = Math.round((cart.total_price * 0.2));
  
  UserModel.updateOne({
    "_id": req.params.uid
  }, {
    $set: { "fidelity": fidelity }
  }) 
  .then(user => {
  console.log("user price ok");
  })
  .catch(err => {
    next(new HttpError('updating user fidelity failed'), 400);
  });

  CartModel.findOneAndDelete({ "user": req.params.uid }, function (err, cart) {
    console.log(cart)
    if (!cart)
      next(new HttpError('cart is not found'), 404);
    else
    console.log("cart is remove")
      res.status(200).send("cart is removed and command is validated");
  })
}


exports.createCart = createCart;
exports.getCartByUserId = getCartByUserId;
exports.deleteCart = deleteCart;
exports.validateCart = validateCart;
exports.totalPrice = totalPrice;
