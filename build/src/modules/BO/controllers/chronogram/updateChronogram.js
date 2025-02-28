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
const Driver_model_1 = __importDefault(require("../../../../models/Driver.model"));
const response_1 = __importDefault(require("../../../../utils/response"));
const error_1 = __importDefault(require("../../../../utils/errors/error"));
const database_1 = __importDefault(require("../../../../config/database"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { drivers, shift, date, remiserie_id } = req.body;
    // Iniciar una transacción
    const transaction = yield database_1.default.transaction();
    // Verificar si existe un cronograma con el ID proporcionado
    const chronogram_finded = yield Chronogram_model_1.default.findByPk(id, { transaction });
    if (!chronogram_finded) {
        throw new error_1.default("El cronograma no existe", 404);
    }
    // Crear un objeto personalizado solo con los datos que el usuario desea modificar
    const update_data = {};
    if (date)
        update_data.date = date;
    if (shift)
        update_data.shift = shift;
    if (remiserie_id)
        update_data.remiserie_id = remiserie_id;
    // Asignar los cambios
    yield chronogram_finded.update(update_data, { transaction });
    // Buscar los conductores por sus IDs si se proporcionan
    if (drivers && drivers.length > 0) {
        const driverInstances = yield Driver_model_1.default.findAll({
            where: { id: drivers },
            transaction,
        });
        if (driverInstances.length !== drivers.length) {
            throw new error_1.default("Uno o más conductores no existen", 400);
        }
        // Asocia los conductores con el cronograma
        yield chronogram_finded.$set("drivers", driverInstances, { transaction });
    }
    // Confirmar la transacción
    yield transaction.commit();
    (0, response_1.default)(res, 200, "Se actualizó con éxito el cronograma");
    //   const { id } = req.params;
    //   const { drivers, shift, date, remiserie_id } = req.body as RequestBody;
    //   // Verificar si existe un conductor con el ID proporcionado
    //   const chronogram_finded = await Chronogram.findByPk(id);
    //   if (!chronogram_finded) {
    //     throw new ClientError("El cronograma no existe", 404);
    //   }
    //   //Creo un objeto personalizado solo con los datos que el usuario desea modificar
    //   const update_data: Partial<Chronogram> = {};
    //   if (date) update_data.date = date;
    //   if (shift) update_data.shift = shift;
    //   if (remiserie_id) update_data.remiserie_id = remiserie_id;
    //   //asigno los cambios
    //   await chronogram_finded.update(update_data);
    //   response(res, 200, "Se actualizó con éxito el cronograma");
});
//# sourceMappingURL=updateChronogram.js.map