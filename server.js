const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const challengeRouter = require('./routes/challengeRoutes');
const cartRouter = require('./routes/cartRoutes');
const skuRouter = require('./routes/skuRoutes');
const rankRouter = require('./routes/rankRoutes');
const HttpError = require('./models/http-errors');

const app = express();
const uri = "mongodb+srv://ByTheWay:bythewayproject@bytheway-qybxr.mongodb.net/bytheway?retryWrites=true&w=majority"

const whitelist = ['http://18.212.196.17', 'http://localhost:8080', 'http://localhost:8020', 'http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

app.use(bodyParser.json());
app.use(cors(corsOptions));


mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch((error) => console.log(JSON.stringify(error)));

app.use(productRouter);
app.use(userRouter);
app.use(categoryRouter);
app.use(challengeRouter);
app.use(skuRouter);
app.use(cartRouter);
app.use(rankRouter);

app.use((req, res, next) => {
    const error = new HttpError('could not find this route', 404)
    return next(error)
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        message: error.message || 'An unknow error occured!'
    });
});

app.listen(3000, () => {
    console.log('Server is running...')
});

module.exports.app = app 