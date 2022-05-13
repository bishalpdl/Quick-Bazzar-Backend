const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.schema({
      orderAt:{
          type: Date
      },
     product:{
         type: ObjectId,
         ref:Product
     },
     price:{
         type:Number
     },
     quantity:{
         type:Number
     },
     shippingInfo:[
        {location:{
            type:String
           }
        },
        {phoneNum:{
            type:Number
           }
        }
                  ]
});

module.exports = mongoose.model("Order", orderSchema);