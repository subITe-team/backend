import { Request, Response } from "express";
import Chronogram from "../../../../models/Chronogram.model";
import response from "../../../../utils/response";
import Driver from "../../../../models/Driver.model";
import Remiserie from "../../../../models/Remiserie.model";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const data = await Chronogram.findAll({
    where: { remiserie_id: id },
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

  response(res, 201, data);
};
