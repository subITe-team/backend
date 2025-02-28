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
const Car_model_1 = __importDefault(require("../../../../models/Car.model"));
const Remiserie_model_1 = __importDefault(require("../../../../models/Remiserie.model"));
const response_1 = __importDefault(require("../../../../utils/response"));
const error_1 = __importDefault(require("../../../../utils/errors/error"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { remiserie_id, brand, model, patent, color, year, habilitation, insurance, date_onboarding, } = req.body;
    const remiserieExist = yield Remiserie_model_1.default.findByPk(remiserie_id);
    if (!remiserieExist)
        throw new error_1.default("No se encontró la remisería", 404);
    const data_used = yield Car_model_1.default.findOne({
        where: {
            [sequelize_1.Op.or]: [{ patent }, { insurance }],
        },
    });
    if (data_used) {
        let message_error = "";
        if (data_used.patent === patent) {
            message_error = "La patente ya esta en uso";
        }
        else if (data_used.insurance === insurance) {
            message_error = "El número de seguro ya esta en uso";
        }
        throw new error_1.default(message_error, 401);
    }
    const new_car = yield Car_model_1.default.create({
        remiserie_id,
        brand,
        model,
        patent,
        color,
        year,
        habilitation,
        insurance,
        date_onboarding,
    });
    if (new_car)
        (0, response_1.default)(res, 201, `Se creó con éxito el auto ${new_car.model} - ${new_car.patent}`);
    else
        throw new error_1.default("Ocurrio un error, por favor intentalo nuevamente.", 500);
});
//# sourceMappingURL=createNewCar.js.map