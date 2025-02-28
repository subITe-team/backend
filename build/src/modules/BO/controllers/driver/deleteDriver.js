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
const error_1 = __importDefault(require("../../../../utils/errors/error"));
const response_1 = __importDefault(require("../../../../utils/response"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driver_id = req.params.id;
    // Buscar el conductor por su ID
    const driver_finded = yield Driver_model_1.default.findByPk(driver_id);
    if (!driver_finded) {
        throw new error_1.default("El conductor no existe", 404);
    }
    // Eliminar el conductor
    yield driver_finded.destroy();
    // Respuesta exitosa
    (0, response_1.default)(res, 201, `Se eliminó a ${driver_finded.first_name} exitosamente`);
});
//# sourceMappingURL=deleteDriver.js.map