import { Request, Response } from "express";
import Passenger from "../../../../models/Passenger.model";
import ClientError from "../../../../utils/errors/error";
import response from "../../../../utils/response";

export default async (req: Request, res: Response): Promise<void> => {
  const passenger_id = req.params.id;

  // Buscar al conductor por su ID
  const passenger_finded = await Passenger.findByPk(passenger_id, {
    attributes: { exclude: ["password"] }, // Excluir la columna de la contraseña
  });

  if (!passenger_finded) throw new ClientError("El pasajero no existe", 404);

  // Respondemos con los datos del conductor encontrada
  response(res, 201, passenger_finded);
};
