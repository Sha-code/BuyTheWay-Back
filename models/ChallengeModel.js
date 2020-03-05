const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
  
    name: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,
    },
    fidelity_gain: {
        type: String,
        required: true,
    },
    date_start: {
        type: Date,
        required: true,
    },
    date_end: {
        type: Date,
        required: true,
    },
    tag: {
        name: {
            type: String,
            required: true,
        }
    }

});

const Challenge = mongoose.model("challenge", ChallengeSchema);
module.exports = Challenge;
