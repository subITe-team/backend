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
const User_model_1 = __importDefault(require("../../models/User.model"));
const Remiserie_model_1 = __importDefault(require("../../models/Remiserie.model"));
const Car_model_1 = __importDefault(require("../../models/Car.model"));
const Driver_model_1 = __importDefault(require("../../models/Driver.model"));
const Passenger_model_1 = __importDefault(require("../../models/Passenger.model"));
const Chronogram_model_1 = __importDefault(require("../../models/Chronogram.model"));
const ScheduledTravel_model_1 = __importDefault(require("../../models/ScheduledTravel.model"));
const fs_1 = __importDefault(require("fs"));
const error_1 = __importDefault(require("../errors/error"));
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const data = fs_1.default.readFileSync("./src/utils/hardcoded.json", "utf-8");
    const cleaned = JSON.parse(data);
    const users_admins_id = [];
    const remiseries_id = [];
    const cars_id = [];
    const drivers_id = [];
    const passengers_id = [];
    const chronogram_id = [];
    const travel_id = [];
    let contador_cars = 1;
    let contador_drivers = 1;
    //Create users admins
    for (const each_user of cleaned.usersAdmin) {
        const new_user = yield User_model_1.default.create(each_user);
        if (!new_user)
            throw new error_1.default(`No se pudo crear el usuario admin ${each_user.username}`, 400);
        users_admins_id.push(new_user.id);
        console.log(`se creo ${new_user.username} exitosamente`);
    }
    //create Remiseries
    for (const each_remiserie of cleaned.remiseries) {
        const new_remiserie = yield Remiserie_model_1.default.create(each_remiserie);
        if (!new_remiserie)
            throw new error_1.default(`No se pudo crear la remiseria ${each_remiserie.name_remiserie}`, 400);
        remiseries_id.push(new_remiserie.id);
        console.log(`Se creo la remisería ${new_remiserie.name_remiserie} exitosamente`);
    }
    //create a Car
    for (const each_car of cleaned.cars) {
        if (contador_cars < 6) {
            each_car.remiserie_id = remiseries_id[0];
            const new_car = yield Car_model_1.default.create(each_car);
            if (!new_car)
                throw new error_1.default(`No se pudo crear el auto ${contador_cars}`, 400);
            cars_id.push(new_car.id);
            // await new_car.$add( 'cars', cars_id[contador_cars-1])
            contador_cars++;
            console.log(`Se creo el conductor ${new_car.patent} exitosamente`);
        }
        else if (contador_cars > 5 && contador_cars < 9) {
            each_car.remiserie_id = remiseries_id[1];
            const new_car = yield Car_model_1.default.create(each_car);
            if (!new_car)
                throw new error_1.default(`No se pudo crear el auto ${contador_cars}`, 400);
            cars_id.push(new_car.id);
            // await new_car.$add( 'cars', cars_id[contador_cars-1])
            contador_cars++;
            console.log(`Se creo el conductor ${new_car.patent} exitosamente`);
        }
        else {
            each_car.remiserie_id = remiseries_id[2];
            const new_car = yield Car_model_1.default.create(each_car);
            if (!new_car)
                throw new error_1.default(`No se pudo crear el auto ${contador_cars}`, 400);
            cars_id.push(new_car.id);
            // await new_car.$add( 'cars', cars_id[contador_cars-1])
            contador_cars++;
            console.log(`Se creo el conductor ${new_car.patent} exitosamente`);
        }
        // const new_car = await Car.create(each_car)
        // if(!new_car) throw new ClientError(`No se pudo crear el conductor ${each_car.patent}`)
        // cars_id.push(new_car.id)
        // console.log(`Se creo el auto ${new_car.patent} exitosamente`)
    }
    //create Drivers
    for (const each_driver of cleaned.drivers) {
        if (contador_drivers < 6) {
            each_driver.remiserie_id = remiseries_id[0];
            const new_driver = yield Driver_model_1.default.create(each_driver);
            if (!new_driver)
                throw new error_1.default(`No se pudo crear el conductor ${contador_drivers}`, 400);
            drivers_id.push(new_driver.id);
            yield new_driver.$add("cars", cars_id[contador_drivers - 1]);
            contador_drivers++;
            console.log(`Se creo el conductor ${new_driver.first_name} ${new_driver.last_name} exitosamente`);
        }
        else if (contador_drivers > 5 && contador_drivers < 9) {
            each_driver.remiserie_id = remiseries_id[1];
            const new_driver = yield Driver_model_1.default.create(each_driver);
            if (!new_driver)
                throw new error_1.default(`No se pudo crear el conductor ${contador_drivers}`, 400);
            drivers_id.push(new_driver.id);
            yield new_driver.$add("cars", cars_id[contador_drivers - 1]);
            contador_drivers++;
            console.log(`Se creo el conductor ${new_driver.first_name} ${new_driver.last_name} exitosamente`);
        }
        else {
            each_driver.remiserie_id = remiseries_id[2];
            const new_driver = yield Driver_model_1.default.create(each_driver);
            if (!new_driver)
                throw new error_1.default(`No se pudo crear el conductor ${contador_drivers}`, 400);
            drivers_id.push(new_driver.id);
            yield new_driver.$add("cars", cars_id[contador_drivers - 1]);
            contador_drivers++;
            console.log(`Se creo el conductor ${new_driver.first_name} ${new_driver.last_name} exitosamente`);
        }
    }
    //create passengers:
    for (const each_passenger of cleaned.passengers) {
        const new_passenger = yield Passenger_model_1.default.create(each_passenger);
        if (!new_passenger) {
            console.log(`No se pudo crear el pasajero ${(_a = each_passenger.first_name) !== null && _a !== void 0 ? _a : ""} ${(_b = each_passenger.last_name) !== null && _b !== void 0 ? _b : ""}`);
            throw new error_1.default(`No se pudo crear el pasajero ${(_c = each_passenger.first_name) !== null && _c !== void 0 ? _c : ""} ${(_d = each_passenger.last_name) !== null && _d !== void 0 ? _d : ""}`);
        }
        else {
            console.log(`Se creo con exito el pasajero ${(_e = each_passenger.first_name) !== null && _e !== void 0 ? _e : ""} ${(_f = each_passenger.last_name) !== null && _f !== void 0 ? _f : ""}`);
            passengers_id.push(new_passenger.id);
        }
    }
    // Create chronogram
    for (const each_chrono of cleaned.chronogram) {
        const new_chrono = yield Chronogram_model_1.default.create(Object.assign(Object.assign({}, each_chrono), { remiserie_id: remiseries_id[0] }));
        if (!new_chrono)
            throw new error_1.default(`No se pudo crear el cronograma ${each_chrono.id}`, 400);
        const driverInstances = yield Driver_model_1.default.findAll({
            where: { id: drivers_id },
        });
        yield new_chrono.$add("drivers", driverInstances);
        chronogram_id.push(new_chrono.id);
        console.log(`se creo ${new_chrono.shift} exitosamente`);
    }
    // Create Scheduled Travels
    for (const each_travel of cleaned.travel) {
        const new_travel = yield ScheduledTravel_model_1.default.create(Object.assign(Object.assign({}, each_travel), { remiserie_id: remiseries_id[0], passenger_id: passengers_id[1], driver_id: drivers_id[0], car_id: cars_id[0] }));
        travel_id.push(new_travel.id);
        console.log(`Se creo con esito el viaje a ${new_travel.destiny}`);
    }
});
//# sourceMappingURL=dataGenerate.js.map