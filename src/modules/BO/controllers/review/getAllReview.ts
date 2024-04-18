import { Request, Response } from "express";
import Review from "../../../../models/Review.model";
import response from "../../../../utils/response";

export default async (_req: Request, res: Response): Promise<void> => {
  const data = await Review.findAll();

  if (data.length === 0) response(res, 201, []);
  response(res, 201, data);
};
