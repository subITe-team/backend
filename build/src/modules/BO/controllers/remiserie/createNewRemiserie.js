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
const Remiserie_model_1 = __importDefault(require("../../../../models/Remiserie.model"));
const response_1 = __importDefault(require("../../../../utils/response"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = __importDefault(require("../../../../utils/errors/error"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, name_remiserie, phone, profile_img } = req.body;
    const data_used = yield Remiserie_model_1.default.findOne({
        where: {
            [sequelize_1.Op.or]: [{ email }, { name_remiserie }, { phone }],
        },
    });
    if (data_used) {
        let message_error = "";
        if (data_used.email === email) {
            message_error = "El Email ya esta en uso";
        }
        else if (data_used.name_remiserie === name_remiserie) {
            message_error = "El nombre de la remisería ya esta en uso";
        }
        else if (data_used.phone === phone) {
            message_error = "El número de teléfono ya esta en uso";
        }
        throw new error_1.default(message_error, 401);
    }
    const password_hashed = yield bcrypt_1.default.hash(password, 10);
    const new_remiserie = yield Remiserie_model_1.default.create({
        name,
        email,
        password: password_hashed,
        name_remiserie,
        phone,
        profile_img,
    });
    if (new_remiserie)
        (0, response_1.default)(res, 201, `Se creo con exito la remisería ${new_remiserie.name_remiserie}`);
    else
        throw new error_1.default("Ocurrio un error, por favor intentalo nuevamente.", 500);
});
//# sourceMappingURL=createNewRemiserie.js.map