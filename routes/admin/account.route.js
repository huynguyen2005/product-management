const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/account.controller');
const multer  = require('multer');
const upload = multer(); 
const validate = require('../../validates/admin/product.validate');
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');


router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create', 
    upload.single('avatar'),
    uploadCloud.upload,
    controller.createAccount
);

module.exports = router;