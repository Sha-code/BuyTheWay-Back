const express = require('express');
const challengesControllers = require('../controllers/challenges-controllers');


const router = express.Router();


router.get('/challenge/:cid', challengesControllers.getChallengeById)
router.post('/challenge/add', challengesControllers.addNewChallenge)
router.post('/challenge/update/:cid', challengesControllers.updatedChallenge)
router.delete('/challenge/:cid', challengesControllers.deletedChallenge)



module.exports = router;