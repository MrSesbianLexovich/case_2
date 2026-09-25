import { readFile, writeFile } from "fs/promises";
import { path } from "../app.ts";
import type { Database } from "../types/types.ts";

export async function getDb(){
    const db = await readFile(path, "utf-8")
    return JSON.parse(db) as Database
}

export async function rewriteDb(data: Database){
    return await writeFile(path, JSON.stringify(data))
}