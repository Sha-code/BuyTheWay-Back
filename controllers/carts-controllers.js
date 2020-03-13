const HttpError = require('../models/http-errors');
const { validationResult } = require('express-validator');
const CartModel = require('../models/CartModel');
const { updatedSkuCart } = require('../controllers/sku-controllers');


const getCartByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new HttpError('could not find a cart with this user, it does not corresponding to norms'), 404);
  }
  const cart = await CartModel.find({ "user" : userId });
  if ( cart === null) {
    console.log('le panier ne peut etre trouver avec cet user', cart);
    return next(new HttpError('could not find a cart with this user'), 404);
  }
  res.json({ cart });
};


const createCart = async (req, res, next) => {
    const fail = validationResult(req);
  if (!fail.isEmpty()) {
    res.status(422).json({ 'cart': 'inputs error' })
  }
  let cart = new CartModel({
    "user" : req.body.user,
    "items" : req.body.items,
    "total_price" : (req.body.items[0].price) * (req.body.items[0].quantity) 
  });
  cart.save()
    .then(cart => {
      console.log("sku",req.body.items[0].sku)
      updatedSkuCart(({
        "skuId": req.body.items[0].sku,
        "size": req.body.items[0].size,
        "quantity": req.body.items[0].quantity,
      }), res, next)
      // res.status(200).json({ 'cart': 'cart added successfully' });
    }) 
  };


const deleteCart = async (req, res, next) => {}

// const validateCart = async (req, res, next) => 


exports.createCart = createCart;
exports.getCartByUserId = getCartByUserId;
