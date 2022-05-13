const express = require('express');
const { getUserId } = require('../middlewares/getUserId');
const router = express.Router();
const Product = require('../models/Product')

const productController = require('./../controllers/productController');

router
  .route('/')
  .get(productController.getAllProducts);


  //   url format: http://localhost:8000/api/products/bycategory?category=electronics
router.get('/bycategory', async(req, res)=>{
  const category = req.query.category
  if(category === undefined){
    return res.send({})
  }
  
  try{
    const products = await Product.find({category: category})
    res.json({products})
  }catch{
    res.json({})
  }
})

router.delete('/product/:id', getUserId, async (req, res) => {
  try {
   // const product = await Product.findOneAndDelete({_id:req.params.id})
    
    //yo chai id veterw rw tehi seller le delete garna payo tara aaru le delete garna na paunna lai
    const product = await Task.findOneAndDelete({_id:req.params.id, seller:req.userId})

    if (!product) {
        res.status(404).send()
    }

    res.send(product)
  } catch (e) {
      res.status(500).send()
  }
})



module.exports = router;