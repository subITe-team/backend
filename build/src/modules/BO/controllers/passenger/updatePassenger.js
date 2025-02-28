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
const Passenger_model_1 = __importDefault(require("../../../../models/Passenger.model"));
const response_1 = __importDefault(require("../../../../utils/response"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = __importDefault(require("../../../../utils/errors/error"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Obtener el ID del conductor a actualizar
    const { first_name, last_name, address, email, birthdate, password, phone, latitude, longitude, dni, remiserie_id, profile_img, } = req.body;
    // Verificar si existe un conductor con el ID proporcionado
    const passenger_finded = yield Passenger_model_1.default.findByPk(id);
    if (!passenger_finded) {
        throw new error_1.default("El pasajero no existe", 404);
    }
    const where_conditions = [{ id: { [sequelize_1.Op.not]: id } }];
    if (email !== undefined) {
        where_conditions.push({ email });
    }
    if (dni !== undefined) {
        where_conditions.push({ dni });
    }
    if (phone !== undefined) {
        where_conditions.push({ phone });
    }
    const where_clause = {
        [sequelize_1.Op.or]: where_conditions,
    };
    const data_used = yield Passenger_model_1.default.findOne({ where: where_clause });
    if (data_used !== null) {
        let message_error = "";
        const values = data_used.get();
        if (values.email === email) {
            message_error = "El Email ya está en uso";
            throw new error_1.default(message_error, 401);
        }
        else if (values.phone === phone) {
            message_error = "El número de teléfono ya está en uso";
            throw new error_1.default(message_error, 401);
        }
        else if (values.dni === dni) {
            message_error = "El número de DNI ya está en uso";
            throw new error_1.default(message_error, 401);
        }
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
    if (dni)
        update_data.dni = dni;
    if (profile_img)
        update_data.profile_img = profile_img;
    //asigno los cambios
    const data_updated = yield passenger_finded.update(update_data);
    (0, response_1.default)(res, 200, `Se actualizó con éxito al pasajero ${data_updated.first_name} ${data_updated.last_name}`);
});
//# sourceMappingURL=updatePassenger.js.map