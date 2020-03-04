const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const categoryRouter = require ('./routes/categoryRoutes');
const HttpError = require('./models/http-errors')

const app = express();
const uri = "mongodb+srv://ByTheWay:bythewayproject@bytheway-qybxr.mongodb.net/bytheway?retryWrites=true&w=majority"

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

app.use((req, res, next) => {
    const error = new HttpError('could not find this route', 404)
    return next(error)
});

app.use((error, req, res, next)=>{
  if (res.headerSent) {
      return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknow error occured!'});
});

app.listen(3000, () => { console.log('Server is running...') });