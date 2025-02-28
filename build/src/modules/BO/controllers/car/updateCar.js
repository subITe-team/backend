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
const response_1 = __importDefault(require("../../../../utils/response"));
const error_1 = __importDefault(require("../../../../utils/errors/error"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Obtener el ID del conductor a actualizar
    const { remiserie_id, brand, model, patent, color, year, habilitation, insurance, date_onboarding, } = req.body;
    // Verificar si existe un conductor con el ID proporcionado
    const car_finded = yield Car_model_1.default.findByPk(id);
    if (!car_finded) {
        throw new error_1.default("El auto no existe", 404);
    }
    const where_conditions = [{ id: { [sequelize_1.Op.not]: id } }];
    if (patent !== undefined) {
        where_conditions.push({ patent });
    }
    if (insurance !== undefined) {
        where_conditions.push({ insurance });
    }
    const where_clause = {
        [sequelize_1.Op.or]: where_conditions,
    };
    const data_used = yield Car_model_1.default.findOne({ where: where_clause });
    console.log(data_used);
    if (data_used) {
        let message_error = "";
        if (data_used.patent === patent) {
            message_error = "La patente ya está en uso";
        }
        else if (data_used.insurance === insurance) {
            message_error = "El número de seguro ya está en uso";
        }
        throw new error_1.default(message_error, 401);
    }
    //Creo un objeto personalizado solo con los datos que el usuario desea modificar
    const update_data = {};
    if (remiserie_id)
        update_data.remiserie_id = remiserie_id;
    if (brand)
        update_data.brand = brand;
    if (model)
        update_data.model = model;
    if (color)
        update_data.color = color;
    if (year)
        update_data.year = year;
    if (habilitation)
        update_data.habilitation = habilitation;
    if (patent)
        update_data.patent = patent;
    if (insurance)
        update_data.insurance = insurance;
    if (date_onboarding)
        update_data.date_onboarding = date_onboarding;
    //asigno los cambios
    const data_updated = yield car_finded.update(update_data);
    (0, response_1.default)(res, 200, `Se actualizó con éxito el auto con patente ${data_updated.patent}`);
});
//# sourceMappingURL=updateCar.js.map