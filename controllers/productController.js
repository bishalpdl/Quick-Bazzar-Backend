const Product = require('./../models/Product');
const Seller = require('./../models/Seller');

exports.getAllProducts = async (req, res) =>{
    const products = await Product.find({});
    res.send(products);
}

