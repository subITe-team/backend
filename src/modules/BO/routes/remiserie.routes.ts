import { Router } from "express";
import controllers from "../controllers";

const remiserieRoutes = Router();

//Routes for Remiserie
remiserieRoutes.get("/", controllers.remiserie.getAll);
remiserieRoutes.get("/:id", controllers.remiserie.findOne);
remiserieRoutes.post("/create", controllers.remiserie.create);
remiserieRoutes.put("/:id", controllers.remiserie.update);
remiserieRoutes.delete("/:id", controllers.remiserie.delete);

export default remiserieRoutes;
