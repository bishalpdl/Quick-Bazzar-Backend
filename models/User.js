const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Seller = require('./Seller');
const Buyer = require('./Buyer');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: ['true', 'Email is Required'],
        unique:true,
        trim:true,
        // validate:{
        //     validator: function(v){
        //         if(!validator.isEmail(v)){
        //             throw new Error('Email format error')
        //         }
        //     }
        // }
    },

    password:{
        type: String,
        minlength:5
    },

    isSeller:{
        type: Boolean
    }
})

userSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
    } catch (error) {
        next(error)
    }
});

userSchema.post('save', async function(user, next){
    try {
        if(user.isSeller){
            const seller = new Seller({
                _id: user._id
            })
            await seller.save();
        }
        else{
            const buyer = new Buyer({
                _id: user._id
            })
            await buyer.save();
        }
    } catch (error) {
        next(error)
    }
});


module.exports = mongoose.model("User", userSchema);