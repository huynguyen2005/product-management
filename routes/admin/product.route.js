const express = require('express');
const router = express.Router();
const multer  = require('multer');

// const storageMulter = require('../../helpers/storageMulter');
const upload = multer(); 

const controller = require('../../controllers/admin/product.controller');
const validate = require('../../validates/admin/product.validate');
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');

router.get('/', controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteProduct);

router.get("/create", controller.create);

// router.post("/create", controller.createProduct);

router.post(
    '/create', 
    upload.single('thumbnail'), 
    uploadCloud.upload,
    validate.createProduct,
    controller.createProduct
); 


router.get("/edit/:id", controller.edit);

router.patch(
    '/edit/:id', 
    upload.single('thumbnail'), 
    validate.createProduct,
    controller.editProduct
);

router.get("/detail/:id", controller.detail);
module.exports = router;