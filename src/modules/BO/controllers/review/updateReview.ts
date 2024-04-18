import { Request, Response } from "express";
import { Op, WhereOptions } from "sequelize";
import Review from "../../../../models/Review.model";
import response from "../../../../utils/response";
import ClientError from "../../../../utils/errors/error";
import { RequestBody } from "./type";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Obtener el ID del conductor a actualizar

  const { driver_id, passenger_id, travel_id, description, card_stars } =
    req.body as RequestBody;

  // Verificar si existe un conductor con el ID proporcionado
  const review_finded = await Review.findByPk(id);

  if (!review_finded) {
    throw new ClientError("La calificación no existe", 404);
  }

  // Verificar si los datos nuevos ya están en uso por otro conductor
  // Para eso primero creo un {} que se encargara de tener las clausulas que debo buscar en la DB
  //   const where_clause: any = {
  //     id: { [Op.not]: id }, // Excluir la remisería actual de la busqueda
  //   };

  //   if (travel_id !== undefined) {
  //     where_clause[Op.or] = [{ travel_id }];
  //   }

  //   // En caso de que el usuario quizo modificar algunos de los campos de arriba
  //   // que deben ser unicos, debo realizar una consulta a la DB con esos datos
  //   if (where_clause[Op.or].length > 0) {
  //     const data_used = await Review.findOne({ where: where_clause });

  //     //Si ya estan en uso devuelvo un error
  //     if (data_used) {
  //       let message_error = "";

  //       if (data_used.travel_id === travel_id) {
  //         message_error = "El viaje ya está en calificado";
  //       }

  //       throw new ClientError(message_error, 401);
  //     }
  //   }

  const where_conditions: WhereOptions[] = [{ id: { [Op.not]: id } }];

  if (travel_id !== undefined) {
    where_conditions.push({ travel_id });
  }

  const where_clause: WhereOptions = {
    [Op.or]: where_conditions,
  };

  const data_used = await Review.findOne({ where: where_clause });

  if (data_used) {
    let message_error = "";

    if (data_used.travel_id === travel_id) {
      message_error = "El viaje ya está en calificado";
    }

    throw new ClientError(message_error, 401);
  }

  //Creo un objeto personalizado solo con los datos que el usuario desea modificar
  const update_data: Partial<Review> = {};

  if (driver_id) update_data.driver_id = driver_id;
  if (passenger_id) update_data.passenger_id = passenger_id;
  if (travel_id) update_data.travel_id = travel_id;
  if (description) update_data.description = description;
  if (card_stars) update_data.card_stars = card_stars;

  //asigno los cambios
  const data_updated = await review_finded.update(update_data);

  if (!data_updated)
    throw new ClientError(
      "Ocurrio un error, por favor intentelo nuevamente",
      500
    );
  response(res, 200, `La calificación se actualizó exitosamente`);
};
