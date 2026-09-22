import { Router } from "express";
import equipmentRouter from "./equipmentRoutes.ts";

const router = Router()

router.use('/equipment', equipmentRouter)

export default router