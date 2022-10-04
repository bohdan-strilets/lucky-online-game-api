const { User } = require("../../models");

const getAllUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const total = await User.find();
  const allUsers = await User.find({}, "", {
    skip,
    limit: Number(limit),
  })
    .populate("level")
    .populate("statistics");

  return res.json({
    status: "ok",
    code: 200,
    allUsers,
    page,
    limit,
    total: total.length,
  });
};

module.exports = getAllUsers;
