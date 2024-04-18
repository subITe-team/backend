import { Router } from "express";
// import { getSubites } from "./subite.service";
import usersRoutes from "./routes/users.routes";
import remiserieRoutes from "./routes/remiserie.routes";
import driverRoutes from "./routes/driver.routes";
import carRoutes from "./routes/car.routes";
import chronogramRoutes from "./routes/chronogram.routes";
import passengerRoutes from "./routes/passenger.routes";
import reviewRoutes from "./routes/review.routes";
import travelRoutes from "./routes/travel.routes";

const boRoutes = Router();

//Routes for subite
// boRoutes.get("/",(_req: Request, res: Response) => {
//     res.send("Welcome to the Subite!");
//   });
boRoutes.use("/user", usersRoutes);
boRoutes.use("/remiserie", remiserieRoutes);
boRoutes.use("/driver", driverRoutes);
boRoutes.use("/car", carRoutes);
boRoutes.use("/chronogram", chronogramRoutes);
boRoutes.use("/passenger", passengerRoutes);
boRoutes.use("/review", reviewRoutes);
boRoutes.use("/travel", travelRoutes);

export default boRoutes;
