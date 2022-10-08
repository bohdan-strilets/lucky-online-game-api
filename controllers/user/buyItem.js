const { Store, User } = require("../../models");

const buyItem = async (req, res) => {
  const { id } = req.body;
  const { _id } = req.user;

  const item = await Store.findById(id);

  if (!item) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "A product with this ID does not exist.",
    });
  }

  const result = await User.findByIdAndUpdate(
    { _id },
    { $push: { products: item } },
    { new: true }
  );

  return res.json({
    status: "ok",
    code: 200,
    products: result.products,
  });
};

module.exports = buyItem;
