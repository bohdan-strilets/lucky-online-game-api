const { User, Level, Statistics } = require("../../models");

const createSession = async (req, res) => {
  const { complexity } = req.body;
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(
    _id,
    {
      complexity,
      inGame: true,
    },
    { new: true }
  );

  const userLevel = await Level.create({ owner: result._id });
  const userStatistics = await Statistics.create({ owner: result._id });

  return res.json({
    status: "ok",
    code: 200,
    user: {
      name: result.name,
      email: result.email,
      complexity: result.complexity,
      inGame: result.inGame,
    },
    userLevel,
    userStatistics,
  });
};

module.exports = createSession;
