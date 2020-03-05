const express = require('express');
const skuControllers = require('../controllers/sku-controllers');


const router = express.Router();



router.get('/sku/:sid', skuControllers.getSkuById)
router.post('/sku/add', skuControllers.addNewSku)
router.post('/sku/updateOne/:sid', skuControllers.updatedSku)
router.post('/sku/removeAll/:pid', skuControllers.removeSkuByProductId)



module.exports = router;