const { User } = require("../../models");

const changeComplexity = async (req, res) => {
  const { complexity, bank } = req.body;
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(
    _id,
    { complexity, bank },
    { new: true }
  );

  return res.json({
    status: "ok",
    code: 200,
    complexity: result.complexity,
    bank: result.bank,
  });
};

module.exports = changeComplexity;
