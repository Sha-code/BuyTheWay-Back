const express = require('express');
const ProductModel = require('../models/ProductModel');
const app = express();

app.get('/products', async (req, res) => {
    const products = await ProductModel.find({});

    try {
        res.send(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = app