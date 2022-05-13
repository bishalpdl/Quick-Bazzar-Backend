const express = require('express');
const router = express.Router();
const {getUserId} = require('./../middlewares/getUserId');

const sellerController = require('./../controllers/sellerController');

router
   .route('/products')
   .get(getUserId, sellerController.getAllProductsBySellerId)
   .post(getUserId, sellerController.createProduct)
   .put(getUserId, sellerController.updateProduct);

router
   .route('/orders')
   .get(getUserId, sellerController.getAllOrdersForSeller);

   module.exports = router;