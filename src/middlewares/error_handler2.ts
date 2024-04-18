import { Request, Response, NextFunction } from "express";

interface HTTPError {
  statusCode?: number;
  message: string;
}

const errorHandlerMiddleware = (
  err: HTTPError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Internal Server Error" : err.message;
  if (statusCode === 500) console.log(err.message);

  res.status(statusCode).json({
    error: true,
    message,
  });
};

export default errorHandlerMiddleware;
