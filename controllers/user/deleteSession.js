const { User, Bet, Level, Statistics } = require("../../models");

const deleteSession = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, {
    complexity: null,
    inGame: false,
  });

  const level = await Level.findOne({ owner: _id });
  const statistics = await Statistics.findOne({ owner: _id });

  await Bet.deleteMany({ owner: _id });
  await Level.findByIdAndRemove(level._id);
  await Statistics.findByIdAndRemove(statistics._id);

  return res.json({
    status: "ok",
    code: 200,
    message: "The game session has been successfully deleted.",
  });
};

module.exports = deleteSession;
