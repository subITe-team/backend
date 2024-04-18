import { Router } from "express";
import controllers from "../controllers";

const usersRoutes = Router();

//Routes for User Admin
usersRoutes.get("/", controllers.user.getAll);
usersRoutes.get("/:id", controllers.user.findOne);
usersRoutes.post("/", controllers.user.create);
usersRoutes.put("/:id", controllers.user.update);
usersRoutes.delete("/:id", controllers.user.delete);

export default usersRoutes;
