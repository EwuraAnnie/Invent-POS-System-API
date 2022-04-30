const Shop = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { shopName, email, phoneNumber, location, password } = req.body;

  // check if email is already registered
  const shopExist = await Shop.findOne({ email });
  if (shopExist)
    return res
      .status(400)
      .json({ message: "Email is already registered with an account" });

  const shopNameExist = await Shop.findOne({ shopName });
  if (shopNameExist)
    return res
      .status(400)
      .json({ message: "shopName is already registered with an account" });

  const phoneExist = await Shop.findOne({ phoneNumber });
  if (phoneExist)
    return res.status(400).json({ message: "Phone number already exist" });

  //encrypt password
  const hashedPassword = await bcrypt.hash(password, 12);

  const shop = await Shop.create({
    shopName,
    email,
    phoneNumber,
    location,
    password: hashedPassword,
  });

  return res.status(201).json({ shop });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // check if email exist
  const shop = await Shop.findOne({ email });
  if (!shop) return res.status(400).json({ message: "Invalid credentials" });

  // decrypt and compare if password matches the one in the database
  const isMatch = await bcrypt.compare(password, shop.password);
  if (!isMatch) return res.status(404).json({ message: "Invalid Credentials" });

  //generate access token
  const accessToken = jwt.sign({ id: shop._id }, "123456780", {
    expiresIn: "1h",
  });
  res.status(200).json({ accessToken, shop });
};

module.exports = {
  register,
  login,
};
