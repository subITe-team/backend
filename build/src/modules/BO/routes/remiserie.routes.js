"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const remiserieRoutes = (0, express_1.Router)();
//Routes for Remiserie
remiserieRoutes.get("/", controllers_1.default.remiserie.getAll);
remiserieRoutes.get("/:id", controllers_1.default.remiserie.findOne);
remiserieRoutes.post("/create", controllers_1.default.remiserie.create);
remiserieRoutes.post("/auth/google/login", controllers_1.default.remiserie.loginGoogle);
remiserieRoutes.post("/auth/google/logout", controllers_1.default.remiserie.logoutGoogle);
remiserieRoutes.put("/:id", controllers_1.default.remiserie.update);
remiserieRoutes.delete("/:id", controllers_1.default.remiserie.delete);
exports.default = remiserieRoutes;
//# sourceMappingURL=remiserie.routes.js.map