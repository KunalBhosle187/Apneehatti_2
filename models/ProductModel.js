const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      title: {
        type: String,
        // required:true
      },
      image: [
        {
          type: String,
          // required:true
        },
      ],
      vdo: [
        {
          type: String,
        },
      ],
      mainCategory: {
        type: String,
        // required:true
      },
      subCategory: {
        type: String,
        // required:true
      },
      description: {
        type: String,
        //   required:true
      },
      price: {
        type: String,
        // required:true
      },
      actualPrice: {
        type: String,
        // required:true
      },
      off: {
        type: String,
        // required:true
      },
      store: {
        type: String,
        // required:true
      },
      countInStock: {
        type: Number,
        // required:true
      },
      isDelevered: {
        type: Boolean,
        required: true,
        default: false,
      },
      DeleveredAt: {
        type: Date,
      },
    },
  ],
  { timestamps: true }
);

// const amazon = mongoose.connection.useDb('amazon')

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
