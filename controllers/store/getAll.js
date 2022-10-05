const { Store } = require("../../models");

const getAll = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const items = await Store.find({}, "", {
    skip,
    limit: Number(limit),
  });

  return res.json({
    status: "ok",
    code: 200,
    items,
    page,
    limit,
    total: items.length,
  });
};

module.exports = getAll;
