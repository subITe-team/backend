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
const Review_model_1 = __importDefault(require("./Review.model"));
const ScheduledTravel_model_1 = __importDefault(require("./ScheduledTravel.model"));
const Remiserie_model_1 = __importDefault(require("./Remiserie.model"));
const PassengerRemiserie_1 = __importDefault(require("./intermediate/PassengerRemiserie"));
let Passenger = class Passenger extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    __metadata("design:type", String)
], Passenger.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Passenger.prototype, "first_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Passenger.prototype, "last_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Passenger.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, unique: true }),
    __metadata("design:type", String)
], Passenger.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY, allowNull: false }),
    __metadata("design:type", Date)
], Passenger.prototype, "birthdate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Passenger.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, unique: true }),
    __metadata("design:type", String)
], Passenger.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT) // Para latitud y longitud, se suele usar FLOAT
    ,
    __metadata("design:type", Number)
], Passenger.prototype, "latitude", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], Passenger.prototype, "longitude", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, unique: true }),
    __metadata("design:type", String)
], Passenger.prototype, "dni", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Passenger.prototype, "profile_img", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: true }) //<<<<<<<<
    ,
    __metadata("design:type", Boolean)
], Passenger.prototype, "passenger_verified", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Remiserie_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], Passenger.prototype, "remiserie_id", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Review_model_1.default),
    __metadata("design:type", Array)
], Passenger.prototype, "reviews", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ScheduledTravel_model_1.default),
    __metadata("design:type", Array)
], Passenger.prototype, "travels", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Remiserie_model_1.default, () => PassengerRemiserie_1.default),
    __metadata("design:type", Array)
], Passenger.prototype, "remiserie", void 0);
Passenger = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "passenger",
        modelName: "Passenger",
    })
], Passenger);
exports.default = Passenger;
//# sourceMappingURL=Passenger.model.js.map