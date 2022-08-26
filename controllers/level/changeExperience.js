const { Level } = require("../../models");

const changeExperience = async (req, res) => {
  const { _id } = req.user;
  const { experience } = req.body;

  const levelInfo = await Level.findOne({ owner: _id });

  const result = await Level.findByIdAndUpdate(
    levelInfo._id,
    {
      $inc: { experience },
    },
    { new: true }
  );

  return res.json({
    status: "ok",
    code: 200,
    level: result.experience,
  });
};

module.exports = changeExperience;
