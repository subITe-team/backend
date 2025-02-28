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
const error_1 = __importDefault(require("../../../../utils/errors/error"));
const response_1 = __importDefault(require("../../../../utils/response"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chronogram_id = req.params.id;
    const chronogram_finded = yield Chronogram_model_1.default.findByPk(chronogram_id);
    if (!chronogram_finded) {
        throw new error_1.default("El cronograma no existe", 404);
    }
    yield chronogram_finded.destroy();
    // Respuesta exitosa
    (0, response_1.default)(res, 201, "El cronograma se ha eliminado exitosamente.");
});
//# sourceMappingURL=deleteChronogram.js.map