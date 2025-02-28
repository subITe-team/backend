"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Driver_model_1 = __importDefault(require("./Driver.model"));
const Passenger_model_1 = __importDefault(require("./Passenger.model"));
const Car_model_1 = __importDefault(require("./Car.model"));
const PassengerRemiserie_1 = __importDefault(require("./intermediate/PassengerRemiserie"));
const DriverRemiserie_1 = __importDefault(require("./intermediate/DriverRemiserie"));
const Review_model_1 = __importDefault(require("./Review.model"));
const ScheduledTravel_model_1 = __importDefault(require("./ScheduledTravel.model"));
const Chronogram_model_1 = __importDefault(require("./Chronogram.model"));
let Remiserie = class Remiserie extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    __metadata("design:type", String)
], Remiserie.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Remiserie.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], Remiserie.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Remiserie.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], Remiserie.prototype, "name_remiserie", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], Remiserie.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(512),
        unique: true,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], Remiserie.prototype, "token", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Remiserie.prototype, "profile_img", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, defaultValue: sequelize_typescript_1.DataType.NOW }),
    __metadata("design:type", Date)
], Remiserie.prototype, "subscription_date", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Passenger_model_1.default, () => PassengerRemiserie_1.default),
    __metadata("design:type", Array)
], Remiserie.prototype, "passengers", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Driver_model_1.default, () => DriverRemiserie_1.default),
    __metadata("design:type", Array)
], Remiserie.prototype, "drivers", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Car_model_1.default),
    __metadata("design:type", Array)
], Remiserie.prototype, "cars", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Review_model_1.default),
    __metadata("design:type", Array)
], Remiserie.prototype, "reviews", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ScheduledTravel_model_1.default),
    __metadata("design:type", Array)
], Remiserie.prototype, "travels", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Chronogram_model_1.default),
    __metadata("design:type", Array)
], Remiserie.prototype, "chronograms", void 0);
Remiserie = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "remiseries",
        modelName: "Remiserie",
    })
], Remiserie);
exports.default = Remiserie;
//# sourceMappingURL=Remiserie.model.js.map