const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        // trim: true,
        // lowercase: true
    },
    fidelity: {
        type: Number,
        required: true,
        trim: true,
    },
    mail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    rank: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    customer: {
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        address_bis: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: true,
        },
        postal_code: {
            type: Number,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    }

});

const User = mongoose.model("user", UserSchema);
module.exports = User;
