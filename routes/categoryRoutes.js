const express = require('express');
const categoriesControllers = require('../controllers/categories-controllers');

const router = express.Router();

router.get('/gender/:gender', categoriesControllers.getCategoryByGender)

module.exports = router;