"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const reviewRoutes = (0, express_1.Router)();
//Routes for driver
reviewRoutes.get("/", controllers_1.default.review.getAll);
reviewRoutes.get("/:id", controllers_1.default.review.findOne);
reviewRoutes.post("/create", controllers_1.default.review.create);
reviewRoutes.put("/:id", controllers_1.default.review.update);
reviewRoutes.delete("/:id", controllers_1.default.review.delete);
exports.default = reviewRoutes;
//# sourceMappingURL=review.routes.js.map