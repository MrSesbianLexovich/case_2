import { Router } from "express";
import equipmentRouter from "./equipmentRoutes";

const router = Router()

router.use('/equipment', equipmentRouter)

export default router