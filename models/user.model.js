const { Schema, model } = require("mongoose");

const shopSchema = new Schema(
  {
    shopName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phoneNumber: {
      type: Number,
    },
    location: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      length: 12,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Shop", shopSchema);
