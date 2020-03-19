const HttpError = require('../models/http-errors');
const {
  validationResult
} = require('express-validator')
const ChallengeModel = require('../models/ChallengeModel');


// const getAllChallenges = async (req, res) => {
//   const challenges = await ChallengeModel.find({});
//   res.json({ challenges });
// };
const getAllChallenges = async (req, res, next) => {
  ChallengeModel.find({} , function(err, response) {
    challenges = response;
  })
    .then(() => {
      res.json({
        challenges
      });
    })
    .catch((err) => {
      next(new HttpError('could not get all challenges'), 400);
    });
};
const getChallengeById = async (req, res, next) => {
  const challengeId = req.params.cid;
  if (!challengeId.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new HttpError('This id is not allowed'), 404);
  }
  const challenge = await ChallengeModel.findById(challengeId);
  if (challenge === null) {
    return next(new HttpError('could not find a challenge with this id'), 404);
  }
  then(challenge => {
      res.json({
        challenge
      });
    })
    .catch(() => {
      next(new HttpError('an error as occured'), 400);
    });

};

const addNewChallenge = async (req, res, next) => {
  const fail = validationResult(req);
  if (!fail.isEmpty()) {
    res.status(422).json({
      'challenges': 'inputs error'
    })
  }
  let challenge = new ChallengeModel(req.body);
  challenge.save()
    .then(challenge => {
      res.status(200).json({
        'challenge': 'challenge added successfully'
      });
    })
    .catch(err => {
      next(new HttpError('adding new challenge failed'), 400);
    });
}
const updatedChallenge = async (req, res, next) => {
  const fail = validationResult(req);
  if (!fail.isEmpty()) {
    res.status(422).json({
      'challenges': 'inputs error'
    });
  }
  ChallengeModel.findById(req.params.cid, function (err, challenge) {
    if (!challenge) {
      res.status(404).send("data is not found");
    } else {
      challenge.name = req.body.name;
      challenge.description = req.body.description;
      challenge.fidelity_gain = req.body.fidelity_gain;
      challenge.date_start = req.body.date_start;
      challenge.date_end = req.body.date_end;
      challenge.tag = req.body.tag;
      challenge.save()
        .then(challenge => {
          res.json('challenge updated!');
        })
        .catch(err => {
          next(new HttpError('updating challenge failed'), 400);
        });
    }
  });
}
const deletedChallenge = async (req, res, next) => {
  ChallengeModel.findByIdAndDelete({
      _id: req.params.cid
    })
    .then(() => {
      res.json({
        'challenge': 'challenge deleted!'
      });
    })
    .catch(err => {
      next(new HttpError('delete challenge failed'), 400);
    });
}

exports.getAllChallenges = getAllChallenges;
exports.getChallengeById = getChallengeById;
exports.addNewChallenge = addNewChallenge;
exports.updatedChallenge = updatedChallenge;
exports.deletedChallenge = deletedChallenge;