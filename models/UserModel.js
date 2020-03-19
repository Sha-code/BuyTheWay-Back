const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
       
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
            required: false,
        },
        surname: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        address_bis: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        postal_code: {
            type: Number,
            required: false,
        },
        country: {
            type: String,
            required: false,
        },
    }

});

const User = mongoose.model("user", UserSchema);
module.exports = User;
