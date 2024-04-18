import { Router } from "express";
import controllers from "../controllers";

const driverRoutes = Router();

//Routes for driver
driverRoutes.get("/", controllers.driver.getAll);
driverRoutes.get("/:id", controllers.driver.findOne);
driverRoutes.post("/create", controllers.driver.create);
driverRoutes.put("/:id", controllers.driver.update);
driverRoutes.delete("/:id", controllers.driver.delete);

export default driverRoutes;
