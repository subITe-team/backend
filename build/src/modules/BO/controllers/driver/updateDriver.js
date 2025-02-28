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
const Driver_model_1 = __importDefault(require("../../../../models/Driver.model"));
const response_1 = __importDefault(require("../../../../utils/response"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = __importDefault(require("../../../../utils/errors/error"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Obtener el ID del conductor a actualizar
    const { first_name, last_name, email, address, birthdate, dni, phone, license_movil, license_pro, remiserie_id, latitude, longitude, password, profile_img, } = req.body;
    // Verificar si existe un conductor con el ID proporcionado
    const driver_finded = yield Driver_model_1.default.findByPk(id);
    if (!driver_finded) {
        throw new error_1.default("El conductor no existe", 404);
    }
    // Verificar si los datos nuevos ya están en uso por otro conductor
    // Para eso primero creo un {} que se encargara de tener las clausulas que debo buscar en la DB
    //   const where_clause: WhereOptions = {
    //     id: { [Op.not]: id },
    //   };
    //   if (email !== undefined) {
    //     where_clause[Op.or] = [{ email }];
    //   }
    //   if (license_pro !== undefined) {
    //     const licenseProWhere = { license_pro };
    //     if (where_clause[Op.or]) {
    //       where_clause[Op.or].push(licenseProWhere);
    //     } else {
    //       where_clause[Op.or] = [licenseProWhere];
    //     }
    //   }
    //   if (phone !== undefined) {
    //     const phoneWhere = { phone };
    //     if (where_clause[Op.or]) {
    //       where_clause[Op.or].push(phoneWhere);
    //     } else {
    //       where_clause[Op.or] = [phoneWhere];
    //     }
    //   }
    //   if (dni !== undefined) {
    //     const dniWhere = { dni };
    //     if (where_clause[Op.or]) {
    //       where_clause[Op.or].push(dniWhere);
    //     } else {
    //       where_clause[Op.or] = [dniWhere];
    //     }
    //   }
    //   if (Object.keys(where_clause).length > 0) {
    //     const data_used = await Driver.findOne({ where: where_clause });
    //     if (data_used) {
    //       let message_error = "";
    //       if (data_used.email === email) {
    //         message_error = "El Email ya está en uso";
    //       } else if (data_used.license_pro === license_pro) {
    //         message_error = "El número de licencia ya está en uso";
    //       } else if (data_used.phone === phone) {
    //         message_error = "El número de teléfono ya está en uso";
    //       } else if (data_used.dni === dni) {
    //         message_error = "El número de DNI ya está en uso";
    //       }
    //       throw new ClientError(message_error, 401);
    //     }
    //   }
    const where_conditions = [{ id: { [sequelize_1.Op.not]: id } }];
    if (email !== undefined) {
        where_conditions.push({ email });
    }
    if (license_pro !== undefined) {
        where_conditions.push({ license_pro });
    }
    if (phone !== undefined) {
        where_conditions.push({ phone });
    }
    if (dni !== undefined) {
        where_conditions.push({ dni });
    }
    const where_clause = {
        [sequelize_1.Op.or]: where_conditions,
    };
    const data_used = yield Driver_model_1.default.findOne({ where: where_clause });
    if (data_used) {
        let message_error = "";
        if (data_used.email === email) {
            message_error = "El Email ya está en uso";
        }
        else if (data_used.license_pro === license_pro) {
            message_error = "El número de licencia ya está en uso";
        }
        else if (data_used.phone === phone) {
            message_error = "El número de teléfono ya está en uso";
        }
        else if (data_used.dni === dni) {
            message_error = "El número de DNI ya está en uso";
        }
        throw new error_1.default(message_error, 401);
    }
    //Creo un objeto personalizado solo con los datos que el usuario desea modificar
    const update_data = {};
    if (first_name)
        update_data.first_name = first_name;
    if (last_name)
        update_data.last_name = last_name;
    if (email)
        update_data.email = email;
    if (address)
        update_data.address = address;
    if (birthdate)
        update_data.birthdate = birthdate;
    if (license_movil)
        update_data.license_movil = license_movil;
    if (license_pro)
        update_data.license_pro = license_pro;
    if (remiserie_id)
        update_data.remiserie_id = remiserie_id;
    if (latitude)
        update_data.latitude = latitude;
    if (longitude)
        update_data.longitude = longitude;
    if (password) {
        const password_hashed = yield bcrypt_1.default.hash(password, 10);
        update_data.password = password_hashed;
    }
    if (phone)
        update_data.phone = phone;
    if (profile_img)
        update_data.profile_img = profile_img;
    //asigno los cambios
    const data_updated = yield driver_finded.update(update_data);
    (0, response_1.default)(res, 200, `Se actualizó con éxito al conductor ${data_updated.first_name} ${data_updated.last_name}`);
});
//# sourceMappingURL=updateDriver.js.map