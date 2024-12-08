import { Request, Response } from "express";
import Driver from "../../../../models/Driver.model";
import ClientError from "../../../../utils/errors/error";
import response from "../../../../utils/response";

export default async (req: Request, res: Response): Promise<void> => {
  const driver_id = req.params.id;

  // Buscar el conductor por su ID
  const driver_finded = await Driver.findByPk(driver_id);
  if (!driver_finded) {
    throw new ClientError("El conductor no existe", 404);
  }

  // Eliminar el conductor
  await driver_finded.destroy();

  // Respuesta exitosa
  response(res, 201, `Se eliminó a ${driver_finded.first_name} exitosamente`);
};
