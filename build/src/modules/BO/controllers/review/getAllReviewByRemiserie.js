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
const Review_model_1 = __importDefault(require("../../../../models/Review.model"));
const response_1 = __importDefault(require("../../../../utils/response"));
const Remiserie_model_1 = __importDefault(require("../../../../models/Remiserie.model"));
const error_1 = __importDefault(require("../../../../utils/errors/error"));
const Driver_model_1 = __importDefault(require("../../../../models/Driver.model"));
const Passenger_model_1 = __importDefault(require("../../../../models/Passenger.model"));
const ScheduledTravel_model_1 = __importDefault(require("../../../../models/ScheduledTravel.model"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const remiserie_exist = yield Remiserie_model_1.default.findByPk(id);
    if (!remiserie_exist) {
        throw new error_1.default("No se encontró una remiseria con ese ID", 404);
    }
    const data = yield Review_model_1.default.findAll({
        where: { remiserie_id: id },
        include: [
            {
                model: Driver_model_1.default,
                attributes: {
                    exclude: ["password"], // Excluir el atributo 'password' del conductor
                },
            },
            {
                model: Passenger_model_1.default,
                attributes: {
                    exclude: ["password"], // Excluir el atributo 'password' del pasajero
                },
            },
            {
                model: ScheduledTravel_model_1.default,
                as: "travel",
            },
        ],
        attributes: {
            exclude: ["passenger_id", "driver_id", "travel_id", "remiserie_id"],
        },
    });
    (0, response_1.default)(res, 200, data);
});
//# sourceMappingURL=getAllReviewByRemiserie.js.map