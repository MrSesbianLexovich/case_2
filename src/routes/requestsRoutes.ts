import { Router } from "express";
import { RequestsRepository } from "../repos/requestsRepository.ts";
import { RequestsService } from "../services/requestsService.ts";
import { RequestsController } from "../controllers/requestsController.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { validate } from "../utils/validator.ts";
import { idSchema, requestQuerySchema, requestSchema, requestStatusSchema } from "../types/schemas.ts";
import { EquipmentRepository } from "../repos/equipmentRepository.ts";

const requestsRouter = Router()

const requestsRepository = new RequestsRepository()
const equipmentRepository = new EquipmentRepository()
const requestsService = new RequestsService(requestsRepository, equipmentRepository)
const requestsController = new RequestsController(requestsService)

requestsRouter.get("/",
    validate(requestQuerySchema, 'query'),
    asyncHandler(requestsController.getAll)
)

requestsRouter.post("/",
    validate(requestSchema, 'body'),
    asyncHandler(requestsController.add)
)

requestsRouter.get("/:id",
    validate(idSchema, 'params'),
    asyncHandler(requestsController.getById)
)

requestsRouter.patch("/:id",
    validate(idSchema, 'params'),
    validate(requestSchema, "body"),
    asyncHandler(requestsController.patch)
)

requestsRouter.patch("/:id/status",
    validate(idSchema, 'params'),
    validate(requestStatusSchema,'body'),
    asyncHandler(requestsController.statusPatch)
)

requestsRouter.delete("/:id",
    validate(idSchema, 'params'),
    asyncHandler(requestsController.del)
)

export default requestsRouter