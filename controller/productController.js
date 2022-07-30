const Product = require("../models/ProductModel");

const asyncHandler = require("express-async-handler");
const { upload } = require("../middleware/fileUploadMiddleware");
const { uploadFile } = require("../middleware/s3Bucket");
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const { updateMany } = require("../models/ProductModel");
const io = require("../server");
const sharp = require("sharp");
const path = require("path");

// const simulateAsyncPause = () =>
//   new Promise((resolve) => {
//     setTimeout(() => resolve(), 1000);
//   });
// open a Change Stream on the "haikus" collection
const changeStream = Product.watch();
// set up a listener when change events are emitted
changeStream.on("change", async (next) => {
  // process any change event
  const test = await Product.find({});
  console.log("received a change to the collection: \t", next);
  io.ioObject.sockets.emit("get-updatedProducts", test);
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.number);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
});

const addProduct = asyncHandler(async (req, res) => {
  const {
    title,
    vdo,
    mainCategory,
    subCategory,
    description,
    price,
    store,
    countInStock,
    actualPrice,
    off,
  } = req.body;

  const bucketname = process.env.AWS_BUCKET_NAME;
  const region = process.env.AWS_BUCKET_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_SECRET_KEY;

  const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
  });

  try {
    const files = await req.files;
    if (files == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    const ResponseData = [];
    const BufferData = [];

    files.map(async (x) => {
      // Resize, compress and convert image before upload
      sharp(x.buffer)
        .resize({ width: 512 })
        .jpeg({ quality: 80 })
        .toBuffer()
        .then(function (outputBuffer) {
          s3.upload(
            {
              Bucket: bucketname,
              Key:
                x.fieldname + "-" + Date.now() + path.extname(x.originalname),
              Body: outputBuffer,
            },
            async (err, data) => {
              await ResponseData.push(data);
              if (ResponseData.length == files.length) {
                console.log("result from s3 bucket", ResponseData);
                const s3Array = ResponseData.map((imageUrl) => {
                  return imageUrl.Location;
                });

                const product = new Product({
                  title,
                  image: s3Array,
                  vdo: vdo ? vdo.slice(17, 28) : null,
                  mainCategory,
                  subCategory,
                  description,
                  price,
                  actualPrice,
                  off,
                  store,
                  countInStock: countInStock == "undefined" ? 0 : countInStock,
                });
                const uploadProduct = await product.save();
                return res.send({
                  message: "Product Successfully Uploaded",
                  data: await uploadProduct,
                });
              }
            }
          );
        });
      console.log(x);
    });
  } catch (error) {
    res.status(400).json(console.log(error));
  }
});

const singleFileUpload = async (req, res, next) => {
  try {
    return res.send({
      message: "file uploaded successfully",
      data: await req.files,
    });
  } catch (error) {
    res.status(400).send("Something went wrong!", error);
  }
};

const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: productId },
      req.body,
      { new: true }
    );
    res.send(updatedProduct);
    res.status(200).json(`Product Update Successfully  ${updatedProduct}`);
  } catch (error) {
    res.status(400).json(error);
  }
});

const updateManyProduct = asyncHandler(async (req, res) => {
  const { updaterFields, id } = req.body;
  console.log(req.body);
  try {
    const updatedManyProduct = await Product.updateMany(
      { _id: { $in: req.body.id } },
      req.body.updaterFields
    );

    const calculateDiscount = await Product.find({
      _id: { $in: req.body.id },
    });
    if (calculateDiscount) {
      const resultData = calculateDiscount.map(
        async (x) =>
          await Product.updateMany(
            {
              _id: x,
            },
            {
              price: x.actualPrice - (x.actualPrice * updaterFields.off) / 100,
              updaterFields,
            }
          )
      );
      console.log("output", Promise.all(resultData));
      const updatedManyProductResult = await Product.find({});
      res.send(updatedManyProductResult);
      res.status(200).json(console.log(`Product Update Many Successfully`));
    }
  } catch (error) {
    res.status(400).json(console.log(error));
  }
});

const deleteManyProduct = asyncHandler(async (req, res) => {
  const { updaterFields, id } = req.body;
  console.log(req.body);
  try {
    const deletedManyProduct = await Product.deleteMany(
      { _id: { $in: req.body.id } },
      req.body.updaterFields
    );
    res.status(200).json("Product deleted successfully");
    return res.send({
      message: "Product deleted Uploaded",
      data: await deletedManyProduct,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  singleFileUpload,
  updateProduct,
  updateManyProduct,
  deleteManyProduct,
};
