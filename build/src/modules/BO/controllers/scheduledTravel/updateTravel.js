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
const ScheduledTravel_model_1 = __importDefault(require("../../../../models/ScheduledTravel.model"));
const response_1 = __importDefault(require("../../../../utils/response"));
const error_1 = __importDefault(require("../../../../utils/errors/error"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Obtener el ID del conductor a actualizar
    const { driver_id, passenger_id, car_id, start_time, origin, remiserie_id, destiny, review_id, } = req.body;
    // Verificar si existe un conductor con el ID proporcionado
    const travel_finded = yield ScheduledTravel_model_1.default.findByPk(id);
    if (!travel_finded) {
        throw new error_1.default("El viaje no existe", 404);
    }
    //Creo un objeto personalizado solo con los datos que el usuario desea modificar
    const update_data = {};
    if (passenger_id)
        update_data.passenger_id = passenger_id;
    if (remiserie_id)
        update_data.remiserie_id = remiserie_id;
    if (driver_id)
        update_data.driver_id = driver_id;
    if (review_id)
        update_data.review_id = review_id;
    if (car_id)
        update_data.car_id = car_id;
    if (start_time)
        update_data.start_time = start_time;
    if (origin)
        update_data.origin = origin;
    if (destiny)
        update_data.destiny = destiny;
    //asigno los cambios
    const data_updated = yield travel_finded.update(update_data);
    if (!data_updated)
        throw new error_1.default("Ha ocurrido un error, por favor intentelo nuevamente", 500);
    (0, response_1.default)(res, 200, `Se actualizó el viaje exitosamente`);
});
//# sourceMappingURL=updateTravel.js.map