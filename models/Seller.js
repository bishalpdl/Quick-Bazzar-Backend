const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const sellerSchema = new mongoose.Schema({
    _id:{
        type: ObjectId,
        ref: 'User'
    },

    products:[{
        type: ObjectId,
        ref: 'Product'
    }],

    orders:[
      { 
            orderAt: Date,
            product:{
                type: ObjectId,
                ref: 'Product'
            },
           price:Number,
           quantity:Number,
           shippingInfo:{
                location:String,
                phone:Number
              }
            
      }
    ]
});

module.exports = mongoose.model("Seller", sellerSchema);

        //   shippingInfo:[
        //     {
        //         location:String,
        //         phoneNum:Number
        //     }
        // ]
        
// // });const sellerSchema = new mongoose.Schema({
//     _id:{
//         type: ObjectId,
//         ref: 'User'
//     },

//     products:[{
//         type: ObjectId,
//         ref: 'Product'
//     }],

//     orders:[
//         {orderAt:{
//             type: Date
//         }},
//        {product:{
//            type: ObjectId,
//            ref: 'Product'
//        }},
//        {price:{
//            type:Number
//        }},
//        {quantity:{
//            type:Number
//        }},
//        {shippingInfo:[
//           {location:{
//               type:String
//              }
//           },
//           {phoneNum:{
//               type:Number
//              }
//           }
//     ]}

//         //   shippingInfo:[
//         //     {
//         //         location:String,
//         //         phoneNum:Number
//         //     }
//         // ]
        
// });
