const express = require('express');
const router = express.Router();
const Buyer = require('./../models/Buyer')
const Product = require('./../models/Product')
const User = require('./../models/User')
const Seller = require('./../models/Seller')
const email = require('../utils/emailModule')

const {getUserId} = require('./../middlewares/getUserId');
const cartController = require('./../controllers/cartController');

 router
  .route ('/')
  .post(getUserId, cartController.addToCart)
  .get(getUserId, cartController.getCartItems);

router.post('/checkOut', cartController.checkOut);  
router.get('/checkSuccessfulCheckOut', getUserId, cartController.successfulCheckOut)
router.get('/checkFailureCheckOut', getUserId, cartController.failureCheckOut)

router.get('/afteresewa', getUserId, async(req, res) => {
  const buyer = await Buyer.findById(req.userId);
  //console.log("here", buyer)
  let tamt = 0 ;   //total amount after checkout for fraud Detection
  for (i = 0; i < buyer.cart.length; i++) {
    tamt = tamt + buyer.cart[i].price
  }

  if (req.query.amt != 100){    // tamt instead of 100 for production
    return res.json({result: "failure (Fraud Detected)"})
  }else{

    // reduce quantity of product
    for (i = 0; i < buyer.cart.length; i++) {
        const id = buyer.cart[i].product
        console.log(id)
        const product = await Product.findById(id)
        const quantity = buyer.cart[i].quantity || 1
        product.quantity = product.quantity - quantity
    }


    // send email to both sender and receiver.

    
        let buyerEmail = await User.findById(buyer._id)
        buyerEmail = buyerEmail.email
        let sellerEmail
        let product
        console.log(buyerEmail)
      
        //multiple sellers email
      for (i = 0; i < buyer.cart.length; i++) {
        const id = buyer.cart[i].product
        console.log(id)
        product = await Product.findById({_id: id})
        console.log(product)
        const seller = await User.findById({_id: product.seller})
        sellerEmail = seller.email
        console.log(sellerEmail)
      }


      // should be inside for loop but sending multiple mail causes Outbound
      email(sellerEmail, buyerEmail, product).catch((error)=>{
        console.log(error)
      })

   
  

        //emptying the cart
        buyer.cart = [];
        await buyer.save()
        res.json({result: "Successful"})


  }


 // res.json({buyer})

}

)


//  router
//   .route ('/seller')
//   .post(cartController.addCartToSeller);

module.exports = router;