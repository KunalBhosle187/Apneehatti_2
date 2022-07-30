const express = require("express");
const {
  getProducts,
  getProduct,
  addProduct,
  singleFileUpload,
  updateProduct,
  updateManyProduct,
  deleteManyProduct,
} = require("../controller/productController");

const multer = require("multer");
const { upload } = require("../middleware/fileUploadMiddleware");
const { checkMultipart } = require("../middleware/checkMultipart");
// var upload=multer({dest:"uploads/"});

const router = express.Router();
// GET ROUTE FOR ALL PRODUCTS
router.route("/products").get(getProducts);

// GET ROUTE FOR ALL PRODUCTS
router
  .route("/singleFileUpload")
  .post(upload.array("image", 4), singleFileUpload);

// GET ROUTE FOR SINGLE PRODUCT
router.route("/products/:number").get(getProduct);

// ADD ROUTE FOR ADD NEW PRODUCTS
router.route("/product/upload").post(upload.array("image", 4), addProduct);

// PATCH ROUTE FOR UPDATE PRODUCT
router.route("/products/edit/:productId").patch(updateProduct);

// PATCH ROUTE FOR UPDATE MANY PRODUCT
router.route("/products/updateMany").patch(updateManyProduct);

// PATCH ROUTE FOR DELETE MANY PRODUCT
router.route("/products/deleteMany").patch(deleteManyProduct);

module.exports = router;
