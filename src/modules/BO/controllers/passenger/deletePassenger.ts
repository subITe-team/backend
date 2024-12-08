import { Request, Response } from "express";
import Passenger from "../../../../models/Passenger.model";
import ClientError from "../../../../utils/errors/error";
import response from "../../../../utils/response";

export default async (req: Request, res: Response): Promise<void> => {
  const passenger_id = req.params.id;

  // Buscar el conductor por su ID
  const passenger_finded = await Passenger.findByPk(passenger_id);
  if (!passenger_finded) {
    throw new ClientError("El pasajero no existe", 404);
  }

  // Eliminar el conductor
  await passenger_finded.destroy();

  // Respuesta exitosa
  response(
    res,
    201,
    `Se eliminó a ${passenger_finded.first_name} ${passenger_finded.last_name} exitosamente`
  );
};
