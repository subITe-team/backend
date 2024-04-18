import { Request, Response } from "express";
import Review from "../../../../models/Review.model";
import ClientError from "../../../../utils/errors/error";
import response from "../../../../utils/response";

export default async (req: Request, res: Response): Promise<void> => {
  const review_id = req.params.id;

  // Buscar al conductor por su ID
  const review_finded = await Review.findByPk(
    review_id
    //    , {  attributes: { exclude: ['password'] } }
  );

  if (!review_finded) throw new ClientError("La calificación no existe", 404);

  // Respondemos con los datos del conductor encontrada
  response(res, 201, review_finded);
};
