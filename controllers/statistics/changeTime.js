const { Statistics } = require("../../models");

const changeTime = async (req, res) => {
  const { _id } = req.user;
  const { timeInGame } = req.body;

  const statistics = await Statistics.findOne({ owner: _id });

  const result = await Statistics.findByIdAndUpdate(
    statistics._id,
    {
      $inc: { timeInGame },
    },
    { new: true }
  );

  return res.json({
    status: "ok",
    code: 200,
    timeInGame: result.timeInGame,
  });
};

module.exports = changeTime;
