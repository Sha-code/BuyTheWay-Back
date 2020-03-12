const express = require('express');
const cartsControllers = require('../controllers/carts-controllers');
const checkAuth = require('../middleware/check-auth');


const router = express.Router();

router.use(checkAuth);
/*
TODO:
router de création cart + update sku
router d'update cart + update sku
router de suppression cart + update sku 
router de commande ? à l'heure actuelle peut être la meme utilisation que la route précédente ?
*/
module.exports = router;