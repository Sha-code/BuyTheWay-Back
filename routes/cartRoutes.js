const express = require('express');
const cartsControllers = require('../controllers/carts-controllers');
const checkAuth = require('../middleware/check-auth');


const router = express.Router();

router.get('/cart/:uid', cartsControllers.getCartByUserId)
router.post('/cart/add', cartsControllers.createCart)
router.post('/cart/validate/:uid',checkAuth, cartsControllers.validateCart)
router.delete('/cart/delete/:uid',checkAuth, cartsControllers.deleteCart)

module.exports = router;