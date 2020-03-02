const express = require('express');
const mongoose = require('mongoose');
const productRouter = require('./routes/productRoutes.js');

const app = express();
const uri = "mongodb+srv://ByTheWay:bythewayproject@bytheway-qybxr.mongodb.net/bytheway?retryWrites=true&w=majority"
app.use(express.json());

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .catch((error) => console.log(JSON.stringify(error))
    );

app.use(productRouter);

app.listen(3000, () => { console.log('Server is running...') });