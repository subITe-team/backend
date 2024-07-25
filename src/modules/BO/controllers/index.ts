import catchedAsync from "../../../utils/catchedAsync";
//Imports car
import createNewCar from "./car/createNewCar";
import deleteCar from "./car/deleteCar";
import findCar from "./car/findCar";
import getAllCar from "./car/getAllCar";
import getAllCarByRemiserie from "./car/getAllCarByRemiserie";
import updateCar from "./car/updateCar";
//Import Chronograms
import createNewChronogram from "./chronogram/createNewChronogram";
import deleteChronogram from "./chronogram/deleteChronogram";
import findChronogram from "./chronogram/findChronogram";
import getAllChronogram from "./chronogram/getAllChronogram";
import getAllChronogramByRemiserie from "./chronogram/getAllChronogramByRemiserie";
import updateChronogram from "./chronogram/updateChronogram";
//Imports driver
import createNewDriver from "./driver/createNewDriver";
import deleteDriver from "./driver/deleteDriver";
import findDriver from "./driver/findDriver";
import getAllDriver from "./driver/getAllDriver";
import updateDriver from "./driver/updateDriver";
//Imports Passenger
import createNewPassenger from "./passenger/createNewPassenger";
import deletePassenger from "./passenger/deletePassenger";
import findPassenger from "./passenger/findPassenger";
import getAllPassenger from "./passenger/getAllPassenger";
import updatePassenger from "./passenger/updatePassenger";
//Imports remiserie
import createNewRemiserie from "./remiserie/createNewRemiserie";
import deleteRemiserie from "./remiserie/deleteRemiserie";
import findRemiserie from "./remiserie/findRemiserie";
import getAllRemiserie from "./remiserie/getAllRemiserie";
import updateRemiserie from "./remiserie/updateRemiserie";
import loginGoogleRemiserie from "./remiserie/loginGoogleRemiserie";
import logoutGoogleRemiserie from "./remiserie/logoutGoogleRemiserie";
//Import reviews
import createNewReview from "./review/createNewReview";
import findReview from "./review/findReview";
import getAllReview from "./review/getAllReview";
import updateReview from "./review/updateReview";
import deleteReview from "./review/deleteReview";
//Imports usersAdmins
import createNewUser from "./users/createNewUser";
import deleteUser from "./users/deleteUser";
import findUser from "./users/findUser";
import getAllUsers from "./users/getAllUsers";
import updateUser from "./users/updateUser";
//Imports Travels
import createNewTravel from "./scheduledTravel/createNewTravel";
import getAllTravel from "./scheduledTravel/getAllTravel";
import findTravel from "./scheduledTravel/findTravel";
import updateTravel from "./scheduledTravel/updateTravel";
import deleteTravel from "./scheduledTravel/deleteTravel";

export default {
  user: {
    create: catchedAsync(createNewUser),
    getAll: catchedAsync(getAllUsers),
    findOne: catchedAsync(findUser),
    update: catchedAsync(updateUser),
    delete: catchedAsync(deleteUser),
  },
  remiserie: {
    create: catchedAsync(createNewRemiserie),
    getAll: catchedAsync(getAllRemiserie),
    findOne: catchedAsync(findRemiserie),
    update: catchedAsync(updateRemiserie),
    delete: catchedAsync(deleteRemiserie),
    loginGoogle: catchedAsync(loginGoogleRemiserie),
    logoutGoogle: catchedAsync(logoutGoogleRemiserie),
  },
  driver: {
    create: catchedAsync(createNewDriver),
    getAll: catchedAsync(getAllDriver),
    findOne: catchedAsync(findDriver),
    update: catchedAsync(updateDriver),
    delete: catchedAsync(deleteDriver),
  },
  car: {
    create: catchedAsync(createNewCar),
    getAll: catchedAsync(getAllCar),
    findOne: catchedAsync(findCar),
    update: catchedAsync(updateCar),
    delete: catchedAsync(deleteCar),
    getAllByRemiserie: catchedAsync(getAllCarByRemiserie),
  },
  chronogram: {
    create: catchedAsync(createNewChronogram),
    getAll: catchedAsync(getAllChronogram),
    findOne: catchedAsync(findChronogram),
    update: catchedAsync(updateChronogram),
    delete: catchedAsync(deleteChronogram),
    getAllByRemiserie: catchedAsync(getAllChronogramByRemiserie),
  },
  passenger: {
    create: catchedAsync(createNewPassenger),
    getAll: catchedAsync(getAllPassenger),
    findOne: catchedAsync(findPassenger),
    update: catchedAsync(updatePassenger),
    delete: catchedAsync(deletePassenger),
  },
  review: {
    create: catchedAsync(createNewReview),
    getAll: catchedAsync(getAllReview),
    findOne: catchedAsync(findReview),
    update: catchedAsync(updateReview),
    delete: catchedAsync(deleteReview),
  },
  travel: {
    create: catchedAsync(createNewTravel),
    getAll: catchedAsync(getAllTravel),
    findOne: catchedAsync(findTravel),
    update: catchedAsync(updateTravel),
    delete: catchedAsync(deleteTravel),
  },
};
