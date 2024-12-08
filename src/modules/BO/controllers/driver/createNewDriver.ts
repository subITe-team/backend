import { Request, Response } from "express";
import { Op } from "sequelize";
import Driver from "../../../../models/Driver.model";
import response from "../../../../utils/response";
import bcrypt from "bcrypt";
import ClientError from "../../../../utils/errors/error";
import { RequestBody } from "./type";

export default async (req: Request, res: Response): Promise<void> => {
  const {
    first_name,
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
    state,
    cars,
  } = req.body as RequestBody;
  console.log("Received driver creation request:", {
    first_name,
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
    state,
    cars,
  });

  // Validar campos requeridos
  const requiredFields = [
    "first_name",
    "last_name",
    "email",
    "dni",
    "phone",
    "license_pro",
    "password",
  ];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    throw new ClientError(
      `Campos requeridos faltantes: ${missingFields.join(", ")}`,
      400
    );
  }

  // Validar formato de DNI (asumiendo que debe ser numérico y tener 8 dígitos)
  const dniRegex = /^\d{8}$/;
  if (!dniRegex.test(dni)) {
    throw new ClientError("El DNI debe contener 8 dígitos numéricos", 400);
  }

  try {
    // Verificar datos duplicados
    const data_used = await Driver.findOne({
      where: {
        [Op.or]: [{ email }, { dni }, { phone }, { license_pro }],
      },
    });

    if (data_used) {
      let message_error = "";

      if (data_used.email === email) {
        message_error = "El Email ya está en uso";
      } else if (data_used.dni === dni) {
        message_error = "El DNI ya está registrado";
      } else if (data_used.phone === phone) {
        message_error = "El número de teléfono ya está en uso";
      } else if (data_used.license_pro === license_pro) {
        message_error = "El número de licencia de conductor ya está en uso";
      }

      throw new ClientError(message_error, 409); // Cambiado a 409 Conflict
    }

    const password_hashed = await bcrypt.hash(password, 10);

    const new_driver = await Driver.create({
      first_name,
      last_name,
      email,
      password: password_hashed,
      address,
      license_movil,
      license_pro,
      phone,
      birthdate,
      dni,
      latitude,
      longitude,
      remiserie_id,
      profile_img,
      state: state || "active", // Valor por defecto
      cars,
    });

    response(
      res,
      201,
      `Se creó con éxito al conductor ${new_driver.first_name.toUpperCase()} ${new_driver.last_name.toUpperCase()}`
    );
  } catch (error) {
    if (error instanceof ClientError) throw error;

    throw new ClientError(
      "Ocurrió un error al crear el conductor. Por favor, inténtalo nuevamente.",
      500
    );
  }
};
