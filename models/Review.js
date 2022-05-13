const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = new mongoose.Schema({
    productId:{
        type: ObjectId,
        ref: 'Product'
    },
    buyerId:{
        type: ObjectId,
        ref: 'Buyer'
    },
    text:{
        type: String
    },
    stars:{
        type: Number,
        min:1,
        default: 1
    }


});

module.exports = mongoose.model("Review", reviewSchema);
