const express = require('express');
var cors = require('cors');
const productsControllers = require('../controllers/products-controllers');


const router = express.Router();


router.get('/products', cors(), productsControllers.getAllProducts)
router.get('/products/:pid', cors(), productsControllers.getProductById)
router.get('/category/:cid', cors(), productsControllers.getProductByCategory)
router.post('/products/add', cors(), productsControllers.addNewProduct)
router.post('/products/update/:pid', cors(), productsControllers.updatedProduct)
router.post('/products/remove/:pid', cors(), productsControllers.removeProductById)



module.exports = router;



