"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const travelRoutes = (0, express_1.Router)();
//Routes for driver
travelRoutes.get("/", controllers_1.default.travel.getAll);
travelRoutes.get("/:id", controllers_1.default.travel.findOne);
travelRoutes.post("/create", controllers_1.default.travel.create);
travelRoutes.put("/:id", controllers_1.default.travel.update);
travelRoutes.delete("/:id", controllers_1.default.travel.delete);
exports.default = travelRoutes;
//# sourceMappingURL=travel.routes.js.map