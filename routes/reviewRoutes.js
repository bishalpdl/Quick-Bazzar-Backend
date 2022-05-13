const express = require('express');
const router = express.Router();
const {getUserId} = require('./../middlewares/getUserId');
const Review = require('./../models/Review')
const User = require('../models/User')

//url format : /api/review/234324234324    // where numerial is id of product
router.post('/:productId', getUserId, async(req, res)=>{
    const review = new Review({
        ...req.body,
        buyerId: req.userId,
        productId: req.params.productId  
    })
    await review.save();
    res.json({result: "Review Posted"})
})

//url format : /api/review/234324234324    // where numerial is id of product
router.get('/:productId', async(req, res)=>{
    console.log("print")
    let review;
    //checking if productId is wrong 
    try{
        review = await Review.find({productId :req.params.productId})
    }catch(e){
        return res.json({result: "error"})
    }

    // adding user name splitting from email
    let reviews = []
    for (i = 0; i < review.length; i++) {

        const userEmail = await User.findById(review[i].buyerId)
        const user = userEmail.email.split("@")[0];
        let ve ={
            review: review[i],
            user: user
        }
        reviews.push(ve)
        console.log(review[i])
     }


    res.json(reviews)
})



module.exports = router;