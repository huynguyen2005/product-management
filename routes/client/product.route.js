const express = require('express');
const router = express.Router();


const products = require('../../controllers/client/products.controller');
router.get('/', products.index);

router.get('/edit', products.edit);

router.get('/create', products.create);

//Xuất router ra để file cha có thể sử dụng
module.exports = router;