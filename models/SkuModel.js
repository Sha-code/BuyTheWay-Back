const mongoose = require('mongoose');

const SkuSchema = new mongoose.Schema({

    size: {
        type: String,
        required: true,
        // trim: true,
        // lowercase: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    productId: {
        type: Number,
        required: true,
    }

});

const Sku = mongoose.model("SKU", SkuSchema, "SKU");
module.exports = Sku;
