import { Request, Response } from "express";
import Chronogram from "../../../../models/Chronogram.model";
import response from "../../../../utils/response";
import Driver from "../../../../models/Driver.model";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const data = await Chronogram.findAll({
    where: { id: id },
    include: [
      {
        model: Driver, // Nombre del modelo Driver
        attributes: {
          exclude: ["password"], // Excluir el atributo 'password' del conductor
        },
      },
    ],
  });

  if (data.length === 0) response(res, 201, []);
  response(res, 201, data);
};
