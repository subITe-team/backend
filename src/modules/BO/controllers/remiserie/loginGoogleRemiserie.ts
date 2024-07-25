import { Request, Response } from "express";
import { RequestBody } from "./type";
import Remiserie from "../../../../models/Remiserie.model";
import response from "../../../../utils/response";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ClientError from "../../../../utils/errors/error";
import config from "../../../../config/config";

export default async (req: Request, res: Response): Promise<void> => {
  const { name, name_remiserie, email, phone, profile_img } =
    req.body as RequestBody;
  let user_found = await Remiserie.findOne({ where: { email } });

  if (!user_found) {
    const password_hashed = await bcrypt.hash("googleAccessAllowed", 10);
    user_found = await Remiserie.create({
      name,
      name_remiserie,
      email,
      phone,
      password: password_hashed,
      profile_img,
    });
  }

  if (!user_found) throw new ClientError("No se pudo crear el usuario", 400);

  interface PayloadToken {
    id: string;
    name: string;
    name_remiserie: string;
    email: string;
    phone: string;
    profile_img: string;
  }

  const payload: PayloadToken = {
    id: user_found.id,
    name,
    name_remiserie,
    email,
    phone,
    profile_img,
  };

  const token = jwt.sign(payload, config.JWT_SECRET);

  user_found.token = token;
  await user_found.save();

  response(res, 201, token);
};
