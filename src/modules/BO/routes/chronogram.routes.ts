import { Router } from "express";
import controllers from "../controllers";

const chronogramRoutes = Router();

//Routes for driver
chronogramRoutes.get("/", controllers.chronogram.getAll);
chronogramRoutes.get(
  "/remiserie/:id",
  controllers.chronogram.getAllByRemiserie
);
chronogramRoutes.get("/:id", controllers.chronogram.findOne);
chronogramRoutes.post("/create", controllers.chronogram.create);
chronogramRoutes.put("/:id", controllers.chronogram.update);
chronogramRoutes.delete("/:id", controllers.chronogram.delete);

export default chronogramRoutes;
