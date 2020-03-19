const express = require('express');
const skuControllers = require('../controllers/sku-controllers');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/sku/:sid', skuControllers.getSkuById);
router.get('/skus-by-product/:pid', skuControllers.getSkuByProductId);
router.post('/sku/add',checkAuth, skuControllers.addNewSku);
router.post('/sku/update-one/:sid',checkAuth, skuControllers.updatedSku);
router.delete('/sku/remove-all/:pid',checkAuth, skuControllers.removeSkuByProductId);

module.exports = router;
