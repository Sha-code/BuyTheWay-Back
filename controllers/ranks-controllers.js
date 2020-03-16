const HttpError = require ('../models/http-errors');
const { validationResult } = require('express-validator')
const RankModel = require('../models/RankModel');

const getAllRanks = async (req, res) => {
  const ranks = await RankModel.find({});
  res.json({ ranks });
};

const getRanksById = async (req, res, next) => {
    const rankId = req.params.rid;
    if (!rankId.match(/^[0-9a-fA-F]{24}$/)) {
      return next(new HttpError('could not find a rank with this id'), 404);
    }
    const rank  = await RankModel.findById(rankId);
    if (rank === null) {
      return next(new HttpError('could not find a rank with this id'), 404);
    }
    res.json({ rank });
};

const addNewRank = async (req, res, next) => {
  const fail = validationResult(req);
  if (!fail.isEmpty()){
      res.status(422).json({'ranks':'inputs error'})
  }
  let rank = new RankModel(req.body);
  rank.save()
    .then(rank => {
      res.status(200).json({ 'rank': 'rank added successfully' });
    })
    .catch(err => {
      next(new HttpError('adding new rank failed'), 400);
    });
};

const updatedRank = async (req, res, next) => {
  const fail = validationResult(req);
  if (!fail.isEmpty()){
   
      res.status(422).json({'ranks':'inputs error'})
  }
  RankModel.findById(req.params.rid, function (err, rank) {
    if (!rank)
      res.status(404).send("data is not found");
    else
    rank.name = req.body.name
    rank.breakpoint = req.body.breakpoint
    rank.save().then(rank => {
      res.json('rank updated!');
    })
      .catch(err => {
        next(new HttpError('updating rank failed'), 400);
      });
  });
};

const deletedRank = async (req, res, next) => {
    RankModel.findByIdAndDelete({_id: req.params.rid}).then(function(){
      res.json({'rank': 'rank deleted!'});
    });  
};

exports.getAllRanks = getAllRanks;
exports.getRanksById = getRanksById;
exports.addNewRank = addNewRank;
exports.updatedRank = updatedRank;
exports.deletedRank = deletedRank;