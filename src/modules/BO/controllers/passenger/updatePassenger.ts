import { Request, Response } from "express";
import { Op, WhereOptions } from "sequelize";
import Passenger from "../../../../models/Passenger.model";
import response from "../../../../utils/response";
import bcrypt from "bcrypt";
import ClientError from "../../../../utils/errors/error";
import { RequestBody } from "./type";
import { PassengerAttributes } from "../../../../models/Passenger.model";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Obtener el ID del conductor a actualizar

  const {
    first_name,
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
    throw new ClientError("El pasajero no existe", 404);
  }

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

  if (data_used !== null) {
    let message_error = "";
    const values = data_used.get() as PassengerAttributes;

    if (values.email === email) {
      message_error = "El Email ya está en uso";
      throw new ClientError(message_error, 401);
    } else if (values.phone === phone) {
      message_error = "El número de teléfono ya está en uso";
      throw new ClientError(message_error, 401);
    } else if (values.dni === dni) {
      message_error = "El número de DNI ya está en uso";
      throw new ClientError(message_error, 401);
    }
  }

  //Creo un objeto personalizado solo con los datos que el usuario desea modificar
  const update_data: Partial<Passenger> = {};

  if (first_name) update_data.first_name = first_name;
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

  response(
    res,
    200,
    `Se actualizó con éxito al pasajero ${data_updated.first_name} ${data_updated.last_name}`
  );
};
