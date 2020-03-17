const express = require('express');
const cartsControllers = require('../controllers/carts-controllers');
//const checkAuth = require('../middleware/check-auth');


const router = express.Router();

router.get('/cart/:uid', cartsControllers.getCartByUserId)
router.get('/price/:uid', cartsControllers.totalPrice)
router.post('/cart/add', cartsControllers.createCart)
router.post('/cart/validate/:uid', cartsControllers.validateCart)
router.delete('/cart/delete/:uid', cartsControllers.deleteCart)

module.exports = router;