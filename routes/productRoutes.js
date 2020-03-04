const express = require('express');
const productsControllers = require('../controllers/products-controllers');

const router = express.Router();

router.get('/products', productsControllers.getAllProducts)
router.get('/products/:pid', productsControllers.getProductById)
router.get('/category/:cid', productsControllers.getProductByCategory)





module.exports = router;