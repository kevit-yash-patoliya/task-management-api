import type { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";
import { Error as MongooseError } from "mongoose";
import { ApiError } from "@/utils/api.error.js";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
		return res.status(err.statusCode).json({
			success: false,
			error: { message: err.message, details: err.details },
		});
	}

	if (err instanceof MongooseError.ValidationError) {
		const details = Object.values(err.errors).map((e) => e.message);
		return res.status(400).json({
			success: false,
			error: { message: 'Validation failed', details },
		});
	}

	if (err instanceof MongooseError.CastError) {
		return res.status(400).json({
			success: false,
			error: { message: `Invalid ${err.path}: ${err.value}` },
		});
	}
  logger.error(err.message || "Internal Server Error");
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
