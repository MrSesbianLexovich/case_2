import type { NextFunction, Request, Response } from 'express';

export async function healthCheckController(req: Request, res: Response, next: NextFunction) {
    const body = {
        message: 'OK',
        timestamp: Date.now(),
        uptime: process.uptime(),
    }
    res.json(body);
}