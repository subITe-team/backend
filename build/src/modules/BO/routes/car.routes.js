"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const carRoutes = (0, express_1.Router)();
//Routes for driver
carRoutes.get("/", controllers_1.default.car.getAll);
carRoutes.get("/remiserie/:id", controllers_1.default.car.getAllByRemiserie);
carRoutes.get("/:id", controllers_1.default.car.findOne);
carRoutes.post("/", controllers_1.default.car.create);
carRoutes.put("/:id", controllers_1.default.car.update);
carRoutes.delete("/:id", controllers_1.default.car.delete);
exports.default = carRoutes;
//# sourceMappingURL=car.routes.js.map