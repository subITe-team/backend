import { Router } from "express";
import controllers from "../controllers";

const passengerRoutes = Router();

//Routes for driver
passengerRoutes.get("/", controllers.passenger.getAll);
passengerRoutes.get("/:id", controllers.passenger.findOne);
passengerRoutes.post("/create", controllers.passenger.create);
passengerRoutes.put("/:id", controllers.passenger.update);
passengerRoutes.delete("/:id", controllers.passenger.delete);

export default passengerRoutes;
