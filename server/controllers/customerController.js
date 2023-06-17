async function getCustomerOrderDetail(req, res) {
  try {
    const customer = await req.context.models.customers.findAll({
      include: [
        {
          model: req.context.models.users,
          as: "users",
          include: [
            {
              model: req.context.models.orders,
              as: "orders",
              include: [
                {
                  model: req.context.models.order_details,
                  as: "order_detail",
                },
              ],
            },
          ],
        },
      ],
    });
  } catch (error) {
    res.send(error);
  }
}

export default { getCustomerOrderDetail };
