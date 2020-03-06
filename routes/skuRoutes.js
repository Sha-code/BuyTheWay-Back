const express = require('express');
const skuControllers = require('../controllers/sku-controllers');


const router = express.Router();



router.get('/sku/:sid', skuControllers.getSkuById)
router.get('/skus-by-product/:pid', skuControllers.getSkuByProductId)
router.post('/sku/add', skuControllers.addNewSku)
router.post('/sku/update-one/:sid', skuControllers.updatedSku)
router.delete('/sku/remove-all/:pid', skuControllers.removeSkuByProductId)



module.exports = router;