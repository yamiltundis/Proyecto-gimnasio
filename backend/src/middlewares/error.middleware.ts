import { Request, Response, NextFunction } from "express";

export function handleError (err: any, req: Request, res: Response, next: NextFunction) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ❌ Error:`, err.message)

  if (err.details) {
    console.error("Detalles:", err.details);
  }
  console.error("Stack:", err.stack);


  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: 'Internal server error',
    message: err.message,
    timestamp: new Date().toISOString(),
    details: err.details || null
  })
}