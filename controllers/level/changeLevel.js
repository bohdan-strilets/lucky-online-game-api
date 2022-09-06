const { Level } = require("../../models");

const changeLevel = async (req, res) => {
  const { _id } = req.user;

  const levelInfo = await Level.findOne({ owner: _id });

  const result = await Level.findByIdAndUpdate(
    levelInfo._id,
    {
      $inc: { level: 1 },
    },
    { new: true }
  );

  return res.json({
    status: "ok",
    code: 200,
    level: result.level,
  });
};

module.exports = changeLevel;
