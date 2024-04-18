import { Request, Response } from "express";
import { Op } from "sequelize";
import Driver from "../../../../models/Driver.model";
import response from "../../../../utils/response";
import bcrypt from "bcrypt";
import ClientError from "../../../../utils/errors/error";
import { RequestBody } from "./type";

export default async (req: Request, res: Response): Promise<void> => {
  const {
    name,
    last_name,
    email,
    address,
    birthdate,
    dni,
    phone,
    license_movil,
    license_pro,
    remiserie_id,
    latitude,
    longitude,
    password,
    profile_img,
    state,
    cars,
  } = req.body as RequestBody;

  const data_used = await Driver.findOne({
    where: {
      [Op.or]: [{ email }, { dni }, { phone }, { license_pro }],
    },
  });

  if (data_used) {
    let message_error = "";

    if (data_used.email === email) {
      message_error = "El Email ya esta en uso";
    } else if (data_used.dni === dni) {
      message_error = "El nombre de la remisería ya esta en uso";
    } else if (data_used.phone === phone) {
      message_error = "El número de teléfono ya esta en uso";
    } else if (data_used.license_pro === license_pro) {
      message_error = "El número de licencia de conductor ya esta en uso";
    }

    throw new ClientError(message_error, 401);
  }

  const password_hashed = await bcrypt.hash(password, 10);

  const new_driver = await Driver.create({
    name,
    last_name,
    email,
    password: password_hashed,
    address,
    license_movil,
    license_pro,
    phone,
    birthdate,
    latitude,
    longitude,
    remiserie_id,
    profile_img,
    state,
    cars,
  });

  if (new_driver)
    response(
      res,
      201,
      `Se creo con exito al conductor ${
        new_driver.name.toUpperCase() + ` ` + new_driver.last_name.toUpperCase()
      } `
    );
  else
    throw new ClientError(
      "Ocurrio un error, por favor intentalo nuevamente.",
      500
    );
};
