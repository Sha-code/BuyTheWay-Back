const mongoose = require('mongoose');

const RankSchema = new mongoose.Schema({
  
    name: {
        type: String,
        required: true,

    },
    breakpoint: {
        type: Number,
        required: true,
    },
   
});

const Rank = mongoose.model("rank", RankSchema);
module.exports = Rank;
