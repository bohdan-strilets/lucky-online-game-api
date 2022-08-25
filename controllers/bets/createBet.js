const { Bets } = require("../../models");

const createBet = async (req, res) => {
  const { _id } = req.user;
  const result = await Bets.create({ owner: _id, ...req.body });

  return res.status(201).json({
    status: "ok",
    code: 201,
    bets: result,
  });
};

module.exports = createBet;
