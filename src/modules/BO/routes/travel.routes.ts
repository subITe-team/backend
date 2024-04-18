import { Router } from "express";
import controllers from "../controllers";

const travelRoutes = Router();

//Routes for driver
travelRoutes.get("/", controllers.travel.getAll);
travelRoutes.get("/:id", controllers.travel.findOne);
travelRoutes.post("/create", controllers.travel.create);
travelRoutes.put("/:id", controllers.travel.update);
travelRoutes.delete("/:id", controllers.travel.delete);

export default travelRoutes;
