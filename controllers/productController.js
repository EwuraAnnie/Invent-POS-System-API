const Product = require("../models/product.model");
const Shop = require("../models/user.model");

const getProducts = async (req, res) => {
  const products = await Product.find().populate("shop");
  res.status(200).json({ products });
};

const getProduct = async (req, res) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId).populate("shop");
  res.status(200).json({ product });
};

const createProduct = async (req, res) => {
  // get store
  const shop = await Shop.findOne(req.body.shop._id);
  if (!shop) return res.status(400).json({ msg: "Store not found" });
  // create product
  const product = await Product.create({ ...req.body, image: req.file.path });
  res.status(201).json({ product });
};

const updateProduct = async (req, res) => {
  // get store
  if (req.body.shop) {
    const shop = await Shop.findById(req.body.shop._id);
    if (!shop) return res.status(400).json({ message: "Invalid store" });
  }

  // find and update
  const product = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
    }
  );
  if (!product)
    return res
      .status(404)
      .json({ status: "fail", message: "Can't find product" });
  res.status(200).json({ status: "success", product });
};

const deleteProduct = async (req, res) => {
  // get store
  if (req.body.shop) {
    const shop = await Shop.findById(req.body.shop);
    if (!shop) return res.status(400).json({ message: "Invalid store" });
  }

  const product = await Product.findByIdAndDelete(req.params.productId);
  if (!product)
    return res
      .status(404)
      .json({ status: "fail", message: "can't find product" });

  res.status(400).json({ message: "Product deleted successfully." });
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
