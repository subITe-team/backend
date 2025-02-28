"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const chronogramRoutes = (0, express_1.Router)();
//Routes for driver
chronogramRoutes.get("/", controllers_1.default.chronogram.getAll);
chronogramRoutes.get("/remiserie/:id", controllers_1.default.chronogram.getAllByRemiserie);
chronogramRoutes.get("/:id", controllers_1.default.chronogram.findOne);
chronogramRoutes.post("/create", controllers_1.default.chronogram.create);
chronogramRoutes.put("/:id", controllers_1.default.chronogram.update);
chronogramRoutes.delete("/:id", controllers_1.default.chronogram.delete);
exports.default = chronogramRoutes;
//# sourceMappingURL=chronogram.routes.js.map