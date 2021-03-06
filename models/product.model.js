const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    stock: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
