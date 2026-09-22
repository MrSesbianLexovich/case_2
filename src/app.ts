import express, { type  Express } from "express";
import {join} from 'path'
import { DATA_DIR, DATA_FILE } from "./config/constanses";
import {access, mkdir, writeFile} from "fs/promises"
import requestId from "./middlewares/requestId";
import { errorHandler } from "./middlewares/errorHandler";

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

app.use(requestId)


app.use(errorHandler)