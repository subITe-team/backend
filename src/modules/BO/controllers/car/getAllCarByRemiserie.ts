import { Request, Response } from "express";
import Car from "../../../../models/Car.model";
import response from "../../../../utils/response";
import Driver from "../../../../models/Driver.model";
import Remiserie from "../../../../models/Remiserie.model";
import ClientError from "../../../../utils/errors/error";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) throw new ClientError("ID inválido", 400);

  const remiserie_exist = await Remiserie.findByPk(id);
  if (!remiserie_exist) {
    throw new ClientError("No se encontró una remiseria con ese ID", 404);
  }
  const data = await Car.findAll({
    where: { remiserie_id: id },
    include: [
      {
        model: Driver, // Nombre del modelo Driver
        attributes: {
          exclude: ["password"], // Excluir el atributo 'password' del conductor
        },
        through: { attributes: [] },
      },
    ],
    attributes: {
      exclude: ["remiserie_id"], // Excluye la columna "remiserie_id" del modelo Car
    },
  });

  if (data.length === 0) response(res, 201, []);

  response(res, 201, data);
};
