import { Request, Response } from "express";
import ScheduledTravel from "../../../../models/ScheduledTravel.model";
import response from "../../../../utils/response";
import ClientError from "../../../../utils/errors/error";
import { RequestBody } from "./type";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Obtener el ID del conductor a actualizar

  const {
    driver_id,
    passenger_id,
    car_id,
    start_time,
    origin,
    destiny,
    review_id,
  } = req.body as RequestBody;

  // Verificar si existe un conductor con el ID proporcionado
  const travel_finded = await ScheduledTravel.findByPk(id);

  if (!travel_finded) {
    throw new ClientError("El viaje no existe", 404);
  }
  //Creo un objeto personalizado solo con los datos que el usuario desea modificar
  const update_data: Partial<ScheduledTravel> = {};

  if (passenger_id) update_data.passenger_id = passenger_id;
  if (driver_id) update_data.driver_id = driver_id;
  if (review_id) update_data.review_id = review_id;
  if (car_id) update_data.car_id = car_id;
  if (start_time) update_data.start_time = start_time;
  if (origin) update_data.origin = origin;
  if (destiny) update_data.destiny = destiny;

  //asigno los cambios
  const data_updated = await travel_finded.update(update_data);

  if (!data_updated)
    throw new ClientError(
      "Ha ocurrido un error, por favor intentelo nuevamente",
      500
    );
  response(res, 200, `Se actualizó el viaje exitosamente`);
};
