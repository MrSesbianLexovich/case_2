import express, { type  Express } from "express";
import {join} from 'path'
import { allowedOrigins, DATA_DIR, DATA_FILE, JSON_SIZE_LIMIT } from "./config/constanses.ts";
import {access, mkdir, writeFile} from "fs/promises"
import requestId from "./middlewares/requestId.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
import helmet from "helmet";
import router from "./routes/index.ts";
import {logger} from "./middlewares/logger.ts"
import type {NextFunction, Request, Response} from "express"
import cors from 'cors'
import { AppError } from "./types/error.ts";
import e from "cors";

export const app: Express = express()

export const path = join(DATA_DIR,DATA_FILE)

try{
    await access(path)
}catch{
    await mkdir(DATA_DIR)
    const dataBase = {
        "equipment": [],
        "maintenanceRequests": []
    }
    await writeFile(path, JSON.stringify(dataBase))
}


app.use(cors({
    origin(origin, callback) {
    
    if (!origin) {
        return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
        return callback(null, true);
    }

    return callback(new Error('CORS origin is not allowed'));
    },

    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'X-Request-Id'],
}));

app.use(helmet())
app.use(requestId)
app.use(logger)

app.use(express.json({limit:JSON_SIZE_LIMIT}))

app.use("/api", router)

app.use((req:Request, res:Response) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler)