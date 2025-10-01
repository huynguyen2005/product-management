const express = require('express');
const router = express.Router();


const products = require('../../controllers/client/products.controller');
router.get('/', products.index);

router.get('/:slug', products.detail);


//Xuất router ra để file cha có thể sử dụng
module.exports = router;