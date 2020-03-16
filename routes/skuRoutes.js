const express = require('express');
const skuControllers = require('../controllers/sku-controllers');

// const checkAuth = require('../middleware/check-auth');


const router = express.Router();



//router.use(checkAuth);

router.get('/sku/:sid', skuControllers.getSkuById)
router.get('/skus-by-product/:pid', skuControllers.getSkuByProductId)
// router.use(checkAuth);
router.post('/sku/add', skuControllers.addNewSku)
router.post('/sku/update-one/:sid', skuControllers.updatedSku)
router.delete('/sku/remove-all/:pid', skuControllers.removeSkuByProductId)



module.exports = router;