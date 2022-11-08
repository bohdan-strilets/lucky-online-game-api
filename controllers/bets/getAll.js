const { Bet } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;

  const bets = await Bet.find({ owner: _id })
    .sort({ createdAt: -1 })
    .populate("owner", "_id name avatarURL");

  return res.json({
    status: "ok",
    code: 200,
    bets,
  });
};

module.exports = getAll;
