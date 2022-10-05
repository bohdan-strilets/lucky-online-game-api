const { Store } = require("../../models");

const addOne = async (req, res) => {
  const item = req.body;

  if (!item) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad requiest.",
    });
  }

  const itemTitle = await Store.findOne({ title: item.title });

  if (itemTitle) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "A product with the same name already exists.",
    });
  }

  const result = await Store.create(item);

  return res.status(201).json({
    status: "ok",
    code: 201,
    item: result,
  });
};

module.exports = addOne;
