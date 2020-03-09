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

const whitelist= ['http://18.212.196.17/',];
const corsOptions = {
    origin: function(origin, callback){
        if(!origin) return callback(null, true);
        if(whitelist.indexOf(origin) === -1){
          var msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      }
    };
    

app.use(bodyParser.json());
app.use(cors(corsOptions));

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

app.listen(3000, () => { console.log('Server is running...') });
