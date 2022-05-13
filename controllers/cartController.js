const { request } = require('express');
const Product = require('../models/Product');
const Buyer = require('./../models/Buyer');
const Seller = require('./../models/Seller');
const email = require('../utils/emailModule');
const User = require('./../models/User')

const requester = require('request')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const ejs = require('ejs');
const { Mongoose } = require('mongoose');
app.set('view engine', 'ejs');


 var buyerCartItem ={
  product: String,
  price:Number,
  quantity:Number
}

var sellerOrderItem ={
  id:String,
  price:Number,
  quantity:Number,
  shippingInfo:{
    location:String,
    phone:Number
  }
}

exports.addToCart = async(req, res) => {
   const buyer =  await Buyer.findById(req.userId);
   const products = req.body.products;
  //  console.log(products);
   const shippingDetails = req.body.shippingDetails;

      for(i=0; i<products.length; i++){

          buyerCartItem.product = products[i]._id;
          buyerCartItem.price = products[i].price;
          buyerCartItem.quantity = products[i].qty;
          buyer.cart.push(buyerCartItem);

          const product = await Product.findById(products[i].Id);
          // console.log(product.seller);
          // const seller = await Seller.findById(product.seller);


          // console.log("seller is: "+seller);
          sellerOrderItem.id = products[i]._id;
          sellerOrderItem.price = products[i].price;
          sellerOrderItem.quantity = products[i].qty;
          sellerOrderItem.shippingInfo.location = shippingDetails.shippingAddress;
          sellerOrderItem.shippingInfo.phone = shippingDetails.phone;

          // console.log("location is"+sellerOrderItem.shippingInfo.phone );
          // console.log("location is"+sellerOrderItem.shippingInfo.location );

          // console.log("seller order item is"+ sellerOrderItem);
          // console.log(sellerOrderItem);

          // seller.orders.push(sellerOrderItem);
          // await seller.save();
          res.json({"result": 'Added to cart'})
  }

  buyer.shippingInfo.location = shippingDetails.shippingAddress;
  buyer.shippingInfo.phone = shippingDetails.phone;

  await buyer.save();

}

exports.getCartItems = async(req, res) => {
  const buyer =  await Buyer.findById(req.userId);
    
  let tamt = 0 ;   //total amount during checkout
  for (i = 0; i < buyer.cart.length; i++) {
    //console.log(buyer.cart[i])
    tamt = tamt + buyer.cart[i].price
  }
    tamt = 100  // reassigned cause actual vaule of tamt causes maximum amount error in test environment
    const items = buyer.cart
    const id = buyer._id
    res.render('esewa', {items, tamt, id})
}

exports.successfulCheckOut = async(req, res) => {
  const buyer =  await Buyer.findById(req.query.id);
  //console.log(buyer)
  let tamt = 0 ;   //total amount after checkout for fraud Detection
  for (i = 0; i < buyer.cart.length; i++) {
    tamt = tamt + buyer.cart[i].price
  }

  if (req.query.amt != 100){    // tamt instead of 100 for production
    return res.json({result: "failure (Fraud Detected)"})
  }else{

    // reduce quantity of product
    for (i = 0; i < buyer.cart.length; i++) {
        const id = buyer.cart[i]._id
        console.log(id)
        const product = await Product.findById({_id: id})
        const quantity = buyer.cart[i].quantity || 1
        console.log("there" , product)
        product.quantity = product.quantity - quantity
    }


    // send email to both sender and receiver.

    
    try{
        let buyerEmail = await User.findById(buyer._id)
        buyerEmail = buyerEmail.email

      //multiple sellers email
      for (i = 0; i < buyer.cart.length; i++) {
        const id = buyer.cart[i].product
        const sellerEmail = await Product.findById(id)
        console.log(id)
        const product = await Product.findById({_id: id})

      
      }

    email("bishal1paudel@outlook.com","baz9121_a@outlook.com").catch((error)=>{
      console.log(error)
    })
    }catch(e){
      res.send(e)
  }
  

        //emptying the cart
        buyer.cart = [];
        await buyer.save()
        console.log(buyer)
        res.json({result: "Successful"})


  }


  res.json({buyer})

}


exports.failureCheckOut = async(req, res) => {
  res.json({result: "Your process Failed"})
}





//using request library which fails
exports.checkOut = async(req, res) => {
  var path="https://uat.esewa.com.np/epay/main";
  var params= {
    amt: 100,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: 100,
    pid: "ee2c3ca1-696b-4cc5-a6be-2c40d929d453",
    scd: "EPAYTEST",
    su: "http://merchant.com.np/page/esewa_payment_success",
    fu: "http://merchant.com.np/page/esewa_payment_failed"
}
  requester.post(path).form(params)
  res.json()

}