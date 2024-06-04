import User from "../../models/User.model";
import Remiserie from "../../models/Remiserie.model";
import Car from "../../models/Car.model";
import Driver from "../../models/Driver.model";
import Passenger from "../../models/Passenger.model";
import Chronogram from "../../models/Chronogram.model";
import ScheduledTravel from "../../models/ScheduledTravel.model";
import fs from "fs";
import ClientError from "../errors/error";
import { Data } from "./type";

export default async (): Promise<void> => {
  const data = fs.readFileSync("./src/utils/hardcoded.json", "utf-8");
  const cleaned = JSON.parse(data) as Data;
  const users_admins_id = [];
  const remiseries_id: string[] = [];
  const cars_id: string[] = [];
  const drivers_id: string[] = [];
  const passengers_id: string[] = [];
  const chronogram_id = [];
  const travel_id: string[] = [];
  let contador_cars = 1;
  let contador_drivers = 1;

  //Create users admins
  for (const each_user of cleaned.usersAdmin) {
    const new_user = await User.create(each_user);
    if (!new_user)
      throw new ClientError(
        `No se pudo crear el usuario admin ${each_user.username as string}`,
        400
      );
    users_admins_id.push(new_user.id);
    console.log(`se creo ${new_user.username} exitosamente`);
  }

  //create Remiseries
  for (const each_remiserie of cleaned.remiseries) {
    const new_remiserie = await Remiserie.create(each_remiserie);
    if (!new_remiserie)
      throw new ClientError(
        `No se pudo crear la remiseria ${
          each_remiserie.name_remiserie as string
        }`,
        400
      );
    remiseries_id.push(new_remiserie.id);
    console.log(
      `Se creo la remisería ${new_remiserie.name_remiserie} exitosamente`
    );
  }

  //create a Car
  for (const each_car of cleaned.cars) {
    if (contador_cars < 6) {
      each_car.remiserie_id = remiseries_id[0];
      const new_car = await Car.create(each_car);
      if (!new_car)
        throw new ClientError(`No se pudo crear el auto ${contador_cars}`, 400);
      cars_id.push(new_car.id);
      // await new_car.$add( 'cars', cars_id[contador_cars-1])
      contador_cars++;
      console.log(`Se creo el conductor ${new_car.patent} exitosamente`);
    } else if (contador_cars > 5 && contador_cars < 9) {
      each_car.remiserie_id = remiseries_id[1];
      const new_car = await Car.create(each_car);
      if (!new_car)
        throw new ClientError(`No se pudo crear el auto ${contador_cars}`, 400);
      cars_id.push(new_car.id);
      // await new_car.$add( 'cars', cars_id[contador_cars-1])
      contador_cars++;
      console.log(`Se creo el conductor ${new_car.patent} exitosamente`);
    } else {
      each_car.remiserie_id = remiseries_id[2];
      const new_car = await Car.create(each_car);
      if (!new_car)
        throw new ClientError(`No se pudo crear el auto ${contador_cars}`, 400);
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
      const new_driver = await Driver.create(each_driver);
      if (!new_driver)
        throw new ClientError(
          `No se pudo crear el conductor ${contador_drivers}`,
          400
        );
      drivers_id.push(new_driver.id);
      await new_driver.$add("cars", cars_id[contador_drivers - 1]);
      contador_drivers++;
      console.log(`Se creo el conductor ${new_driver.name} exitosamente`);
    } else if (contador_drivers > 5 && contador_drivers < 9) {
      each_driver.remiserie_id = remiseries_id[1];
      const new_driver = await Driver.create(each_driver);
      if (!new_driver)
        throw new ClientError(
          `No se pudo crear el conductor ${contador_drivers}`,
          400
        );
      drivers_id.push(new_driver.id);
      await new_driver.$add("cars", cars_id[contador_drivers - 1]);
      contador_drivers++;
      console.log(`Se creo el conductor ${new_driver.name} exitosamente`);
    } else {
      each_driver.remiserie_id = remiseries_id[2];
      const new_driver = await Driver.create(each_driver);
      if (!new_driver)
        throw new ClientError(
          `No se pudo crear el conductor ${contador_drivers}`,
          400
        );
      drivers_id.push(new_driver.id);
      await new_driver.$add("cars", cars_id[contador_drivers - 1]);
      contador_drivers++;
      console.log(`Se creo el conductor ${new_driver.name} exitosamente`);
    }
  }

  //create passengers:
  for (const each_passenger of cleaned.passengers) {
    const new_passenger = await Passenger.create(each_passenger);
    if (!new_passenger) {
      console.log(
        `No se pudo crear el pasajero ${each_passenger.name as string}`
      );
      throw new ClientError(
        `No se pudo crear el pasajero ${each_passenger.name as string}`
      );
    } else {
      console.log(
        `Se creo con exito el pasajero ${each_passenger.name as string}`
      );
      passengers_id.push(new_passenger.id);
    }
  }

  // Create chronogram
  for (const each_chrono of cleaned.chronogram) {
    const new_chrono = await Chronogram.create(each_chrono);
    if (!new_chrono)
      throw new ClientError(
        `No se pudo crear el cronograma ${each_chrono.id as string}`,
        400
      );
    chronogram_id.push(new_chrono.id);
    console.log(`se creo ${new_chrono.shift} exitosamente`);
  }

  // Create Scheduled Travels
  for (const each_travel of cleaned.travel) {
    const new_travel = await ScheduledTravel.create({
      ...each_travel,
      remiserie_id: remiseries_id[0], // Assuming you're associating with the first remiserie
      passenger_id: passengers_id[1], // Assuming you're associating with the first passenger
      driver_id: drivers_id[0], // Assuming you're associating with the first driver
      car_id: cars_id[0], // Assuming you're associating with the first car
    });
    travel_id.push(new_travel.id);
    console.log(`Se creo con esito el viaje a ${new_travel.destiny}`);
  }
};
