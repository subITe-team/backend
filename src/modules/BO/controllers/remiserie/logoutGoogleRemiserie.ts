import { Request, Response } from "express";
import { RequestBody } from "./type";
import Remiserie from "../../../../models/Remiserie.model";
import response from "../../../../utils/response";
import ClientError from "../../../../utils/errors/error";

export default async (req: Request, res: Response): Promise<void> => {
  const { token, email } = req.body as RequestBody;
  const user_found = await Remiserie.findOne({ where: { email } });

  if (!user_found) throw new ClientError("No se encontró el usuario", 404);

  if (user_found.token === token) {
    user_found.token = null;
  }

  await user_found.save();

  response(res, 200, "Has Cerrado Sesión");
};
