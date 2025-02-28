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
const Car_model_1 = __importDefault(require("./Car.model"));
const ScheduledTravel_model_1 = __importDefault(require("./ScheduledTravel.model"));
const Chronogram_model_1 = __importDefault(require("./Chronogram.model"));
const Review_model_1 = __importDefault(require("./Review.model"));
const Remiserie_model_1 = __importDefault(require("./Remiserie.model"));
const DriverCar_model_1 = __importDefault(require("./intermediate/DriverCar.model"));
const DriverChronogram_1 = __importDefault(require("./intermediate/DriverChronogram"));
let Driver = class Driver extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    __metadata("design:type", String)
], Driver.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Driver.prototype, "first_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Driver.prototype, "last_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], Driver.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Driver.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Driver.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Driver.prototype, "profile_img", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY, allowNull: false }),
    __metadata("design:type", Date)
], Driver.prototype, "birthdate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true }),
    __metadata("design:type", String)
], Driver.prototype, "dni", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], Driver.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Driver.prototype, "license_movil", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], Driver.prototype, "license_pro", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Remiserie_model_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Driver.prototype, "remiserie_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT) // Para latitud y longitud, se suele usar FLOAT
    ,
    __metadata("design:type", Number)
], Driver.prototype, "latitude", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], Driver.prototype, "longitude", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: false }),
    __metadata("design:type", Boolean)
], Driver.prototype, "state", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Car_model_1.default, () => DriverCar_model_1.default),
    __metadata("design:type", Array)
], Driver.prototype, "cars", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ScheduledTravel_model_1.default),
    __metadata("design:type", Array)
], Driver.prototype, "scheduledTravels", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Chronogram_model_1.default, () => DriverChronogram_1.default),
    __metadata("design:type", Array)
], Driver.prototype, "chronograms", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Review_model_1.default),
    __metadata("design:type", Array)
], Driver.prototype, "reviews", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Remiserie_model_1.default),
    __metadata("design:type", Remiserie_model_1.default)
], Driver.prototype, "remiserie", void 0);
Driver = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "driver",
        modelName: "Driver",
    })
], Driver);
exports.default = Driver;
//# sourceMappingURL=Driver.model.js.map