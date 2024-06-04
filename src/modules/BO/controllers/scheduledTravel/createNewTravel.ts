import { Request, Response } from "express";
import ScheduledTravel from "../../../../models/ScheduledTravel.model";
import response from "../../../../utils/response";
import ClientError from "../../../../utils/errors/error";
import { RequestBody } from "./type";

export default async (req: Request, res: Response): Promise<void> => {
  const { driver_id, passenger_id, remiserie_id, car_id, start_time, origin, destiny } =
    req.body as RequestBody;

  const new_travel = await ScheduledTravel.create({
    driver_id,
    passenger_id,
    remiserie_id,
    car_id,
    start_time,
    origin,
    destiny,
  });

  if (new_travel) response(res, 201, `Se creo el viaje exitosamente`);
  else
    throw new ClientError(
      "Ocurrio un error, por favor intentalo nuevamente.",
      500
    );
};
