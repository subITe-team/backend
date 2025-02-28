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
const ScheduledTravel_model_1 = __importDefault(require("./ScheduledTravel.model"));
const Remiserie_model_1 = __importDefault(require("./Remiserie.model"));
let Review = class Review extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], Review.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Driver_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], Review.prototype, "driver_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Passenger_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], Review.prototype, "passenger_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Remiserie_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], Review.prototype, "remiserie_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ScheduledTravel_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        unique: true,
    }),
    __metadata("design:type", String)
], Review.prototype, "travel_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Review.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Review.prototype, "card_stars", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Passenger_model_1.default),
    __metadata("design:type", Array)
], Review.prototype, "passenger", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Driver_model_1.default),
    __metadata("design:type", Array)
], Review.prototype, "driver", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Remiserie_model_1.default),
    __metadata("design:type", Array)
], Review.prototype, "remiserie", void 0);
Review = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "review",
        modelName: "Review",
    })
], Review);
exports.default = Review;
//# sourceMappingURL=Review.model.js.map