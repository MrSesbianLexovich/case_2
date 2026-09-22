import { Router } from "express";
import equipmentRouter from "./equipmentRoutes.ts";
import requestsRouter from "./requestsRoutes.ts";

const router = Router()

router.use('/equipment', equipmentRouter)
router.use('/requests', requestsRouter)

export default router