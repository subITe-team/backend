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
const error_1 = __importDefault(require("../../../../utils/errors/error"));
const Driver_model_1 = __importDefault(require("../../../../models/Driver.model"));
const database_1 = __importDefault(require("../../../../config/database"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shift, date, remiserie_id, drivers } = req.body;
    // Iniciar una transacción
    const transaction = yield database_1.default.transaction();
    // Crear el nuevo cronograma
    const new_chrono = yield Chronogram_model_1.default.create({
        date,
        remiserie_id,
        shift,
    }, { transaction });
    const driverInstances = yield Driver_model_1.default.findAll({
        where: { id: drivers },
        transaction,
    });
    if (driverInstances.length !== drivers.length) {
        yield transaction.rollback();
        throw new error_1.default("Uno o más conductores no se encontraron", 404);
    }
    yield new_chrono.$set("drivers", driverInstances, { transaction });
    yield transaction.commit();
    (0, response_1.default)(res, 201, "El cronograma se ha creado exitosamente.");
});
//# sourceMappingURL=createNewChronogram.js.map