import { Request, Response } from "express";
import User from "../../../../models/User.model";
import response from "../../../../utils/response";

export default async (_req: Request, res: Response): Promise<void> => {
  const data = await User.findAll({
    attributes: { exclude: ["password"] },
  });

  if (data.length === 0) response(res, 201, []);

  response(res, 201, data);
};
