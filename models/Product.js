const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type: String
    },
    price:{
        type:Number,
        min:0
    },
    quantity:{
        type: Number,
        min:0,
        default:0
    }, 
    seller:{
        type: ObjectId,
        ref: 'Seller'
    }
});

module.exports = mongoose.model('Product', productSchema);