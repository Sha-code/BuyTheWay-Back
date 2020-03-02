const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        // lowercase: true
    },
    description: {
        type: String,
        required: true,
        // default: ,
        // validate(value) { 
        //   if (value < 0) throw new Error("Negative calories aren't real.");
        // }
    },
    picture: {
        type: String,
        required: true,
        // trim: true,
        // lowercase: true
    },
});

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;