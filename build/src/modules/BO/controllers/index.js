"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchedAsync_1 = __importDefault(require("../../../utils/catchedAsync"));
//Imports car
const createNewCar_1 = __importDefault(require("./car/createNewCar"));
const deleteCar_1 = __importDefault(require("./car/deleteCar"));
const findCar_1 = __importDefault(require("./car/findCar"));
const getAllCar_1 = __importDefault(require("./car/getAllCar"));
const getAllCarByRemiserie_1 = __importDefault(require("./car/getAllCarByRemiserie"));
const updateCar_1 = __importDefault(require("./car/updateCar"));
//Import Chronograms
const createNewChronogram_1 = __importDefault(require("./chronogram/createNewChronogram"));
const deleteChronogram_1 = __importDefault(require("./chronogram/deleteChronogram"));
const findChronogram_1 = __importDefault(require("./chronogram/findChronogram"));
const getAllChronogram_1 = __importDefault(require("./chronogram/getAllChronogram"));
const getAllChronogramByRemiserie_1 = __importDefault(require("./chronogram/getAllChronogramByRemiserie"));
const updateChronogram_1 = __importDefault(require("./chronogram/updateChronogram"));
//Imports driver
const createNewDriver_1 = __importDefault(require("./driver/createNewDriver"));
const deleteDriver_1 = __importDefault(require("./driver/deleteDriver"));
const findDriver_1 = __importDefault(require("./driver/findDriver"));
const getAllDriver_1 = __importDefault(require("./driver/getAllDriver"));
const updateDriver_1 = __importDefault(require("./driver/updateDriver"));
//Imports Passenger
const createNewPassenger_1 = __importDefault(require("./passenger/createNewPassenger"));
const deletePassenger_1 = __importDefault(require("./passenger/deletePassenger"));
const findPassenger_1 = __importDefault(require("./passenger/findPassenger"));
const getAllPassenger_1 = __importDefault(require("./passenger/getAllPassenger"));
const updatePassenger_1 = __importDefault(require("./passenger/updatePassenger"));
//Imports remiserie
const createNewRemiserie_1 = __importDefault(require("./remiserie/createNewRemiserie"));
const deleteRemiserie_1 = __importDefault(require("./remiserie/deleteRemiserie"));
const findRemiserie_1 = __importDefault(require("./remiserie/findRemiserie"));
const getAllRemiserie_1 = __importDefault(require("./remiserie/getAllRemiserie"));
const updateRemiserie_1 = __importDefault(require("./remiserie/updateRemiserie"));
const loginGoogleRemiserie_1 = __importDefault(require("./remiserie/loginGoogleRemiserie"));
const logoutGoogleRemiserie_1 = __importDefault(require("./remiserie/logoutGoogleRemiserie"));
//Import reviews
const createNewReview_1 = __importDefault(require("./review/createNewReview"));
const findReview_1 = __importDefault(require("./review/findReview"));
const getAllReview_1 = __importDefault(require("./review/getAllReview"));
const updateReview_1 = __importDefault(require("./review/updateReview"));
const deleteReview_1 = __importDefault(require("./review/deleteReview"));
//Imports usersAdmins
const createNewUser_1 = __importDefault(require("./users/createNewUser"));
const deleteUser_1 = __importDefault(require("./users/deleteUser"));
const findUser_1 = __importDefault(require("./users/findUser"));
const getAllUsers_1 = __importDefault(require("./users/getAllUsers"));
const updateUser_1 = __importDefault(require("./users/updateUser"));
//Imports Travels
const createNewTravel_1 = __importDefault(require("./scheduledTravel/createNewTravel"));
const getAllTravel_1 = __importDefault(require("./scheduledTravel/getAllTravel"));
const findTravel_1 = __importDefault(require("./scheduledTravel/findTravel"));
const updateTravel_1 = __importDefault(require("./scheduledTravel/updateTravel"));
const deleteTravel_1 = __importDefault(require("./scheduledTravel/deleteTravel"));
exports.default = {
    user: {
        create: (0, catchedAsync_1.default)(createNewUser_1.default),
        getAll: (0, catchedAsync_1.default)(getAllUsers_1.default),
        findOne: (0, catchedAsync_1.default)(findUser_1.default),
        update: (0, catchedAsync_1.default)(updateUser_1.default),
        delete: (0, catchedAsync_1.default)(deleteUser_1.default),
    },
    remiserie: {
        create: (0, catchedAsync_1.default)(createNewRemiserie_1.default),
        getAll: (0, catchedAsync_1.default)(getAllRemiserie_1.default),
        findOne: (0, catchedAsync_1.default)(findRemiserie_1.default),
        update: (0, catchedAsync_1.default)(updateRemiserie_1.default),
        delete: (0, catchedAsync_1.default)(deleteRemiserie_1.default),
        loginGoogle: (0, catchedAsync_1.default)(loginGoogleRemiserie_1.default),
        logoutGoogle: (0, catchedAsync_1.default)(logoutGoogleRemiserie_1.default),
    },
    driver: {
        create: (0, catchedAsync_1.default)(createNewDriver_1.default),
        getAll: (0, catchedAsync_1.default)(getAllDriver_1.default),
        findOne: (0, catchedAsync_1.default)(findDriver_1.default),
        update: (0, catchedAsync_1.default)(updateDriver_1.default),
        delete: (0, catchedAsync_1.default)(deleteDriver_1.default),
    },
    car: {
        create: (0, catchedAsync_1.default)(createNewCar_1.default),
        getAll: (0, catchedAsync_1.default)(getAllCar_1.default),
        findOne: (0, catchedAsync_1.default)(findCar_1.default),
        update: (0, catchedAsync_1.default)(updateCar_1.default),
        delete: (0, catchedAsync_1.default)(deleteCar_1.default),
        getAllByRemiserie: (0, catchedAsync_1.default)(getAllCarByRemiserie_1.default),
    },
    chronogram: {
        create: (0, catchedAsync_1.default)(createNewChronogram_1.default),
        getAll: (0, catchedAsync_1.default)(getAllChronogram_1.default),
        findOne: (0, catchedAsync_1.default)(findChronogram_1.default),
        update: (0, catchedAsync_1.default)(updateChronogram_1.default),
        delete: (0, catchedAsync_1.default)(deleteChronogram_1.default),
        getAllByRemiserie: (0, catchedAsync_1.default)(getAllChronogramByRemiserie_1.default),
    },
    passenger: {
        create: (0, catchedAsync_1.default)(createNewPassenger_1.default),
        getAll: (0, catchedAsync_1.default)(getAllPassenger_1.default),
        findOne: (0, catchedAsync_1.default)(findPassenger_1.default),
        update: (0, catchedAsync_1.default)(updatePassenger_1.default),
        delete: (0, catchedAsync_1.default)(deletePassenger_1.default),
    },
    review: {
        create: (0, catchedAsync_1.default)(createNewReview_1.default),
        getAll: (0, catchedAsync_1.default)(getAllReview_1.default),
        findOne: (0, catchedAsync_1.default)(findReview_1.default),
        update: (0, catchedAsync_1.default)(updateReview_1.default),
        delete: (0, catchedAsync_1.default)(deleteReview_1.default),
    },
    travel: {
        create: (0, catchedAsync_1.default)(createNewTravel_1.default),
        getAll: (0, catchedAsync_1.default)(getAllTravel_1.default),
        findOne: (0, catchedAsync_1.default)(findTravel_1.default),
        update: (0, catchedAsync_1.default)(updateTravel_1.default),
        delete: (0, catchedAsync_1.default)(deleteTravel_1.default),
    },
};
//# sourceMappingURL=index.js.map