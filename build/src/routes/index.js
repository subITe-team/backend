"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bo_routes_1 = __importDefault(require("../modules/BO/bo.routes"));
const express_1 = require("express");
const routes = (0, express_1.Router)();
routes.get("/", (_req, res) => {
    res.send("Welcome to the API!");
});
routes.use("/bo", bo_routes_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map