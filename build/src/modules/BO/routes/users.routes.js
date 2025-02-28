"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const usersRoutes = (0, express_1.Router)();
//Routes for User Admin
usersRoutes.get("/", controllers_1.default.user.getAll);
usersRoutes.get("/:id", controllers_1.default.user.findOne);
usersRoutes.post("/", controllers_1.default.user.create);
usersRoutes.put("/:id", controllers_1.default.user.update);
usersRoutes.delete("/:id", controllers_1.default.user.delete);
exports.default = usersRoutes;
//# sourceMappingURL=users.routes.js.map