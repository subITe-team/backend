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
const Remiserie_model_1 = __importDefault(require("../../../../models/Remiserie.model"));
const response_1 = __importDefault(require("../../../../utils/response"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = __importDefault(require("../../../../utils/errors/error"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Obtener el ID de la remisería a actualizar
    const { name, email, password, name_remiserie, phone, profile_img } = req.body;
    // Verificar si existe una remisería con el ID proporcionado
    const remiserie_finded = yield Remiserie_model_1.default.findByPk(id);
    if (!remiserie_finded) {
        throw new error_1.default("La remisería no existe", 404);
    }
    // Verificar si los datos nuevos ya están en uso por otra remisería
    // Para eso primero creo un {} que se encargara de tener las clausulas que debo buscar en la DB
    //   const where_clause: any = {
    //     id: { [Op.not]: id }, // Excluir la remisería actual de la busqueda
    //   };
    //   if (email !== undefined) {
    //     //Si el email existe añado un [] al objeto para estipular que los campos
    //     where_clause[Op.or] = [{ email }]; //Email, name_remiserie y phone deben ser evaluados si ya estan en uso
    //   } //antes de realizar un cambio
    //   if (name_remiserie !== undefined) {
    //     if (!where_clause[Op.or]) {
    //       where_clause[Op.or] = [];
    //     }
    //     where_clause[Op.or].push({ name_remiserie });
    //   }
    //   if (phone !== undefined) {
    //     if (!where_clause[Op.or]) {
    //       where_clause[Op.or] = [];
    //     }
    //     where_clause[Op.or].push({ phone });
    //   }
    //   // En caso de que el usuario quizo modificar algunos de los campos de arriba
    //   // que deben ser unicos, debo realizar una consulta a la DB con esos datos
    //   if (where_clause[Op.or].length > 0) {
    //     const data_used = await Remiserie.findOne({ where: where_clause });
    //     //Si ya estan en uso devuelvo un error
    //     if (data_used) {
    //       let message_error = "";
    //       if (data_used.email === email) {
    //         message_error = "El Email ya está en uso";
    //       } else if (data_used.name_remiserie === name_remiserie) {
    //         message_error = "El nombre de la remisería ya está en uso";
    //       } else if (data_used.phone === phone) {
    //         message_error = "El número de teléfono ya está en uso";
    //       }
    //       throw new ClientError(message_error, 401);
    //     }
    //   }
    const where_conditions = [{ id: { [sequelize_1.Op.not]: id } }];
    if (email !== undefined) {
        where_conditions.push({ email });
    }
    if (name_remiserie !== undefined) {
        where_conditions.push({ name_remiserie });
    }
    if (phone !== undefined) {
        where_conditions.push({ phone });
    }
    const where_clause = {
        [sequelize_1.Op.or]: where_conditions,
    };
    const data_used = yield Remiserie_model_1.default.findOne({ where: where_clause });
    if (data_used) {
        let message_error = "";
        if (data_used.email === email) {
            message_error = "El Email ya está en uso";
        }
        else if (data_used.name_remiserie === name_remiserie) {
            message_error = "El número de licencia ya está en uso";
        }
        else if (data_used.phone === phone) {
            message_error = "El número de teléfono ya está en uso";
        }
        throw new error_1.default(message_error, 401);
    }
    //Creo un objeto personalizado solo con los datos que el usuario desea modificar
    const update_data = {};
    if (name)
        update_data.name = name;
    if (email)
        update_data.email = email;
    if (password) {
        const password_hashed = yield bcrypt_1.default.hash(password, 10);
        update_data.password = password_hashed;
    }
    if (name_remiserie)
        update_data.name_remiserie = name_remiserie;
    if (phone)
        update_data.phone = phone;
    if (profile_img)
        update_data.profile_img = profile_img;
    //asigno los cambios
    const data_updated = yield remiserie_finded.update(update_data);
    (0, response_1.default)(res, 200, `Se actualizó con éxito la remisería ${data_updated.name_remiserie}`);
});
//# sourceMappingURL=updateRemiserie.js.map