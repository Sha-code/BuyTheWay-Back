const express = require('express');
const { check } = require('express-validator')
const ranksControllers = require('../controllers/ranks-controllers');

// const checkAuth = require('../middleware/check-auth');


const router = express.Router();


router.get('/ranks', ranksControllers.getAllRanks)
router.get('/rank/:rid', ranksControllers.getRanksById)

// router.use(checkAuth);
router.post('/rank/add', [
    check('name', 'breakpoint')
        .not()
        .isEmpty(),
   
], ranksControllers.addNewRank)
router.post('/rank/update/:rid',
    [
        check('name', 'breakpoint')
            .not()
            .isEmpty(),

    ], ranksControllers.updatedRank)
router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;router.delete('/rank/:rid', ranksControllers.deletedRank)



module.exports = router;