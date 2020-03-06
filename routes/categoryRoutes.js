const express = require('express');
const { check } = require('express-validator')
const categoriesControllers = require('../controllers/categories-controllers');

const router = express.Router();

router.get('/gender/:gender', categoriesControllers.getCategoryByGender)
router.post('/category/add',[
    check('name')
        .not()
        .isEmpty(),
    check('gender')
        .not()
        .isEmpty(),
], categoriesControllers.addNewCategory)
router.post('/category/update/:cid', categoriesControllers.updatedCategory)
router.delete('/category/:cid', categoriesControllers.deletedCategory)

module.exports = router;