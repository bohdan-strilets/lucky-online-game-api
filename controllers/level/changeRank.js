const { Level } = require("../../models");

const changeRank = async (req, res) => {
  const { _id } = req.user;
  const { rank } = req.body;

  const levelInfo = await Level.findOne({ owner: _id });

  const result = await Level.findByIdAndUpdate(
    levelInfo._id,
    { rank },
    { new: true }
  );

  return res.json({
    status: "ok",
    code: 200,
    rank: result.rank,
  });
};

module.exports = changeRank;
