"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const passengerRoutes = (0, express_1.Router)();
//Routes for driver
passengerRoutes.get("/", controllers_1.default.passenger.getAll);
passengerRoutes.get("/:id", controllers_1.default.passenger.findOne);
passengerRoutes.post("/create", controllers_1.default.passenger.create);
passengerRoutes.put("/:id", controllers_1.default.passenger.update);
passengerRoutes.delete("/:id", controllers_1.default.passenger.delete);
exports.default = passengerRoutes;
//# sourceMappingURL=passenger.routes.js.map