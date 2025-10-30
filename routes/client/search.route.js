const express = require('express');
const router = express.Router();


const controller = require('../../controllers/client/search.controller');
router.get('/', controller.index);

//Xuất router ra để file cha có thể sử dụng
module.exports = router;