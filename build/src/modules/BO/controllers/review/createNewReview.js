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
const Review_model_1 = __importDefault(require("../../../../models/Review.model"));
const response_1 = __importDefault(require("../../../../utils/response"));
const error_1 = __importDefault(require("../../../../utils/errors/error"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { driver_id, passenger_id, travel_id, description, card_stars } = req.body;
    const data_used = yield Review_model_1.default.findOne({
        where: {
            [sequelize_1.Op.or]: [{ travel_id }],
        },
    });
    if (data_used) {
        let message_error = "";
        if (data_used.travel_id === travel_id) {
            message_error = "El viaje ya fue calificado";
        }
        throw new error_1.default(message_error, 401);
    }
    const new_review = yield Review_model_1.default.create({
        driver_id,
        passenger_id,
        travel_id,
        description,
        card_stars,
    });
    if (new_review)
        (0, response_1.default)(res, 201, `Se calificó exitosamente, muchas gracias por tus comentarios!`);
    else
        throw new error_1.default("Ocurrio un error, por favor intentalo nuevamente.", 500);
});
//# sourceMappingURL=createNewReview.js.map