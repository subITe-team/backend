"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const driverRoutes = (0, express_1.Router)();
//Routes for driver
driverRoutes.get("/", controllers_1.default.driver.getAll);
driverRoutes.get("/:id", controllers_1.default.driver.findOne);
driverRoutes.post("/create", controllers_1.default.driver.create);
driverRoutes.put("/:id", controllers_1.default.driver.update);
driverRoutes.delete("/:id", controllers_1.default.driver.delete);
exports.default = driverRoutes;
//# sourceMappingURL=driver.routes.js.map