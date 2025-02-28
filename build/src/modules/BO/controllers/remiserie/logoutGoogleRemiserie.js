"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Remiserie_model_1 = __importDefault(require("../../../../models/Remiserie.model"));
const response_1 = __importDefault(require("../../../../utils/response"));
const error_1 = __importDefault(require("../../../../utils/errors/error"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, email } = req.body;
    const user_found = yield Remiserie_model_1.default.findOne({ where: { email } });
    if (!user_found)
        throw new error_1.default("No se encontró el usuario", 404);
    if (user_found.token === token) {
        user_found.token = null;
    }
    yield user_found.save();
    (0, response_1.default)(res, 200, "Has Cerrado Sesión");
});
//# sourceMappingURL=logoutGoogleRemiserie.js.map