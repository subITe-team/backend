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
const Passenger_model_1 = __importDefault(require("../../../../models/Passenger.model"));
const response_1 = __importDefault(require("../../../../utils/response"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = __importDefault(require("../../../../utils/errors/error"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, address, email, birthdate, password, phone, latitude, longitude, dni, remiserie_id, profile_img, } = req.body;
    const data_used = yield Passenger_model_1.default.findOne({
        where: {
            [sequelize_1.Op.or]: [{ email }, { dni }, { phone }],
        },
    });
    if (data_used) {
        let message_error = "";
        if (data_used.email === email) {
            message_error = "El Email ya esta en uso";
        }
        else if (data_used.dni === dni) {
            message_error = "El DNI ya esta en uso";
        }
        else if (data_used.phone === phone) {
            message_error = "El número de teléfono ya esta en uso";
        }
        throw new error_1.default(message_error, 401);
    }
    const password_hashed = yield bcrypt_1.default.hash(password, 10);
    const new_passenger = yield Passenger_model_1.default.create({
        first_name,
        last_name,
        email,
        password: password_hashed,
        address,
        phone,
        dni,
        birthdate,
        latitude,
        longitude,
        remiserie_id,
        profile_img,
    });
    if (new_passenger)
        (0, response_1.default)(res, 201, `Se creo con éxito al pasajero ${new_passenger.first_name.toUpperCase()} ${new_passenger.last_name.toUpperCase()}`);
    else
        throw new error_1.default("Ocurrio un error, por favor intentalo nuevamente.", 500);
});
//# sourceMappingURL=createNewPassenger.js.map