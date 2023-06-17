import { Router } from "express";
import indexController from "../controllers/indexController";

const route = Router();

route.post(
  "/",
  indexController.productCategoryController.createProductCategory
);

route.get(
  "/getUser",
  indexController.productCategoryController.productPerCategory
);

export default route;
