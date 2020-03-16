const express = require('express');
const cartsControllers = require('../controllers/carts-controllers');
//const checkAuth = require('../middleware/check-auth');


const router = express.Router();

router.get('/cart/:uid', cartsControllers.getCartByUserId)
router.get('/price/:uid', cartsControllers.totalPrice)
router.post('/cart/add', cartsControllers.createCart)
router.post('/cart/validate/:uid', cartsControllers.validateCart)
router.delete('/cart/delete/:uid', cartsControllers.deleteCart)
/*
TODO:
Add
----
get car by user 
router de création cart + update sku
router d'update cart + update sku
router de suppression cart + update sku 
router de commande (pas trop d'intéret dans cette version)
*/
module.exports = router;