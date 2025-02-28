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
const sequelize_1 = require("sequelize");
const User_model_1 = __importDefault(require("../../../../models/User.model"));
const response_1 = __importDefault(require("../../../../utils/response"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = __importDefault(require("../../../../utils/errors/error"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, profile_img } = req.body;
    const dataUsed = yield User_model_1.default.findOne({
        where: {
            [sequelize_1.Op.or]: [{ email }, { username }],
        },
    });
    if (dataUsed) {
        let messageError = "";
        if (dataUsed.email === email) {
            messageError = "El Email ya esta en uso";
        }
        else if (dataUsed.username === username) {
            messageError = "El nombre de usuario ya esta en uso";
        }
        throw new error_1.default(messageError, 401);
    }
    const passwordHashed = yield bcrypt_1.default.hash(password, 10);
    const newUser = yield User_model_1.default.create({
        username,
        email,
        password: passwordHashed,
        profile_img,
    });
    if (newUser)
        (0, response_1.default)(res, 201, `Se creo con exito el usuario ${newUser.username}`);
    else
        throw new error_1.default("Ocurrio un error, por favor intentalo nuevamente.", 500);
});
//# sourceMappingURL=createNewUser.js.map