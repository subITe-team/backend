import { Request, Response } from "express";
import Chronogram from "../../../../models/Chronogram.model";
import Driver from "../../../../models/Driver.model";
import response from "../../../../utils/response";
import ClientError from "../../../../utils/errors/error";
import { RequestBody } from "./type";
import sequelize from "../../../../config/database";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { drivers, shift, date, remiserie_id } = req.body as RequestBody;

  // Iniciar una transacción
  const transaction = await sequelize.transaction();

  // Verificar si existe un cronograma con el ID proporcionado
  const chronogram_finded = await Chronogram.findByPk(id, { transaction });

  if (!chronogram_finded) {
    throw new ClientError("El cronograma no existe", 404);
  }

  // Crear un objeto personalizado solo con los datos que el usuario desea modificar
  const update_data: Partial<Chronogram> = {};

  if (date) update_data.date = date;
  if (shift) update_data.shift = shift;
  if (remiserie_id) update_data.remiserie_id = remiserie_id;

  // Asignar los cambios
  await chronogram_finded.update(update_data, { transaction });

  // Buscar los conductores por sus IDs si se proporcionan
  if (drivers && drivers.length > 0) {
    const driverInstances = await Driver.findAll({
      where: { id: drivers },
      transaction,
    });

    if (driverInstances.length !== drivers.length) {
      throw new ClientError("Uno o más conductores no existen", 400);
    }

    // Asocia los conductores con el cronograma
    await chronogram_finded.$set("drivers", driverInstances, { transaction });
  }

  // Confirmar la transacción
  await transaction.commit();

  response(res, 200, "Se actualizó con éxito el cronograma");

  //   const { id } = req.params;
  //   const { drivers, shift, date, remiserie_id } = req.body as RequestBody;
  //   // Verificar si existe un conductor con el ID proporcionado
  //   const chronogram_finded = await Chronogram.findByPk(id);
  //   if (!chronogram_finded) {
  //     throw new ClientError("El cronograma no existe", 404);
  //   }
  //   //Creo un objeto personalizado solo con los datos que el usuario desea modificar
  //   const update_data: Partial<Chronogram> = {};
  //   if (date) update_data.date = date;
  //   if (shift) update_data.shift = shift;
  //   if (remiserie_id) update_data.remiserie_id = remiserie_id;
  //   //asigno los cambios
  //   await chronogram_finded.update(update_data);
  //   response(res, 200, "Se actualizó con éxito el cronograma");
};
