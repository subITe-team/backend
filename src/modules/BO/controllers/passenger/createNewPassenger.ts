import { Request, Response } from "express";
import { Op } from "sequelize";
import Passenger from "../../../../models/Passenger.model";
import response from "../../../../utils/response";
import bcrypt from "bcrypt";
import ClientError from "../../../../utils/errors/error";
import { RequestBody } from "./type";

export default async (req: Request, res: Response): Promise<void> => {
  const {
    name,
    last_name,
    address,
    email,
    birthdate,
    password,
    phone,
    latitude,
    longitude,
    dni,
    remiserie_id,
    profile_img,
  } = req.body as RequestBody;

  const data_used = await Passenger.findOne({
    where: {
      [Op.or]: [{ email }, { dni }, { phone }],
    },
  });

  if (data_used) {
    let message_error = "";

    if (data_used.email === email) {
      message_error = "El Email ya esta en uso";
    } else if (data_used.dni === dni) {
      message_error = "El DNI ya esta en uso";
    } else if (data_used.phone === phone) {
      message_error = "El número de teléfono ya esta en uso";
    }

    throw new ClientError(message_error, 401);
  }

  const password_hashed = await bcrypt.hash(password, 10);

  const new_passenger = await Passenger.create({
    name,
    last_name,
    email,
    password: password_hashed,
    address,
    phone,
    dni,
    birthdate,
    latitude,
    longitude,
    remiserie_id,
    profile_img,
  });

  if (new_passenger)
    response(
      res,
      201,
      `Se creo con exito al pasajero ${new_passenger.name.toUpperCase()} ${new_passenger.last_name.toUpperCase()}`
    );
  else
    throw new ClientError(
      "Ocurrio un error, por favor intentalo nuevamente.",
      500
    );
};
