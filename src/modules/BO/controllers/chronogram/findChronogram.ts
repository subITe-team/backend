import { Request, Response } from "express";
import Chronogram from "../../../../models/Chronogram.model";
import ClientError from "../../../../utils/errors/error";
import response from "../../../../utils/response";
import Driver from "../../../../models/Driver.model";

export default async (req: Request, res: Response): Promise<void> => {
  const chronogram_id = req.params.id;

  const chronogram_finded = await Chronogram.findByPk(chronogram_id, {
    include: [
      {
        model: Driver, // Nombre del modelo Driver
        attributes: {
          exclude: ["password"], // Excluir el atributo 'password' del conductor
        },
      },
    ],
  });

  if (!chronogram_finded) throw new ClientError("El cronograma no existe", 404);

  // Respondemos con los datos del cronograma encontrada
  response(res, 201, chronogram_finded);
};
