const { Bet } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const total = await Bet.find({ owner: _id });
  const bets = await Bet.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name avatarURL");

  return res.json({
    status: "ok",
    code: 200,
    bets,
    page,
    limit,
    total: total.length,
  });
};

module.exports = getAll;
