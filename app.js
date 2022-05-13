const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const ejs = require('ejs')


require('dotenv').config();
require('./connections/mongodb-con');

const userController = require("./controllers/userController");
const productRouter = require('./routes/productRoutes');
const sellerRouter = require('./routes/sellerRoutes');
const cartRouter = require('./routes/cartRoutes');
const reviewRouter = require('./routes/reviewRoutes')

// middlewares
app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');


app.post('/api/signup',userController.signUp);
app.post('/api/login', userController.logIn);

app.use('/api/products', productRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/cart', cartRouter);
app.use('/api/review', reviewRouter)

app.post('/api/esewa', (req, res) =>{
    console.log("esewa from backend");
    // console.log(req.body)
   axios.post('https://uat.esewa.com.np/epay/main',{
       ...req.body
   })
   .then(result=>{
    //    console.log(result);
    //  res.send(result.data)
    //    esewaPage =fs.readFileSync(data);
    //    console.log("Esewa page is "+esewaPage);
      
    // res.setHeader('Content-Type', "text/html");

    //    res.write(result.data);
    //    res.end();
       res.send(result.data);

    })
//    .catch(err=>res.send(err))
      .catch(err=>console.log("error is"+err))
})

const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    // console.log(port);
    console.log(`App running on port: ${port}`);
})