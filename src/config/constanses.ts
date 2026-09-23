import dotenv from 'dotenv'
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

export const filename = fileURLToPath(import.meta.url);

export const dirName = dirname(filename);

dotenv.config({ quiet: true, path: resolve(dirName, '.env') });

export const allowedOrigins = process.env.CORS_ORIGINS?.split(',') ?? []

export const PORT = String(process.env.PORT)

export const DATA_DIR = String(process.env.DATA_DIR)
export const DATA_FILE = String(process.env.DATA_FILE)


export const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS)
export const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX)
export const JSON_SIZE_LIMIT = String(process.env.JSON_SIZE_LIMIT)

export const REQUEST_TIMEOUT_MS = Number(process.env.REQUEST_TIMEOUT_MS)

export const WEATHER_API_URL = String(process.env.WEATHER_API_URL)

export const ALLOWED_PRECIPITATION = Number(process.env.ALLOWED_PRECIPITATION)
export const ALLOWED_WIND_SPEED = Number(process.env.ALLOWED_WIND_SPEED)