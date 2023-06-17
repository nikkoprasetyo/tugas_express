import { Router } from "express";
import indexController from "../controllers/indexController";

const route = Router();

route.post(
  "/customer",
  indexController.customerController.getCustomerOrderDetail
);

export default route;
