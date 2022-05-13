const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const buyerSchema = new mongoose.Schema({
    _id:{
        type: ObjectId,
        ref: 'User'
    },

    cart:[{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
        price:{
            type:Number
        },
        quantity:{
            type:Number
        },
        status:{
            type:String
        }
    }
       
     ],

  orderAt: {type: Date},

  shippingInfo:{
            location:String,
            phone:Number
        }
});

module.exports = mongoose.model("Buyer", buyerSchema);