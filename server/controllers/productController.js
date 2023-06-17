async function createProduct(req, res) {
  try {
    console.log(req.file, "ini req.file");
    const { name, description, category_id, price, image, quantity } = req.body;
    const product = await req.context.models.products.create({
      name: name,
      description: description,
      category_id: category_id,
      price: price,
      image: image,
      quantity: quantity,
    });
    res.send(product);
  } catch (error) {
    res.send(error);
  }
}

export default { createProduct };
