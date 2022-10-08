const { User } = require("../../models");

const sellItem = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.body;

  const user = await User.findById(_id);
  const products = user.products;

  const arr = products.filter(({ _id }) => _id.toString() !== id);
  const result = await User.findByIdAndUpdate(
    { _id },
    { products: arr },
    { new: true }
  );

  return res.json({
    status: "ok",
    code: 200,
    products: result.products,
  });
};

module.exports = sellItem;
