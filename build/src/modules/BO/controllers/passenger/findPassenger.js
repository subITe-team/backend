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
const Passenger_model_1 = __importDefault(require("../../../../models/Passenger.model"));
const error_1 = __importDefault(require("../../../../utils/errors/error"));
const response_1 = __importDefault(require("../../../../utils/response"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const passenger_id = req.params.id;
    // Buscar al conductor por su ID
    const passenger_finded = yield Passenger_model_1.default.findByPk(passenger_id, {
        attributes: { exclude: ["password"] }, // Excluir la columna de la contraseña
    });
    if (!passenger_finded)
        throw new error_1.default("El pasajero no existe", 404);
    // Respondemos con los datos del conductor encontrada
    (0, response_1.default)(res, 201, passenger_finded);
});
//# sourceMappingURL=findPassenger.js.map