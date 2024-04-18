import { Request, Response } from "express";
import Chronogram from "../../../../models/Chronogram.model";
import ClientError from "../../../../utils/errors/error";
import response from "../../../../utils/response";

export default async (req: Request, res: Response): Promise<void> => {
  const chronogram_id = req.params.id;

  const chronogram_finded = await Chronogram.findByPk(chronogram_id);
  if (!chronogram_finded) {
    throw new ClientError("El cronograma no existe", 404);
  }

  await chronogram_finded.destroy();

  // Respuesta exitosa
  response(res, 201, "El cronograma se ha eliminado exitosamente.");
};
