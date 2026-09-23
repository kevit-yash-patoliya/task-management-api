import type { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";
import HttpException from "@/utils/error.utils.js";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(err instanceof HttpException){
    
  }
  logger.error(err.message || "Internal Server Error");
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
