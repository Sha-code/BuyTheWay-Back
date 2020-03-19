const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    items: [{
        product_id: {
            type: String,
        },
        size: {
            type: String,

        },
        picture: {
            type: String,

        },
        name: {
            type: String,

        },
        quantity: {
            type: Number,
        },
        price: {
            type: Number,
        },
        sku: {
            type: Number,
        }
    }],
    total_price: {
        type: Number,
    },
    status: {
        type: String,
        default: "en cours"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

});


const Cart = mongoose.model("cart", CartSchema);
module.exports = Cart;