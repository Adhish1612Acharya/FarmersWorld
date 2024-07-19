import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    console.log("error middleware");
    const statusNumber = err.statusCode || 500;
    const Msg = err.errorMsg || "Internal server error";
    console.log(`${statusNumber} , ${Msg}`);
    res.status(statusNumber);
  } else {
    next();
  }
};

export default errorHandler;
