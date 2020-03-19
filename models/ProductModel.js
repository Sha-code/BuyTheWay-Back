const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    sku: {
        type: Number,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,

    },
    tendance: {
        type: String,
        required: false,
    },
    price: {
        type: String,
        required: true,
    },
    picture: {
        picture1: {
            type: String,
            required: true,
        },
        picture2: {
            type: String,
            required: true,
        }
    },
    category: {
        id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        }

    },
    created_at: {
        type: Date,
        default: Date.now
    }

});

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
