import { Request, Response, NextFunction } from "express";

export default (fn: (req: Request, res: Response) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res).catch((error) => next(error));
  };
