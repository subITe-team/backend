import { Request, Response } from "express";
import Driver from "../../../../models/Driver.model";
import Car from "../../../../models/Car.model";
import ClientError from "../../../../utils/errors/error";
import response from "../../../../utils/response";

export default async (req: Request, res: Response): Promise<void> => {
  const driver_id = req.params.id;

  // Buscar al conductor por su ID
  const driver_finded = await Driver.findByPk(driver_id, {
    attributes: { exclude: ["password"] }, // Excluir la columna de la contraseña
    include: [
      {
        model: Car,
        through: { attributes: [] }, // Selecciona las columnas que deseas incluir del modelo Car
        // Si también quieres incluir los datos vinculados a las relaciones de Car, puedes anidar más include aquí
      },
    ],
  });

  if (!driver_finded) throw new ClientError("El conductor no existe", 404);

  // Respondemos con los datos del conductor encontrada
  response(res, 201, driver_finded);
};
