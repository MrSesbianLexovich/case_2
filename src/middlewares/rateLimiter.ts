import rateLimit from 'express-rate-limit'
import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from '../config/constanses.ts';

export const rateLimiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS,
    limit: RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
})