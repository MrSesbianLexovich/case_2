import type { NextFunction, Request, Response } from "express";
import { AppError } from "../types/error.ts";

export function errorHandler(error: AppError, req:Request, res:Response, next:NextFunction){
    if (error instanceof AppError) {
    return res.status(error.statusCode).json({
        errorCode: error.errorCode,
        message: error.message,
        details: error.details,
        requestId: req.requestId
    });
    }

    console.log(error)

    return res.status(500).json({
        errorCode: 'INTERNAL_SERVER_ERROR',
        message: 'Внутренняя ошибка сервера',
        requestId: req.requestId
    });
}
