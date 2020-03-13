const express = require('express');
const cartsControllers = require('../controllers/carts-controllers');
//const checkAuth = require('../middleware/check-auth');


const router = express.Router();

router.get('/cart/:uid', cartsControllers.getCartByUserId)
router.post('/cart/add', cartsControllers.createCart)
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