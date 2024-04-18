import { Request, Response } from "express";
import Chronogram from "../../../../models/Chronogram.model";
import response from "../../../../utils/response";
import { RequestBody } from "./type";

export default async (req: Request, res: Response): Promise<void> => {
  const { driver_id, shift } = req.body as RequestBody;

  await Chronogram.create({
    driver_id,
    shift,
  });

  response(res, 201, "El cronograma se ha creado exitosamente.");
};
