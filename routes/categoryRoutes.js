const express = require('express');
const categoriesControllers = require('../controllers/categories-controllers');

const router = express.Router();

router.get('/gender/:gender', categoriesControllers.getCategoryByGender)
router.post('/category/add', categoriesControllers.addNewCategory)
router.post('/category/update/:cid', categoriesControllers.updatedCategory)
router.delete('/category/:cid', categoriesControllers.deletedCategory)

module.exports = router;