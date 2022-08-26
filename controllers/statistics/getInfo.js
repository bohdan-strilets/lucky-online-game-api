const { Statistics } = require("../../models");

const getInfo = async (req, res) => {
  const { _id } = req.user;
  const result = await Statistics.findOne({ owner: _id });

  return res.json({
    status: "ok",
    code: 200,
    statistics: result,
  });
};

module.exports = getInfo;
