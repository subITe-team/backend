import { Router } from "express";
import controllers from "../controllers";

const carRoutes = Router();

//Routes for driver
carRoutes.get("/", controllers.car.getAll);
carRoutes.get("/remiserie/:id", controllers.car.getAllByRemiserie);
carRoutes.get("/:id", controllers.car.findOne);
carRoutes.post("/", controllers.car.create);
carRoutes.put("/:id", controllers.car.update);
carRoutes.delete("/:id", controllers.car.delete);

export default carRoutes;
