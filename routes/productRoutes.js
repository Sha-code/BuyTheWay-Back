const express = require('express');
const { check } = require('express-validator');
const productsControllers = require('../controllers/products-controllers');


const router = express.Router();



router.get('/products', productsControllers.getAllProducts)
router.get('/products/:pid', productsControllers.getProductById)
router.get('/category/:cid', productsControllers.getProductByCategory)
router.post('/products/add',[
    check('sku','name','description','price','picture','category')
        .not()
        .isEmpty(),
], productsControllers.addNewProduct)
router.post('/products/update/:pid', productsControllers.updatedProduct)
router.post('/products/remove/:pid', productsControllers.removeProductById)



module.exports = router;




