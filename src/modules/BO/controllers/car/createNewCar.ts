import { Request, Response } from "express";
import { Op } from "sequelize";
import Car from "../../../../models/Car.model";
import Remiserie from "../../../../models/Remiserie.model";
import response from "../../../../utils/response";
import ClientError from "../../../../utils/errors/error";
import { RequestBody } from "./type";

export default async (req: Request, res: Response): Promise<void> => {
  const {
    remiserie_id,
    brand,
    model,
    patent,
    color,
    year,
    habilitation,
    insurance,
    date_onboarding,
  } = req.body as RequestBody;

  const remiserieExist = await Remiserie.findByPk(remiserie_id);
  if (!remiserieExist)
    throw new ClientError("No se encontró la remisería", 404);

  const data_used = await Car.findOne({
    where: {
      [Op.or]: [{ patent }, { insurance }],
    },
  });

  if (data_used) {
    let message_error = "";

    if (data_used.patent === patent) {
      message_error = "La patente ya esta en uso";
    } else if (data_used.insurance === insurance) {
      message_error = "El número de seguro ya esta en uso";
    }

    throw new ClientError(message_error, 401);
  }

  const new_car = await Car.create({
    remiserie_id,
    brand,
    model,
    patent,
    color,
    year,
    habilitation,
    insurance,
    date_onboarding,
  });

  if (new_car)
    response(
      res,
      201,
      `Se creó con éxito el auto ${new_car.model} - ${new_car.patent}`
    );
  else
    throw new ClientError(
      "Ocurrio un error, por favor intentalo nuevamente.",
      500
    );
};
