import { Request, Response } from "express";
import Chronogram from "../../../../models/Chronogram.model";
import response from "../../../../utils/response";
import ClientError from "../../../../utils/errors/error";
import { RequestBody } from "./type";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { driver_id, shift, date, remiserie_id } = req.body as RequestBody;

  // Verificar si existe un conductor con el ID proporcionado
  const chronogram_finded = await Chronogram.findByPk(id);

  if (!chronogram_finded) {
    throw new ClientError("El cronograma no existe", 404);
  }

  //Creo un objeto personalizado solo con los datos que el usuario desea modificar
  const update_data: Partial<Chronogram> = {};

  if (driver_id) update_data.driver_id = driver_id;
  if (date) update_data.date = date; 
  if (shift) update_data.shift = "DAY" || "NIGHT";
  if (remiserie_id) update_data.remiserie_id = remiserie_id;

  //asigno los cambios
  await chronogram_finded.update(update_data);

  response(res, 200, "Se actualizó con éxito el cronograma");
};
