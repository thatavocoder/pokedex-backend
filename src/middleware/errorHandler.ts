import { Request, Response, NextFunction } from 'express';

// Custom error interface
export interface CustomError extends Error {
  statusCode?: number;
  code?: string | number;
  errors?: any;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      code: err.code,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
      ...(err.errors && { errors: err.errors })
    }
  });
};

export default errorHandler; 