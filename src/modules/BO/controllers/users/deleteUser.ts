import { Request, Response } from "express";
import User from "../../../../models/User.model";
import ClientError from "../../../../utils/errors/error";
import response from "../../../../utils/response";

export default async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;

  // Buscar la remisería por su ID
  const userFinded = await User.findByPk(userId);
  if (!userFinded) {
    throw new ClientError("La remisería no existe", 404);
  }

  // Eliminar la remisería
  await userFinded.destroy();

  // Respuesta exitosa
  response(res, 201, `Se elimino ${userFinded.username} exitosamente`);
};
