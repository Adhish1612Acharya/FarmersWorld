import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    console.log("error middleware");
    const statusNumber = err.status || 500;
    const Msg = err.errMsg;
    console.log(`${statusNumber} , ${Msg}`);
    res.status(statusNumber);
  } else {
    next();
  }
};

export default errorHandler;
