const { User } = require("../../models");

const changeComplexity = async (req, res) => {
  const { complexity } = req.body;
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(
    _id,
    { complexity },
    { new: true }
  );

  return res.json({
    status: "ok",
    code: 200,
    complexity: result.complexity,
  });
};

module.exports = changeComplexity;
