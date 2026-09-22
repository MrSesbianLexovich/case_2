import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import type { ZodType } from "zod";
import { AppError } from "../types/error";

type Source = 'body' | 'query' | 'params'

export const validate = (schema: ZodType, source: Source = 'body') => 
(req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = schema.parse(req[source])
        next()
    } catch (e) {
        if (e instanceof ZodError) {
            const details = e.issues.map(issue => ({
                field: issue.path.join('.') || source,
                message: issue.message,
            }));
            throw new AppError('VALIDATION_ERROR','Ошибка валидации', 400, details)
        }
        next(e);
}}