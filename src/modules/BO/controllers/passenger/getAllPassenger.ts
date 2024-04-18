import { Request, Response } from "express";
import Passenger from "../../../../models/Passenger.model";
import response from "../../../../utils/response";

export default async (_req: Request, res: Response): Promise<void> => {
  const data = await Passenger.findAll({
    attributes: { exclude: ["password"] }, // Excluir la columna de la contraseña
  });

  if (data.length === 0) response(res, 201, []);
  response(res, 201, data);
};
