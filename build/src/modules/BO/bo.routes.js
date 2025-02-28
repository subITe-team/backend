"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { getSubites } from "./subite.service";
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const remiserie_routes_1 = __importDefault(require("./routes/remiserie.routes"));
const driver_routes_1 = __importDefault(require("./routes/driver.routes"));
const car_routes_1 = __importDefault(require("./routes/car.routes"));
const chronogram_routes_1 = __importDefault(require("./routes/chronogram.routes"));
const passenger_routes_1 = __importDefault(require("./routes/passenger.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
const travel_routes_1 = __importDefault(require("./routes/travel.routes"));
const boRoutes = (0, express_1.Router)();
//Routes for subite
// boRoutes.get("/",(_req: Request, res: Response) => {
//     res.send("Welcome to the Subite!");
//   });
boRoutes.use("/user", users_routes_1.default);
boRoutes.use("/remiserie", remiserie_routes_1.default);
boRoutes.use("/driver", driver_routes_1.default);
boRoutes.use("/car", car_routes_1.default);
boRoutes.use("/chronogram", chronogram_routes_1.default);
boRoutes.use("/passenger", passenger_routes_1.default);
boRoutes.use("/review", review_routes_1.default);
boRoutes.use("/travel", travel_routes_1.default);
exports.default = boRoutes;
//# sourceMappingURL=bo.routes.js.map