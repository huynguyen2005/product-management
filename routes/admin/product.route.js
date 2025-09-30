const express = require('express');
const router = express.Router();
const multer  = require('multer');

const storageMulter = require('../../helpers/storageMulter');
const upload = multer({ storage : storageMulter() }); //Đường dẫn là nó sẽ đứng từ thư mục gốc để nó đi vào folder uploads
const controller = require('../../controllers/admin/product.controller');
const validate = require('../../validates/admin/product.validate');

router.get('/', controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteProduct);

router.get("/create", controller.create);

// router.post("/create", controller.createProduct);

router.post(
    '/create', 
    upload.single('thumbnail'), 
    validate.createProduct,
    controller.createProduct
); //multer lấy file từ input có tên là thumbnail về req.file

module.exports = router;