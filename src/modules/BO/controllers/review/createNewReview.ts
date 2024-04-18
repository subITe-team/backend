import { Request, Response } from "express";
import { Op } from "sequelize";
import Review from "../../../../models/Review.model";
import response from "../../../../utils/response";
import ClientError from "../../../../utils/errors/error";
import { RequestBody } from "./type";

export default async (req: Request, res: Response): Promise<void> => {
  const { driver_id, passenger_id, travel_id, description, card_stars } =
    req.body as RequestBody;

  const data_used = await Review.findOne({
    where: {
      [Op.or]: [{ travel_id }],
    },
  });

  if (data_used) {
    let message_error = "";

    if (data_used.travel_id === travel_id) {
      message_error = "El viaje ya fue calificado";
    }

    throw new ClientError(message_error, 401);
  }

  const new_review = await Review.create({
    driver_id,
    passenger_id,
    travel_id,
    description,
    card_stars,
  });

  if (new_review)
    response(
      res,
      201,
      `Se calificó exitosamente, muchas gracias por tus comentarios!`
    );
  else
    throw new ClientError(
      "Ocurrio un error, por favor intentalo nuevamente.",
      500
    );
};
