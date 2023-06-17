import { Router } from "express";
import indexController from "../controllers/indexController";

const route = Router();

route.post("/register", indexController.userController.registerUser);
route.post("/login", indexController.userController.loginUser);
route.get("/getUser", indexController.userController.getCustomerAndAccount);

export default route;
