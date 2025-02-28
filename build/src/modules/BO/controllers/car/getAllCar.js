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
const Car_model_1 = __importDefault(require("../../../../models/Car.model"));
const response_1 = __importDefault(require("../../../../utils/response"));
const Driver_model_1 = __importDefault(require("../../../../models/Driver.model"));
const Remiserie_model_1 = __importDefault(require("../../../../models/Remiserie.model"));
exports.default = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Car_model_1.default.findAll({
        include: [
            {
                model: Driver_model_1.default, // Nombre del modelo Driver
                attributes: {
                    exclude: ["password"], // Excluir el atributo 'password' del conductor
                },
                through: { attributes: [] },
            },
            {
                model: Remiserie_model_1.default,
                attributes: {
                    exclude: ["password"],
                },
            },
        ],
        attributes: {
            exclude: ["remiserie_id"], // Excluye la columna "remiserie_id" del modelo Car
        },
    });
    if (data.length === 0)
        (0, response_1.default)(res, 201, []);
    (0, response_1.default)(res, 201, data);
});
//# sourceMappingURL=getAllCar.js.map