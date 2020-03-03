const express = require('express');
const productsControllers = require('../controllers/products-controllers');

const router = express.Router();

router.get('/products', productsControllers.getAllProducts)
router.get('/products/id/:pid', productsControllers.getProductById)



module.exports = router;