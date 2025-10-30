const express = require('express');
const router = express.Router();


const products = require('../../controllers/client/products.controller');
router.get('/', products.index);

router.get('/:slugCategory', products.category);

router.get('/detail/:slugProduct', products.detail);


//Xuất router ra để file cha có thể sử dụng
module.exports = router;