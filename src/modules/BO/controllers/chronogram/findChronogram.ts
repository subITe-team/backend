import { Request, Response } from "express";
import Chronogram from "../../../../models/Chronogram.model";
import ClientError from "../../../../utils/errors/error";
import response from "../../../../utils/response";
import Driver from "../../../../models/Driver.model";
import Remiserie from "../../../../models/Remiserie.model";

export default async (req: Request, res: Response): Promise<void> => {
  const chronogram_id = req.params.id;

  const chronogram_finded = await Chronogram.findByPk(chronogram_id, {
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

  if (!chronogram_finded) throw new ClientError("El cronograma no existe", 404);

  // Respondemos con los datos del cronograma encontrada
  response(res, 201, chronogram_finded);
};
