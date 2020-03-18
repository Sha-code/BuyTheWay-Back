const express = require('express');
const { check } = require('express-validator')
const categoriesControllers = require('../controllers/categories-controllers');

const checkAuth = require('../middleware/check-auth');



const router = express.Router();

router.get('/gender/:gender', categoriesControllers.getCategoryByGender);

// router.use(checkAuth);
router.post('/category/add',checkAuth, [

    check('name')
        .not()
        .isEmpty(),
    check('gender')
        .not()
        .isEmpty(),
], categoriesControllers.addNewCategory);
router.post('/category/update/:cid',checkAuth, categoriesControllers.updatedCategory);
router.delete('/category/:cid',checkAuth, categoriesControllers.deletedCategory);

module.exports = router;