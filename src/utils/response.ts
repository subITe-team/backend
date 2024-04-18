import { Response } from "express";

export default (res: Response, statusCode: number, data: unknown): void => {
  res.status(statusCode).json({
    error: false,
    data,
  });
};
