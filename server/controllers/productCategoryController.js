async function createProductCategory(req, res) {
  try {
    const { name, description } = req.body;
    const productCategory = await req.context.models.product_categories.create({
      name: name,
      description: description,
      createdat: new Date(),
      updatedat: new Date(),
    });
    res.send(productCategory);
  } catch (error) {
    res.send(error);
  }
}

async function productPerCategory(req, res) {
  try {
    const perCategory = await req.context.models.product_categories.findAll({
      include: [
        {
          model: req.context.models.products,
          as: "products",
        },
      ],
    });
    res.send(perCategory);
  } catch (error) {
    res.send(error);
  }
}

export default {
  createProductCategory,
  productPerCategory,
};
