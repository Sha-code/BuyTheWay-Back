const express = require('express');
const productsControllers = require('../controllers/products-controllers');


const router = express.Router();



router.get('/products', productsControllers.getAllProducts)
router.get('/products/:pid', productsControllers.getProductById)
router.get('/category/:cid', productsControllers.getProductByCategory)
router.post('/products/add', productsControllers.addNewProduct)
router.post('/products/update/:pid', productsControllers.updatedProduct)
router.delete('/products/remove/:pid', productsControllers.removeProductById)



module.exports = router;




