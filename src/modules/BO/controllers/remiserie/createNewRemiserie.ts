import { Request, Response } from "express";
import { Op } from "sequelize";
import Remiserie from "../../../../models/Remiserie.model";
import response from "../../../../utils/response";
import bcrypt from "bcrypt";
import ClientError from "../../../../utils/errors/error";
import { RequestBody } from "./type";

export default async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, name_remiserie, phone, profile_img } =
    req.body as RequestBody;

  const data_used = await Remiserie.findOne({
    where: {
      [Op.or]: [{ email }, { name_remiserie }, { phone }],
    },
  });

  if (data_used) {
    let message_error = "";

    if (data_used.email === email) {
      message_error = "El Email ya esta en uso";
    } else if (data_used.name_remiserie === name_remiserie) {
      message_error = "El nombre de la remisería ya esta en uso";
    } else if (data_used.phone === phone) {
      message_error = "El número de teléfono ya esta en uso";
    }

    throw new ClientError(message_error, 401);
  }

  const password_hashed = await bcrypt.hash(password, 10);

  const new_remiserie = await Remiserie.create({
    name,
    email,
    password: password_hashed,
    name_remiserie,
    phone,
    profile_img,
  });

  if (new_remiserie)
    response(
      res,
      201,
      `Se creo con exito la remisería ${new_remiserie.name_remiserie}`
    );
  else
    throw new ClientError(
      "Ocurrio un error, por favor intentalo nuevamente.",
      500
    );
};
