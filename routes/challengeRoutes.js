const express = require('express');
const { check } = require('express-validator')
const challengesControllers = require('../controllers/challenges-controllers');

const checkAuth = require('../middleware/check-auth');


const router = express.Router();


router.get('/challenges', challengesControllers.getAllChallenges)
router.get('/challenge/:cid', challengesControllers.getChallengeById)

// router.use(checkAuth);
router.post('/challenge/add',checkAuth, [
    check('title', 'fidelity_gain', 'date_start', 'date_end', 'tag')
        .not()
        .isEmpty(),
    check('description').isLength({ min: 5 }),

], challengesControllers.addNewChallenge)
router.post('/challenge/update/:cid',checkAuth,
    [
        check('title', 'fidelity_gain', 'date_start', 'date_end', 'tag')
            .not()
            .isEmpty(),
        check('description').isLength({ min: 5 }),

    ], challengesControllers.updatedChallenge)
router.delete('/challenge/:cid', checkAuth,challengesControllers.deletedChallenge)



module.exports = router;