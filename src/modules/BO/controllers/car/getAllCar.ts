import { Request, Response } from "express";
import Car from "../../../../models/Car.model";
import response from "../../../../utils/response";
import Driver from "../../../../models/Driver.model";
import Remiserie from "../../../../models/Remiserie.model";

export default async (_req: Request, res: Response): Promise<void> => {
  const data = await Car.findAll({
    include: [
      {
        model: Driver, // Nombre del modelo Driver
        attributes: {
          exclude: ["password"], // Excluir el atributo 'password' del conductor
        },
        through: { attributes: [] },
      },
      {
        model: Remiserie,
        attributes: {
          exclude: ["password"],
        },
      },
    ],
    attributes: {
      exclude: ["remiserie_id"], // Excluye la columna "remiserie_id" del modelo Car
    },
  });

  if (data.length === 0) response(res, 201, []);

  response(res, 201, data);
};
