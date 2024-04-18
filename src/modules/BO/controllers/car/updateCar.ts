import { Request, Response } from "express";
import { Op, WhereOptions } from "sequelize";
import Car from "../../../../models/Car.model";
import response from "../../../../utils/response";
import ClientError from "../../../../utils/errors/error";
import { RequestBody } from "./type";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Obtener el ID del conductor a actualizar

  const {
    remiserie_id,
    brand,
    model,
    patent,
    color,
    year,
    habilitation,
    insurance,
    date_onboarding,
  } = req.body as RequestBody;

  // Verificar si existe un conductor con el ID proporcionado
  const car_finded = await Car.findByPk(id);

  if (!car_finded) {
    throw new ClientError("El auto no existe", 404);
  }

  const where_conditions: WhereOptions[] = [{ id: { [Op.not]: id } }];

  if (patent !== undefined) {
    where_conditions.push({ patent });
  }

  if (insurance !== undefined) {
    where_conditions.push({ insurance });
  }

  const where_clause: WhereOptions = {
    [Op.or]: where_conditions,
  };

  const data_used = await Car.findOne({ where: where_clause });
  console.log(data_used);

  if (data_used) {
    let message_error = "";

    if (data_used.patent === patent) {
      message_error = "La patente ya está en uso";
    } else if (data_used.insurance === insurance) {
      message_error = "El número de seguro ya está en uso";
    }

    throw new ClientError(message_error, 401);
  }

  //Creo un objeto personalizado solo con los datos que el usuario desea modificar
  const update_data: Partial<Car> = {};

  if (remiserie_id) update_data.remiserie_id = remiserie_id;
  if (brand) update_data.brand = brand;
  if (model) update_data.model = model;
  if (color) update_data.color = color;
  if (year) update_data.year = year;
  if (habilitation) update_data.habilitation = habilitation;
  if (patent) update_data.patent = patent;
  if (insurance) update_data.insurance = insurance;
  if (date_onboarding) update_data.date_onboarding = date_onboarding;

  //asigno los cambios
  const data_updated = await car_finded.update(update_data);

  response(
    res,
    200,
    `Se actualizó con éxito el auto con patente ${data_updated.patent}`
  );
};
