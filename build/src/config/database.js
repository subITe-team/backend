"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("./config"));
const User_model_1 = __importDefault(require("../models/User.model"));
const Car_model_1 = __importDefault(require("../models/Car.model"));
const Driver_model_1 = __importDefault(require("../models/Driver.model"));
const Passenger_model_1 = __importDefault(require("../models/Passenger.model"));
const Review_model_1 = __importDefault(require("../models/Review.model"));
const ScheduledTravel_model_1 = __importDefault(require("../models/ScheduledTravel.model"));
const Chronogram_model_1 = __importDefault(require("../models/Chronogram.model"));
const Remiserie_model_1 = __importDefault(require("../models/Remiserie.model"));
const DriverCar_model_1 = __importDefault(require("../models/intermediate/DriverCar.model"));
const DriverRemiserie_1 = __importDefault(require("../models/intermediate/DriverRemiserie"));
const PassengerRemiserie_1 = __importDefault(require("../models/intermediate/PassengerRemiserie"));
const DriverChronogram_1 = __importDefault(require("../models/intermediate/DriverChronogram"));
const sequelize = new sequelize_typescript_1.Sequelize({
    database: config_1.default.PGDATABASE,
    dialect: "postgres",
    username: config_1.default.PGUSER,
    password: config_1.default.PGPASSWORD,
    host: config_1.default.PGHOST,
    port: Number(config_1.default.PGPORT),
    models: [__dirname + "/models"],
    logging: false,
});
sequelize.addModels([
    User_model_1.default,
    Car_model_1.default,
    Driver_model_1.default,
    Passenger_model_1.default,
    Review_model_1.default,
    ScheduledTravel_model_1.default,
    Chronogram_model_1.default,
    Remiserie_model_1.default,
    DriverCar_model_1.default,
    DriverRemiserie_1.default,
    DriverChronogram_1.default,
    PassengerRemiserie_1.default,
]);
exports.default = sequelize;
//# sourceMappingURL=database.js.map