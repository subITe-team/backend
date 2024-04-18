import { Request, Response } from "express";
import ScheduledTravel from "../../../../models/ScheduledTravel.model";
import ClientError from "../../../../utils/errors/error";
import response from "../../../../utils/response";

export default async (req: Request, res: Response): Promise<void> => {
  const travel_id = req.params.id;

  // Buscar el conductor por su ID
  const travel_finded = await ScheduledTravel.findByPk(travel_id);
  if (!travel_finded) {
    throw new ClientError("El conductor no existe", 404);
  }

  // Eliminar el conductor
  await travel_finded.destroy();

  // Respuesta exitosa
  response(res, 201, `El viaje se eliminó exitosamente`);
};
