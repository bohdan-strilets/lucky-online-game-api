const { User, Token, Level, Bet, Statistics } = require("../../models");

const deleteAccount = async (req, res) => {
  const user = req.user;

  const tokens = await Token.findOne({ owner: user._id });
  const level = await Level.findOne({ owner: user._id });
  const statistics = await Statistics.findOne({ owner: user._id });
  const bets = await Bet.find({ owner: user._id });

  await User.findByIdAndRemove(user._id);
  await Token.findByIdAndRemove(tokens._id);
  await Level.findByIdAndRemove(level._id);
  await Statistics.findByIdAndRemove(statistics._id);

  if (bets) {
    await Bet.deleteMany({ owner: user._id });
  }

  return res.json({
    status: "ok",
    code: 200,
    message: "Your account and all your data has been successfully deleted.",
  });
};

module.exports = deleteAccount;
