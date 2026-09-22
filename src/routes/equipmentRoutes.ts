import { Router } from "express";
import { validate } from "../utils/validator.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { equipmentPartialSchema, equipmentQuerySchema, equipmentSchema, idSchema } from "../types/schemas.ts";
import { EquipmentRepository } from "../repos/equipmentRepository.ts";
import { EquipmentService } from "../services/equipmentService.ts";
import { EquipmentController } from "../controllers/equipmentController.ts";

const equipmentRouter = Router()

const equipmentRepository = new EquipmentRepository()
const equipmentService = new EquipmentService(equipmentRepository)
const equipmentController = new EquipmentController(equipmentService)

equipmentRouter.get("/",
    validate(equipmentQuerySchema,'query'),
    asyncHandler(equipmentController.getAll)    
)

equipmentRouter.post("/", 
    validate(equipmentSchema, 'body'),
    asyncHandler(equipmentController.add)
)

equipmentRouter.get("/:id",
    validate(idSchema, "params"),
    asyncHandler(equipmentController.getById)
)

equipmentRouter.patch("/:id",
    validate(idSchema, 'params'),
    validate(equipmentPartialSchema,'body'),
    asyncHandler(equipmentController.patch)
)

equipmentRouter.delete("/:id",
    validate(idSchema, 'params'),
    asyncHandler(equipmentController.del)
)

equipmentRouter.get("/:id/requests",
    validate(idSchema, 'params'),
    asyncHandler(equipmentController.getRequests)
)

equipmentRouter.get("/:id/weather",
    validate(idSchema, 'params'),
    asyncHandler(equipmentController.getWeather)
)

export default equipmentRouter