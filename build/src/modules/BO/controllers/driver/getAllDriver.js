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
const Driver_model_1 = __importDefault(require("../../../../models/Driver.model"));
const response_1 = __importDefault(require("../../../../utils/response"));
const Remiserie_model_1 = __importDefault(require("../../../../models/Remiserie.model"));
const Car_model_1 = __importDefault(require("../../../../models/Car.model"));
exports.default = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Driver_model_1.default.findAll({
        attributes: { exclude: ["remiserie_id", "password"] }, // Excluir la columna de la contraseña
        include: [
            {
                model: Remiserie_model_1.default,
                attributes: { exclude: ["driver_id", "password"] }, // Selecciona las columnas que deseas incluir del modelo Car
                // Si también quieres incluir los datos vinculados a las relaciones de Car, puedes anidar más include aquí
            },
            {
                model: Car_model_1.default,
                through: { attributes: [] }, // Esto evita que se incluyan las columnas adicionales de la tabla intermedia
            },
        ],
    });
    if (data.length === 0)
        (0, response_1.default)(res, 201, []);
    (0, response_1.default)(res, 201, data);
});
//# sourceMappingURL=getAllDriver.js.map