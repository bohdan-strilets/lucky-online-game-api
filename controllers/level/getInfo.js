const { Level } = require("../../models");

const getInfo = async (req, res) => {
  const { _id } = req.user;
  const result = await Level.findOne({ owner: _id });

  return res.json({
    status: "ok",
    code: 200,
    level: result,
  });
};

module.exports = getInfo;
