const jwt = require('jsonwebtoken');

exports.getUserId = (req, res, next) =>{
     token = req.headers.authorization.split(" ")[1];
     decoded_token = jwt.decode(token);
     // console.log(`Decoded token is ${decoded_token}`)
     req.userId =  decoded_token._id;
     next();
}