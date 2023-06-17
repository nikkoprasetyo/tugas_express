import { Router } from "express";
import indexController from "../controllers/indexController";
import middleware from "../middlewares/upload";

const route = Router();

route.post(
  "/create",
  middleware.upload,
  indexController.productController.createProduct
);

export default route;
