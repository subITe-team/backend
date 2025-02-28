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
const Remiserie_model_1 = __importDefault(require("./Remiserie.model"));
const DriverChronogram_1 = __importDefault(require("./intermediate/DriverChronogram"));
let Chronogram = class Chronogram extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    __metadata("design:type", String)
], Chronogram.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Remiserie_model_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Chronogram.prototype, "remiserie_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Chronogram.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Chronogram.prototype, "shift", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Driver_model_1.default, () => DriverChronogram_1.default),
    __metadata("design:type", Array)
], Chronogram.prototype, "drivers", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Remiserie_model_1.default),
    __metadata("design:type", Remiserie_model_1.default)
], Chronogram.prototype, "remiserie", void 0);
Chronogram = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "chronograms",
        modelName: "Chronogram",
    })
], Chronogram);
exports.default = Chronogram;
//# sourceMappingURL=Chronogram.model.js.map