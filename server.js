const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const challengeRouter = require('./routes/challengeRoutes')
const skuRouter = require('./routes/skuRoutes')
const HttpError = require('./models/http-errors')

const app = express();
const uri = "mongodb+srv://ByTheWay:bythewayproject@bytheway-qybxr.mongodb.net/bytheway?retryWrites=true&w=majority"

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://18.212.196.17');
//     res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
//     res.header('Access-Control-Allow-Origin', 'http://localhost:8020');
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // authorized headers for preflight requests
//     // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();

//     app.options('*', (req, res) => {
//         // allowed XHR methods  
//         res.header('Access-Control-Allow-Methods', 'GET');
//         res.send();
//     });
// });
const whitelist = ['http://18.212.196.17', 'http://localhost:8080', 'http://localhost:8020', 'http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};


app.use(bodyParser.json());


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .catch((error) => console.log(JSON.stringify(error))
    );

app.use(productRouter);
app.use(userRouter);
app.use(categoryRouter);
app.use(challengeRouter)
app.use(skuRouter)

app.use((req, res, next) => {
    const error = new HttpError('could not find this route', 404)
    return next(error)
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknow error occured!' });
});

app.use(cors(corsOptions));
app.options('*', cors(corsOptions))
app.listen(3000, () => { console.log('Server is running...') });
