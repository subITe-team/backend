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
const User_model_1 = __importDefault(require("../../../../models/User.model"));
const response_1 = __importDefault(require("../../../../utils/response"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = __importDefault(require("../../../../utils/errors/error"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, email, password, profile_img } = req.body;
    const userFinded = yield User_model_1.default.findByPk(id);
    if (!userFinded) {
        throw new error_1.default("El usuario no existe", 404);
    }
    //   const whereClause: any = {
    //     id: { [Op.not]: id },
    //   };
    //   if (email !== undefined) {
    //     whereClause[Op.or] = [{ email }];
    //   }
    //   if (username !== undefined) {
    //     if (!whereClause[Op.or]) {
    //       whereClause[Op.or] = [];
    //     }
    //     whereClause[Op.or].push({ username });
    //   }
    //   if (whereClause[Op.or].length > 0) {
    //     const dataUsed = await User.findOne({ where: whereClause });
    //     //Si ya estan en uso devuelvo un error
    //     if (dataUsed) {
    //       let messageError = "";
    //       if (dataUsed.email === email) {
    //         messageError = "El Email ya está en uso";
    //       } else if (dataUsed.username === username) {
    //         messageError = "El nombre de usuario ya está en uso";
    //       }
    //       throw new ClientError(messageError, 401);
    //     }
    //   }
    const where_conditions = [{ id: { [sequelize_1.Op.not]: id } }];
    if (email !== undefined) {
        where_conditions.push({ email });
    }
    if (username !== undefined) {
        where_conditions.push({ username });
    }
    const where_clause = {
        [sequelize_1.Op.or]: where_conditions,
    };
    const data_used = yield User_model_1.default.findOne({ where: where_clause });
    if (data_used) {
        let message_error = "";
        if (data_used.email === email) {
            message_error = "El Email ya está en uso";
        }
        else if (data_used.username === username) {
            message_error = "El nombre de usuario ya está en uso";
        }
        throw new error_1.default(message_error, 401);
    }
    //Creo un objeto personalizado solo con los datos que el usuario desea modificar
    const updateData = {};
    if (username)
        updateData.username = username;
    if (email)
        updateData.email = email;
    if (password) {
        const passwordHashed = yield bcrypt_1.default.hash(password, 10);
        updateData.password = passwordHashed;
    }
    if (profile_img)
        updateData.profile_img = profile_img;
    //asigno los cambios
    const dataUpdated = yield userFinded.update(updateData);
    (0, response_1.default)(res, 200, `Se actualizó con éxito la remisería ${dataUpdated.username}`);
});
//# sourceMappingURL=updateUser.js.map