import { Router } from "express";
import controllers from "../controllers";

const reviewRoutes = Router();

//Routes for driver
reviewRoutes.get("/", controllers.review.getAll);
reviewRoutes.get("/:id", controllers.review.findOne);
reviewRoutes.post("/create", controllers.review.create);
reviewRoutes.put("/:id", controllers.review.update);
reviewRoutes.delete("/:id", controllers.review.delete);

export default reviewRoutes;
