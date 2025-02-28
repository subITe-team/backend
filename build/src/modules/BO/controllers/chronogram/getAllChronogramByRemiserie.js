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
const Chronogram_model_1 = __importDefault(require("../../../../models/Chronogram.model"));
const response_1 = __importDefault(require("../../../../utils/response"));
const Driver_model_1 = __importDefault(require("../../../../models/Driver.model"));
const Remiserie_model_1 = __importDefault(require("../../../../models/Remiserie.model"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield Chronogram_model_1.default.findAll({
        where: { remiserie_id: id },
        attributes: {
            exclude: ["remiserie_id"], // Excluir el atributo 'remiserie_id'
        },
        include: [
            {
                model: Driver_model_1.default, // Nombre del modelo Driver
                attributes: {
                    exclude: ["password", "remiserie_id"], // Excluir el atributo 'password' del conductor
                },
                through: {
                    attributes: [], // Esto excluye los atributos de la tabla intermedia (DriverChronogram)
                },
            },
            {
                model: Remiserie_model_1.default, // Nombre del modelo Remiserie
                as: "remiserie", // Alias si se define en la relación
                attributes: {
                    exclude: ["password", "subscription_date"],
                },
            },
        ],
    });
    (0, response_1.default)(res, 201, data);
});
//# sourceMappingURL=getAllChronogramByRemiserie.js.map