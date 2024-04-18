import { Request, Response } from "express";
import Review from "../../../../models/Review.model";
import ClientError from "../../../../utils/errors/error";
import response from "../../../../utils/response";

export default async (req: Request, res: Response): Promise<void> => {
  const review_id = req.params.id;

  // Buscar el conductor por su ID
  const review_finded = await Review.findByPk(review_id);
  if (!review_finded) {
    throw new ClientError("La calificacón no existe", 404);
  }

  // Eliminar el conductor
  await review_finded.destroy();

  // Respuesta exitosa
  response(res, 201, `La calificación se eliminó exitosamente`);
};
