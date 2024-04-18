import { Request, Response } from "express";
import { Op, WhereOptions } from "sequelize";
import Remiserie from "../../../../models/Remiserie.model";
import response from "../../../../utils/response";
import bcrypt from "bcrypt";
import ClientError from "../../../../utils/errors/error";
import { RequestBody } from "./type";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Obtener el ID de la remisería a actualizar

  const { name, email, password, name_remiserie, phone, profile_img } =
    req.body as RequestBody;

  // Verificar si existe una remisería con el ID proporcionado
  const remiserie_finded = await Remiserie.findByPk(id);

  if (!remiserie_finded) {
    throw new ClientError("La remisería no existe", 404);
  }

  // Verificar si los datos nuevos ya están en uso por otra remisería
  // Para eso primero creo un {} que se encargara de tener las clausulas que debo buscar en la DB
  //   const where_clause: any = {
  //     id: { [Op.not]: id }, // Excluir la remisería actual de la busqueda
  //   };

  //   if (email !== undefined) {
  //     //Si el email existe añado un [] al objeto para estipular que los campos
  //     where_clause[Op.or] = [{ email }]; //Email, name_remiserie y phone deben ser evaluados si ya estan en uso
  //   } //antes de realizar un cambio
  //   if (name_remiserie !== undefined) {
  //     if (!where_clause[Op.or]) {
  //       where_clause[Op.or] = [];
  //     }
  //     where_clause[Op.or].push({ name_remiserie });
  //   }
  //   if (phone !== undefined) {
  //     if (!where_clause[Op.or]) {
  //       where_clause[Op.or] = [];
  //     }
  //     where_clause[Op.or].push({ phone });
  //   }

  //   // En caso de que el usuario quizo modificar algunos de los campos de arriba
  //   // que deben ser unicos, debo realizar una consulta a la DB con esos datos
  //   if (where_clause[Op.or].length > 0) {
  //     const data_used = await Remiserie.findOne({ where: where_clause });

  //     //Si ya estan en uso devuelvo un error
  //     if (data_used) {
  //       let message_error = "";

  //       if (data_used.email === email) {
  //         message_error = "El Email ya está en uso";
  //       } else if (data_used.name_remiserie === name_remiserie) {
  //         message_error = "El nombre de la remisería ya está en uso";
  //       } else if (data_used.phone === phone) {
  //         message_error = "El número de teléfono ya está en uso";
  //       }

  //       throw new ClientError(message_error, 401);
  //     }
  //   }

  const where_conditions: WhereOptions[] = [{ id: { [Op.not]: id } }];

  if (email !== undefined) {
    where_conditions.push({ email });
  }

  if (name_remiserie !== undefined) {
    where_conditions.push({ name_remiserie });
  }

  if (phone !== undefined) {
    where_conditions.push({ phone });
  }

  const where_clause: WhereOptions = {
    [Op.or]: where_conditions,
  };

  const data_used = await Remiserie.findOne({ where: where_clause });

  if (data_used) {
    let message_error = "";

    if (data_used.email === email) {
      message_error = "El Email ya está en uso";
    } else if (data_used.name_remiserie === name_remiserie) {
      message_error = "El número de licencia ya está en uso";
    } else if (data_used.phone === phone) {
      message_error = "El número de teléfono ya está en uso";
    }

    throw new ClientError(message_error, 401);
  }

  //Creo un objeto personalizado solo con los datos que el usuario desea modificar
  const update_data: Partial<Remiserie> = {};

  if (name) update_data.name = name;
  if (email) update_data.email = email;
  if (password) {
    const password_hashed = await bcrypt.hash(password, 10);
    update_data.password = password_hashed;
  }
  if (name_remiserie) update_data.name_remiserie = name_remiserie;
  if (phone) update_data.phone = phone;
  if (profile_img) update_data.profile_img = profile_img;

  //asigno los cambios
  const data_updated = await remiserie_finded.update(update_data);

  response(
    res,
    200,
    `Se actualizó con éxito la remisería ${data_updated.name_remiserie}`
  );
};
