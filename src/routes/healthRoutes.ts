import Router from "express";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { healthCheckController } from "../controllers/healthController.ts";
const healthRouter = Router()

healthRouter.get("/", asyncHandler(healthCheckController))

export default healthRouter