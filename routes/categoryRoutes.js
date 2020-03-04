const express = require('express');
var cors = require('cors');
const categoriesControllers = require('../controllers/categories-controllers');

const router = express.Router();

router.get('/gender/:gender',cors(), categoriesControllers.getCategoryByGender)

module.exports = router;