import { Request, Response } from "express";
import User from "../../../../models/User.model";
import ClientError from "../../../../utils/errors/error";
import response from "../../../../utils/response";

export default async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;

  // Buscar la remisería por su ID
  const userFinded = await User.findByPk(userId, {
    attributes: { exclude: ["password"] },
  });

  if (!userFinded) {
    throw new ClientError("El usuario no existe", 404);
  }

  response(res, 201, userFinded);
};
