import { Request, Response } from "express";
import Chronogram from "../../../../models/Chronogram.model";
import response from "../../../../utils/response";
import { RequestBody } from "./type";
import ClientError from "../../../../utils/errors/error";
import Driver from "../../../../models/Driver.model";
import sequelize from "../../../../config/database";

export default async (req: Request, res: Response): Promise<void> => {
  const { shift, date, remiserie_id, drivers } = req.body as RequestBody;

  // Iniciar una transacción
  const transaction = await sequelize.transaction();
  // Crear el nuevo cronograma
  const new_chrono = await Chronogram.create(
    {
      date,
      remiserie_id,
      shift,
    },
    { transaction }
  );

  const driverInstances = await Driver.findAll({
    where: { id: drivers },
    transaction,
  });

  if (driverInstances.length !== drivers.length) {
    await transaction.rollback();
    throw new ClientError("Uno o más conductores no se encontraron", 404);
  }

  await new_chrono.$set("drivers", driverInstances, { transaction });

  await transaction.commit();

  response(res, 201, "El cronograma se ha creado exitosamente.");
};
