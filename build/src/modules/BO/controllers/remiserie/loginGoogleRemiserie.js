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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = __importDefault(require("../../../../utils/errors/error"));
const config_1 = __importDefault(require("../../../../config/config"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, name_remiserie, email, phone, profile_img } = req.body;
    let user_found = yield Remiserie_model_1.default.findOne({ where: { email } });
    if (!user_found) {
        const password_hashed = yield bcrypt_1.default.hash("googleAccessAllowed", 10);
        user_found = yield Remiserie_model_1.default.create({
            name,
            name_remiserie,
            email,
            phone,
            password: password_hashed,
            profile_img,
        });
    }
    if (!user_found)
        throw new error_1.default("No se pudo crear el usuario", 400);
    const payload = {
        id: user_found.id,
        name,
        name_remiserie,
        email,
        phone,
        profile_img,
    };
    const token = jsonwebtoken_1.default.sign(payload, config_1.default.JWT_SECRET);
    user_found.token = token;
    yield user_found.save();
    (0, response_1.default)(res, 201, token);
});
//# sourceMappingURL=loginGoogleRemiserie.js.map