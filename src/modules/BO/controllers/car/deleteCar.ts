import { Request, Response } from "express";
import Car from "../../../../models/Car.model";
import ClientError from "../../../../utils/errors/error";
import response from "../../../../utils/response";

export default async (req: Request, res: Response): Promise<void> => {
  const car_id = req.params.id;

  // Buscar el conductor por su ID
  const car_finded = await Car.findByPk(car_id);
  if (!car_finded) {
    throw new ClientError("El conductor no existe", 404);
  }

  // Eliminar el conductor
  await car_finded.destroy();

  // Respuesta exitosa
  response(
    res,
    201,
    `Se eliminó al auto con patente ${car_finded.patent} exitosamente`
  );
};
