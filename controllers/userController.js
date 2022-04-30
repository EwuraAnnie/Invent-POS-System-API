const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
};

const getSingleUser = async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  res.status(200).json({ user });
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.userId);
  // get user
  if (req.params.userId) {
    let user = await User.findById(req.params.userId);
    if (!user)
      return res.status(400).json({ message: "Invalid user credential" });
  }
  user = await User.findByIdAndDelete(req.params.userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(400).json({ message: "User deleted successfully" });
};

const updateUser = async (req, res) => {
  // get user
  if (req.params.userId) {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res.status(400).json({ message: "Invalid user credential" });
  }

  // find and update user
  const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
  });
  res.status(200).json({ message: "User updated successfully" });
  if (!user) return res.status(400).json({ message: "User not found" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
};
