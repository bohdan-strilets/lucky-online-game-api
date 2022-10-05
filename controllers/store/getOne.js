const { Store } = require("../../models");

const getOne = async (req, res) => {
  const { itemId } = req.params;

  const result = await Store.findById(itemId);

  if (!result) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found.",
    });
  }

  return res.json({
    status: "ok",
    code: 200,
    item: result,
  });
};

module.exports = getOne;
