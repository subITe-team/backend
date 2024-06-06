import { Request, Response } from "express";
import Chronogram from "../../../../models/Chronogram.model";
import Driver from "../../../../models/Driver.model";
import Remiserie from "../../../../models/Remiserie.model";
import response from "../../../../utils/response";

export default async (_req: Request, res: Response): Promise<void> => {
  const data = await Chronogram.findAll({
    attributes: {
      exclude: ["remiserie_id"], // Excluir el atributo 'remiserie_id'
    },
    include: [
      {
        model: Driver, // Nombre del modelo Driver
        attributes: {
          exclude: ["password", "remiserie_id"], // Excluir el atributo 'password' del conductor
        },
        through: {
          attributes: [], // Esto excluye los atributos de la tabla intermedia (DriverChronogram)
        },
      },
      {
        model: Remiserie, // Nombre del modelo Remiserie
        as: "remiserie", // Alias si se define en la relación
        attributes: {
          exclude: ["password", "subscription_date"],
        },
      },
    ],
  });

  if (data.length === 0) response(res, 201, []);
  response(res, 201, data);
};
