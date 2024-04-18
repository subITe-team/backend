import { Request, Response } from "express";
import Car from "../../../../models/Car.model";
import ClientError from "../../../../utils/errors/error";
import response from "../../../../utils/response";
import Driver from "../../../../models/Driver.model";
import Remiserie from "../../../../models/Remiserie.model";

export default async (req: Request, res: Response): Promise<void> => {
  const car_id = req.params.id;

  const car_finded = await Car.findByPk(car_id, {
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

  if (!car_finded) {
    throw new ClientError("El conductor no existe", 404);
  }

  response(res, 201, car_finded);
};
