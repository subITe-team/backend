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
const Review_model_1 = __importDefault(require("../../../../models/Review.model"));
const response_1 = __importDefault(require("../../../../utils/response"));
const error_1 = __importDefault(require("../../../../utils/errors/error"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Obtener el ID del conductor a actualizar
    const { driver_id, passenger_id, travel_id, description, card_stars } = req.body;
    // Verificar si existe un conductor con el ID proporcionado
    const review_finded = yield Review_model_1.default.findByPk(id);
    if (!review_finded) {
        throw new error_1.default("La calificación no existe", 404);
    }
    // Verificar si los datos nuevos ya están en uso por otro conductor
    // Para eso primero creo un {} que se encargara de tener las clausulas que debo buscar en la DB
    //   const where_clause: any = {
    //     id: { [Op.not]: id }, // Excluir la remisería actual de la busqueda
    //   };
    //   if (travel_id !== undefined) {
    //     where_clause[Op.or] = [{ travel_id }];
    //   }
    //   // En caso de que el usuario quizo modificar algunos de los campos de arriba
    //   // que deben ser unicos, debo realizar una consulta a la DB con esos datos
    //   if (where_clause[Op.or].length > 0) {
    //     const data_used = await Review.findOne({ where: where_clause });
    //     //Si ya estan en uso devuelvo un error
    //     if (data_used) {
    //       let message_error = "";
    //       if (data_used.travel_id === travel_id) {
    //         message_error = "El viaje ya está en calificado";
    //       }
    //       throw new ClientError(message_error, 401);
    //     }
    //   }
    const where_conditions = [{ id: { [sequelize_1.Op.not]: id } }];
    if (travel_id !== undefined) {
        where_conditions.push({ travel_id });
    }
    const where_clause = {
        [sequelize_1.Op.or]: where_conditions,
    };
    const data_used = yield Review_model_1.default.findOne({ where: where_clause });
    if (data_used) {
        let message_error = "";
        if (data_used.travel_id === travel_id) {
            message_error = "El viaje ya está en calificado";
        }
        throw new error_1.default(message_error, 401);
    }
    //Creo un objeto personalizado solo con los datos que el usuario desea modificar
    const update_data = {};
    if (driver_id)
        update_data.driver_id = driver_id;
    if (passenger_id)
        update_data.passenger_id = passenger_id;
    if (travel_id)
        update_data.travel_id = travel_id;
    if (description)
        update_data.description = description;
    if (card_stars)
        update_data.card_stars = card_stars;
    //asigno los cambios
    const data_updated = yield review_finded.update(update_data);
    if (!data_updated)
        throw new error_1.default("Ocurrio un error, por favor intentelo nuevamente", 500);
    (0, response_1.default)(res, 200, `La calificación se actualizó exitosamente`);
});
//# sourceMappingURL=updateReview.js.map