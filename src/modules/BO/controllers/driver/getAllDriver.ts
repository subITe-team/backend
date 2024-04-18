import { Request, Response } from "express";
import Driver from "../../../../models/Driver.model";
import response from "../../../../utils/response";
import Remiserie from "../../../../models/Remiserie.model";
import Car from "../../../../models/Car.model";

export default async (_req: Request, res: Response): Promise<void> => {
  const data = await Driver.findAll({
    attributes: { exclude: ["remiserie_id", "password"] }, // Excluir la columna de la contraseña
    include: [
      {
        model: Remiserie,
        attributes: { exclude: ["driver_id", "password"] }, // Selecciona las columnas que deseas incluir del modelo Car
        // Si también quieres incluir los datos vinculados a las relaciones de Car, puedes anidar más include aquí
      },
      {
        model: Car,
        through: { attributes: [] }, // Esto evita que se incluyan las columnas adicionales de la tabla intermedia
      },
    ],
  });

  if (data.length === 0) response(res, 201, []);
  response(res, 201, data);
};
