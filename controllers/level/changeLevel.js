const { Level } = require("../../models");

const changeLevel = async (req, res) => {
  const { _id } = req.user;
  const { level } = req.body;

  const levelInfo = await Level.findOne({ owner: _id });

  const result = await Level.findByIdAndUpdate(
    levelInfo._id,
    {
      $inc: { level },
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
