const express = require('express');
const router = express.Router();


const controller = require('../../controllers/client/user.controller');
router.get('/login', controller.login);
router.post('/login', controller.loginPost);
router.get('/register', controller.register);
router.post('/register', controller.registerPost);
router.get('/logout', controller.logout);
//Xuất router ra để file cha có thể sử dụng
module.exports = router;