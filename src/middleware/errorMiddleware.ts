import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";

const sendErrorDev = (err: AppError, res: any) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
    });
};

const sendErrorProd = (err: AppError, res: any) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};

const handleJWTInvalidSignature = () =>
    new AppError("Invalid token, please login again...", 401);
  
  const handleJWTTokenExpiredError = () =>
    new AppError("Token expired, please login again...", 401);
  
  const globalError = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";
    if (process.env.NODE_ENV === "development") {
      sendErrorDev(err, res);
    } else {
      let error = err;
      if (err.name === "JsonWebTokenError") error = handleJWTInvalidSignature();
      if (err.name === "TokenExpiredError") error = handleJWTTokenExpiredError();
      sendErrorProd(error, res);
    }
  };  

  export default globalError;