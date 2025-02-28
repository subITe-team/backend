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
const Remiserie_model_1 = __importDefault(require("../../../../models/Remiserie.model"));
const error_1 = __importDefault(require("../../../../utils/errors/error"));
const response_1 = __importDefault(require("../../../../utils/response"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const remiserie_id = req.params.id;
    // Buscar la remisería por su ID
    const remiserie_finded = yield Remiserie_model_1.default.findByPk(remiserie_id, {
        attributes: { exclude: ["password"] }, // Excluir la columna de la contraseña
    });
    if (!remiserie_finded) {
        throw new error_1.default("La remisería no existe", 404);
    }
    // Respondemos con los datos de la remisería encontrada
    (0, response_1.default)(res, 201, remiserie_finded);
});
//# sourceMappingURL=findRemiserie.js.map