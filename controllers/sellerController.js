const Product = require('./../models/Product');
const Seller = require('../models/Seller');

exports.createProduct = async (req, res) =>{
    const product = new Product({
        ...req.body,
        seller:req.userId
    })
    await product.save();

    const sellerById = await Seller.findById(req.userId);
    sellerById.products.push(product);
    await sellerById.save();
}

exports.getAllProductsBySellerId = async (req,res) => {
    const productsBySeller = await Product.find({
        seller: req.userId
    }).exec();

    res.send(productsBySeller);
}

exports.updateProduct = async (req, res) => {
    // console.log("updating"+ req.body._id);
     await Product.findByIdAndUpdate(req.body._id, req.body).exec();
}

exports.getAllOrdersForSeller = async(req, res) => {
    const seller = await Seller.findById(req.userId);
    res.send(seller.orders);

}