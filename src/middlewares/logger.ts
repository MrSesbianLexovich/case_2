import {type Request, type Response, type NextFunction } from "express"

export const logger = (req:Request, res:Response, next: NextFunction) => {
    const start = process.hrtime.bigint()
    res.on('finish', () => {
        const durationMs = Number(process.hrtime.bigint() - start) / 1e6
        console.log(`Method: ${req.method}, url: ${req.url}, Status: ${res.statusCode}, requestId: ${req.requestId}, duration: ${durationMs} Ms`)
    })
    next()
}