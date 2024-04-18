import { Request, Response } from "express";
import { Op, WhereOptions } from "sequelize";
import Driver from "../../../../models/Driver.model";
import response from "../../../../utils/response";
import bcrypt from "bcrypt";
import ClientError from "../../../../utils/errors/error";
import { RequestBody } from "./type";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Obtener el ID del conductor a actualizar

  const {
    name,
    last_name,
    email,
    address,
    birthdate,
    dni,
    phone,
    license_movil,
    license_pro,
    remiserie_id,
    latitude,
    longitude,
    password,
    profile_img,
  } = req.body as RequestBody;

  // Verificar si existe un conductor con el ID proporcionado
  const driver_finded = await Driver.findByPk(id);

  if (!driver_finded) {
    throw new ClientError("El conductor no existe", 404);
  }

  // Verificar si los datos nuevos ya están en uso por otro conductor
  // Para eso primero creo un {} que se encargara de tener las clausulas que debo buscar en la DB
  //   const where_clause: WhereOptions = {
  //     id: { [Op.not]: id },
  //   };

  //   if (email !== undefined) {
  //     where_clause[Op.or] = [{ email }];
  //   }

  //   if (license_pro !== undefined) {
  //     const licenseProWhere = { license_pro };
  //     if (where_clause[Op.or]) {
  //       where_clause[Op.or].push(licenseProWhere);
  //     } else {
  //       where_clause[Op.or] = [licenseProWhere];
  //     }
  //   }

  //   if (phone !== undefined) {
  //     const phoneWhere = { phone };
  //     if (where_clause[Op.or]) {
  //       where_clause[Op.or].push(phoneWhere);
  //     } else {
  //       where_clause[Op.or] = [phoneWhere];
  //     }
  //   }

  //   if (dni !== undefined) {
  //     const dniWhere = { dni };
  //     if (where_clause[Op.or]) {
  //       where_clause[Op.or].push(dniWhere);
  //     } else {
  //       where_clause[Op.or] = [dniWhere];
  //     }
  //   }

  //   if (Object.keys(where_clause).length > 0) {
  //     const data_used = await Driver.findOne({ where: where_clause });

  //     if (data_used) {
  //       let message_error = "";

  //       if (data_used.email === email) {
  //         message_error = "El Email ya está en uso";
  //       } else if (data_used.license_pro === license_pro) {
  //         message_error = "El número de licencia ya está en uso";
  //       } else if (data_used.phone === phone) {
  //         message_error = "El número de teléfono ya está en uso";
  //       } else if (data_used.dni === dni) {
  //         message_error = "El número de DNI ya está en uso";
  //       }

  //       throw new ClientError(message_error, 401);
  //     }
  //   }
  const where_conditions: WhereOptions[] = [{ id: { [Op.not]: id } }];

  if (email !== undefined) {
    where_conditions.push({ email });
  }

  if (license_pro !== undefined) {
    where_conditions.push({ license_pro });
  }

  if (phone !== undefined) {
    where_conditions.push({ phone });
  }

  if (dni !== undefined) {
    where_conditions.push({ dni });
  }

  const where_clause: WhereOptions = {
    [Op.or]: where_conditions,
  };

  const data_used = await Driver.findOne({ where: where_clause });

  if (data_used) {
    let message_error = "";

    if (data_used.email === email) {
      message_error = "El Email ya está en uso";
    } else if (data_used.license_pro === license_pro) {
      message_error = "El número de licencia ya está en uso";
    } else if (data_used.phone === phone) {
      message_error = "El número de teléfono ya está en uso";
    } else if (data_used.dni === dni) {
      message_error = "El número de DNI ya está en uso";
    }

    throw new ClientError(message_error, 401);
  }

  //Creo un objeto personalizado solo con los datos que el usuario desea modificar
  const update_data: Partial<Driver> = {};

  if (name) update_data.name = name;
  if (last_name) update_data.last_name = last_name;
  if (email) update_data.email = email;
  if (address) update_data.address = address;
  if (birthdate) update_data.birthdate = birthdate;
  if (license_movil) update_data.license_movil = license_movil;
  if (license_pro) update_data.license_pro = license_pro;
  if (remiserie_id) update_data.remiserie_id = remiserie_id;
  if (latitude) update_data.latitude = latitude;
  if (longitude) update_data.longitude = longitude;
  if (password) {
    const password_hashed = await bcrypt.hash(password, 10);
    update_data.password = password_hashed;
  }
  if (phone) update_data.phone = phone;
  if (profile_img) update_data.profile_img = profile_img;

  //asigno los cambios
  const data_updated = await driver_finded.update(update_data);

  response(
    res,
    200,
    `Se actualizó con éxito al conductor ${data_updated.name}`
  );
};
