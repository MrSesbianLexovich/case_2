import { Router } from "express";
import equipmentRouter from "./equipmentRoutes.ts";
import requestsRouter from "./requestsRoutes.ts";
import healthRouter from "./healthRoutes.ts";

const router = Router()

router.use('/equipment', equipmentRouter)
router.use('/requests', requestsRouter)
router.use('/health', healthRouter)

export default router