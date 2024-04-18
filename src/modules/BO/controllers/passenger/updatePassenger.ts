import { Request, Response } from "express";
import { Op, WhereOptions } from "sequelize";
import Passenger from "../../../../models/Passenger.model";
import response from "../../../../utils/response";
import bcrypt from "bcrypt";
import ClientError from "../../../../utils/errors/error";
import { RequestBody } from "./type";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Obtener el ID del conductor a actualizar

  const {
    name,
    last_name,
    address,
    email,
    birthdate,
    password,
    phone,
    latitude,
    longitude,
    dni,
    remiserie_id,
    profile_img,
  } = req.body as RequestBody;

  // Verificar si existe un conductor con el ID proporcionado
  const passenger_finded = await Passenger.findByPk(id);

  if (!passenger_finded) {
    throw new ClientError("El conductor no existe", 404);
  }

  // Verificar si los datos nuevos ya están en uso por otro conductor
  // Para eso primero creo un {} que se encargara de tener las clausulas que debo buscar en la DB
  //   const where_clause: any = {
  //     id: { [Op.not]: id }, // Excluir la remisería actual de la busqueda
  //   };

  //   if (email !== undefined) {
  //     //Si el email existe añado un [] al objeto para estipular que los campos
  //     where_clause[Op.or] = [{ email }]; //Email, name_remiserie y phone deben ser evaluados si ya estan en uso
  //   } //antes de realizar un cambio
  //   if (phone !== undefined) {
  //     if (!where_clause[Op.or]) {
  //       where_clause[Op.or] = [];
  //     }
  //     where_clause[Op.or].push({ phone });
  //   }
  //   if (dni !== undefined) {
  //     if (!where_clause[Op.or]) {
  //       where_clause[Op.or] = [];
  //     }
  //     where_clause[Op.or].push({ dni });
  //   }

  //   // En caso de que el usuario quizo modificar algunos de los campos de arriba
  //   // que deben ser unicos, debo realizar una consulta a la DB con esos datos
  //   if (where_clause[Op.or].length > 0) {
  //     const data_used = await Passenger.findOne({ where: where_clause });

  //     //Si ya estan en uso devuelvo un error
  //     if (data_used) {
  //       let message_error = "";

  //       if (data_used.email === email) {
  //         message_error = "El Email ya está en uso";
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

  if (dni !== undefined) {
    where_conditions.push({ dni });
  }

  if (phone !== undefined) {
    where_conditions.push({ phone });
  }

  const where_clause: WhereOptions = {
    [Op.or]: where_conditions,
  };

  const data_used = await Passenger.findOne({ where: where_clause });

  if (data_used) {
    let message_error = "";

    if (data_used.email === email) {
      message_error = "El Email ya está en uso";
    } else if (data_used.phone === phone) {
      message_error = "El número de teléfono ya está en uso";
    } else if (data_used.dni === dni) {
      message_error = "El número de DNI ya está en uso";
    }

    throw new ClientError(message_error, 401);
  }

  //Creo un objeto personalizado solo con los datos que el usuario desea modificar
  const update_data: Partial<Passenger> = {};

  if (name) update_data.name = name;
  if (last_name) update_data.last_name = last_name;
  if (email) update_data.email = email;
  if (address) update_data.address = address;
  if (birthdate) update_data.birthdate = birthdate;
  if (remiserie_id) update_data.remiserie_id = remiserie_id;
  if (latitude) update_data.latitude = latitude;
  if (longitude) update_data.longitude = longitude;
  if (password) {
    const password_hashed = await bcrypt.hash(password, 10);
    update_data.password = password_hashed;
  }
  if (phone) update_data.phone = phone;
  if (dni) update_data.dni = dni;
  if (profile_img) update_data.profile_img = profile_img;

  //asigno los cambios
  const data_updated = await passenger_finded.update(update_data);

  response(res, 200, `Se actualizó con éxito al pasajero ${data_updated.name}`);
};
