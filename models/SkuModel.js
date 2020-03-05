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
        type: String,
        required: true,
    }

});

const Category = mongoose.model("category", CategorySchema);
module.exports = Category;
