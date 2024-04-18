import { Request, Response } from "express";
import { Op, WhereOptions } from "sequelize";
import User from "../../../../models/User.model";
import response from "../../../../utils/response";
import bcrypt from "bcrypt";
import ClientError from "../../../../utils/errors/error";
import { RequestBody } from "./type";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { username, email, password, profile_img } = req.body as RequestBody;

  const userFinded = await User.findByPk(id);

  if (!userFinded) {
    throw new ClientError("El usuario no existe", 404);
  }

  //   const whereClause: any = {
  //     id: { [Op.not]: id },
  //   };

  //   if (email !== undefined) {
  //     whereClause[Op.or] = [{ email }];
  //   }
  //   if (username !== undefined) {
  //     if (!whereClause[Op.or]) {
  //       whereClause[Op.or] = [];
  //     }
  //     whereClause[Op.or].push({ username });
  //   }

  //   if (whereClause[Op.or].length > 0) {
  //     const dataUsed = await User.findOne({ where: whereClause });

  //     //Si ya estan en uso devuelvo un error
  //     if (dataUsed) {
  //       let messageError = "";

  //       if (dataUsed.email === email) {
  //         messageError = "El Email ya está en uso";
  //       } else if (dataUsed.username === username) {
  //         messageError = "El nombre de usuario ya está en uso";
  //       }

  //       throw new ClientError(messageError, 401);
  //     }
  //   }

  const where_conditions: WhereOptions[] = [{ id: { [Op.not]: id } }];

  if (email !== undefined) {
    where_conditions.push({ email });
  }

  if (username !== undefined) {
    where_conditions.push({ username });
  }

  const where_clause: WhereOptions = {
    [Op.or]: where_conditions,
  };

  const data_used = await User.findOne({ where: where_clause });

  if (data_used) {
    let message_error = "";

    if (data_used.email === email) {
      message_error = "El Email ya está en uso";
    } else if (data_used.username === username) {
      message_error = "El nombre de usuario ya está en uso";
    }

    throw new ClientError(message_error, 401);
  }

  //Creo un objeto personalizado solo con los datos que el usuario desea modificar
  const updateData: Partial<User> = {};

  if (username) updateData.username = username;
  if (email) updateData.email = email;
  if (password) {
    const passwordHashed = await bcrypt.hash(password, 10);
    updateData.password = passwordHashed;
  }
  if (profile_img) updateData.profile_img = profile_img;

  //asigno los cambios
  const dataUpdated = await userFinded.update(updateData);

  response(
    res,
    200,
    `Se actualizó con éxito la remisería ${dataUpdated.username}`
  );
};
