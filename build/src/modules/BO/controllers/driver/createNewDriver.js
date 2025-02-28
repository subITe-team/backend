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
    const { first_name, last_name, email, address, birthdate, dni, phone, license_movil, license_pro, remiserie_id, latitude, longitude, password, profile_img, state, cars, } = req.body;
    console.log("Received driver creation request:", {
        first_name,
        last_name,
        email,
        address,
        birthdate,
        dni,
        phone,
        license_movil,
        license_pro,
        remiserie_id,
        latitude,
        longitude,
        state,
        cars,
    });
    // Validar campos requeridos
    const requiredFields = [
        "first_name",
        "last_name",
        "email",
        "dni",
        "phone",
        "license_pro",
        "password",
    ];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
        throw new error_1.default(`Campos requeridos faltantes: ${missingFields.join(", ")}`, 400);
    }
    // Validar formato de DNI (asumiendo que debe ser numérico y tener 8 dígitos)
    const dniRegex = /^\d{8}$/;
    if (!dniRegex.test(dni)) {
        throw new error_1.default("El DNI debe contener 8 dígitos numéricos", 400);
    }
    try {
        // Verificar datos duplicados
        const data_used = yield Driver_model_1.default.findOne({
            where: {
                [sequelize_1.Op.or]: [{ email }, { dni }, { phone }, { license_pro }],
            },
        });
        if (data_used) {
            let message_error = "";
            if (data_used.email === email) {
                message_error = "El Email ya está en uso";
            }
            else if (data_used.dni === dni) {
                message_error = "El DNI ya está registrado";
            }
            else if (data_used.phone === phone) {
                message_error = "El número de teléfono ya está en uso";
            }
            else if (data_used.license_pro === license_pro) {
                message_error = "El número de licencia de conductor ya está en uso";
            }
            throw new error_1.default(message_error, 409); // Cambiado a 409 Conflict
        }
        const password_hashed = yield bcrypt_1.default.hash(password, 10);
        const new_driver = yield Driver_model_1.default.create({
            first_name,
            last_name,
            email,
            password: password_hashed,
            address,
            license_movil,
            license_pro,
            phone,
            birthdate,
            dni,
            latitude,
            longitude,
            remiserie_id,
            profile_img,
            state: state || "active", // Valor por defecto
            cars,
        });
        (0, response_1.default)(res, 201, `Se creó con éxito al conductor ${new_driver.first_name.toUpperCase()} ${new_driver.last_name.toUpperCase()}`);
    }
    catch (error) {
        if (error instanceof error_1.default)
            throw error;
        throw new error_1.default("Ocurrió un error al crear el conductor. Por favor, inténtalo nuevamente.", 500);
    }
});
//# sourceMappingURL=createNewDriver.js.map