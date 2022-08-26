const { Bet } = require("../../models");

const createBet = async (req, res) => {
  const { _id } = req.user;
  const result = await Bet.create({ owner: _id, ...req.body });

  return res.status(201).json({
    status: "ok",
    code: 201,
    Bet: result,
  });
};

module.exports = createBet;
