import { Request, Response } from "express";
import { Op } from "sequelize";
import User from "../../../../models/User.model";
import response from "../../../../utils/response";
import bcrypt from "bcrypt";
import ClientError from "../../../../utils/errors/error";
import { RequestBody } from "./type";

export default async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, profile_img } = req.body as RequestBody;

  const dataUsed = await User.findOne({
    where: {
      [Op.or]: [{ email }, { username }],
    },
  });

  if (dataUsed) {
    let messageError = "";

    if (dataUsed.email === email) {
      messageError = "El Email ya esta en uso";
    } else if (dataUsed.username === username) {
      messageError = "El nombre de usuario ya esta en uso";
    }

    throw new ClientError(messageError, 401);
  }

  const passwordHashed = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: passwordHashed,
    profile_img,
  });

  if (newUser)
    response(res, 201, `Se creo con exito el usuario ${newUser.username}`);
  else
    throw new ClientError(
      "Ocurrio un error, por favor intentalo nuevamente.",
      500
    );
};
