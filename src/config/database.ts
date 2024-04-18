import { Sequelize } from "sequelize-typescript";
import config from "./config";
import User from "../models/User.model";
import Car from "../models/Car.model";
import Driver from "../models/Driver.model";
import Passenger from "../models/Passenger.model";
import Review from "../models/Review.model";
import ScheduledTravel from "../models/ScheduledTravel.model";
import Chronogram from "../models/Chronogram.model";
import Remiserie from "../models/Remiserie.model";
import DriverCar from "../models/intermediate/DriverCar.model";
import DriverRemiserie from "../models/intermediate/DriverRemiserie";
import PassengerRemiserie from "../models/intermediate/PassengerRemiserie";
import DriverChronogram from "../models/intermediate/DriverChronogram";

const sequelize = new Sequelize({
  database: config.PGDATABASE,
  dialect: "postgres",
  username: config.PGUSER,
  password: config.PGPASSWORD,
  host: config.PGHOST,
  port: Number(config.PGPORT),
  models: [__dirname + "/models"],
  logging: false,
});

sequelize.addModels([
  User,
  Car,
  Driver,
  Passenger,
  Review,
  ScheduledTravel,
  Chronogram,
  Remiserie,
  DriverCar,
  DriverRemiserie,
  DriverChronogram,
  PassengerRemiserie,
]);

export default sequelize;
