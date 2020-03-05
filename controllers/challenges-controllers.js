const HttpError = require ('../models/http-errors');
const ChallengeModel = require('../models/ChallengeModel');


const getChallengeById = async (req, res, next) => {
    const challengeId = req.params.cid;
    if (!challengeId.match(/^[0-9a-fA-F]{24}$/)) {
      return next(new HttpError('could not find a challenge with this id'), 404);
    }
    const challenge = await ChallengeModel.findById(challengeId);
    if (challenge === null) {
      return next(new HttpError('could not find a challenge with this id'), 404);
    }
    res.json({ challenge });
  };

const addNewChallenge = async (req, res, next) => {
  let challenge = new ChallengeModel(req.body);
  challenge.save()
    .then(challenge => {
      res.status(200).json({ 'challenge': 'challenge added successfully' });
    })
    .catch(err => {
      next(new HttpError('adding new challenge failed'), 400);
    });
}
const updatedChallenge = async (req, res, next) => {
  ChallengeModel.findById(req.params.cid, function (err, challenge) {
    if (!challenge)
      res.status(404).send("data is not found");
    else
    challenge.name = req.body.name
    challenge.description = req.body.description
    challenge.fidelity_gain = req.body.fidelity_gain
    challenge.date_start = req.body.date_start
    challenge.date_end = req.body.date_end
    challenge.tag = req.body.tag
    challenge.save().then(challenge => {
      res.json('challenge updated!');
    })
      .catch(err => {
        next(new HttpError('updating challenge failed'), 400);
      });
  });
}
const deletedChallenge = async (req, res, next) => {
    ChallengeModel.findByIdAndDelete({_id: req.params.cid}).then(function(){
      res.json({'challenge': 'challenge deleted!'});
    });
    
}

exports.getChallengeById = getChallengeById;
exports.addNewChallenge = addNewChallenge;
exports.updatedChallenge = updatedChallenge;
exports.deletedChallenge = deletedChallenge;