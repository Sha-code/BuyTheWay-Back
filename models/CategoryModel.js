const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  customId:{
        type: Number
    },
    name: {
        type: String,
        required: true,
        // trim: true,
        // lowercase: true
    },
    gender: {
        type: String,
        required: true,
    }

});

const Category = mongoose.model("category", CategorySchema);
module.exports = Category;
