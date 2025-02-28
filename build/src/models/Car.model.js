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
const ScheduledTravel_model_1 = __importDefault(require("./ScheduledTravel.model"));
const DriverCar_model_1 = __importDefault(require("./intermediate/DriverCar.model"));
const Remiserie_model_1 = __importDefault(require("./Remiserie.model"));
let Car = class Car extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    __metadata("design:type", String)
], Car.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Car.prototype, "brand", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Car.prototype, "model", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Car.prototype, "patent", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Car.prototype, "color", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Car.prototype, "year", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Car.prototype, "habilitation", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Car.prototype, "insurance", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Car.prototype, "date_onboarding", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Remiserie_model_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Car.prototype, "remiserie_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Driver_model_1.default, () => DriverCar_model_1.default),
    __metadata("design:type", Array)
], Car.prototype, "drivers", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ScheduledTravel_model_1.default),
    __metadata("design:type", Array)
], Car.prototype, "travels", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Remiserie_model_1.default),
    __metadata("design:type", Remiserie_model_1.default)
], Car.prototype, "remiserie", void 0);
Car = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "car",
        modelName: "Car",
    })
], Car);
exports.default = Car;
//# sourceMappingURL=Car.model.js.map