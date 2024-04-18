import boRoutes from "../modules/BO/bo.routes";

import { Router, Request, Response } from "express";

const routes = Router();

routes.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to the API!");
});
routes.use("/bo", boRoutes);

export default routes;
