const { Store } = require("../../models");

const getAll = async (req, res) => {
  const items = await Store.find({});

  return res.json({
    status: "ok",
    code: 200,
    items,
  });
};

module.exports = getAll;
