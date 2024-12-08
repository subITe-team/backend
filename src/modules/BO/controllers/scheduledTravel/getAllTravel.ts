import { Request, Response } from "express";
import ScheduledTravel from "../../../../models/ScheduledTravel.model";
import response from "../../../../utils/response";

export default async (_req: Request, res: Response): Promise<void> => {
  const data = await ScheduledTravel.findAll();

  if (data.length === 0) response(res, 200, []);
  response(res, 200, data);
};
