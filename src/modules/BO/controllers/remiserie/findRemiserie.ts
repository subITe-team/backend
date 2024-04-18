import { Request, Response } from "express";
import Remiserie from "../../../../models/Remiserie.model";
import ClientError from "../../../../utils/errors/error";
import response from "../../../../utils/response";

export default async (req: Request, res: Response): Promise<void> => {
  const remiserie_id = req.params.id;

  // Buscar la remisería por su ID
  const remiserie_finded = await Remiserie.findByPk(remiserie_id, {
    attributes: { exclude: ["password"] }, // Excluir la columna de la contraseña
  });

  if (!remiserie_finded) {
    throw new ClientError("La remisería no existe", 404);
  }

  // Respondemos con los datos de la remisería encontrada
  response(res, 201, remiserie_finded);
};
