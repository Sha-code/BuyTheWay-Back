const express = require('express');
const { check } = require('express-validator');
const productsControllers = require('../controllers/products-controllers');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

router.get('/products', productsControllers.getAllProducts)
router.get('/products/tendance', productsControllers.getProductByTendance)
router.get('/products/:pid', productsControllers.getProductById)
router.get('/category/:cid', productsControllers.getProductByCategory)
router.get('/date', productsControllers.getProductByDate)
router.get('/random', productsControllers.getRandomProducts)

// router.use(checkAuth);

router.post('/products/add', checkAuth, [
    check('sku', 'name', 'description', 'price', 'picture', 'category')
        .not()
        .isEmpty(),
], productsControllers.addNewProduct)
router.post('/products/update/:pid',checkAuth, productsControllers.updatedProduct)
router.post('/products/switch/:pid',checkAuth, productsControllers.updatedTendance)
router.delete('/products/remove/:pid',checkAuth, productsControllers.removeProductById)



module.exports = router;




