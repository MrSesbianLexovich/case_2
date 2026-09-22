import { Router } from "express";
import { validate } from "../utils/validator";
import { asyncHandler } from "../utils/asyncHandler";
import { equipmentPartialSchema, equipmentQuerySchema, equipmentSchema, idSchema } from "../types/schemas";

const equipmentRouter = Router()

equipmentRouter.get("/",
    validate(equipmentQuerySchema,'query')    
)

equipmentRouter.post("/", 
    validate(equipmentSchema, 'body')
)

equipmentRouter.get("/:id",
    validate(idSchema, "params")
)

equipmentRouter.patch("/:id",
    validate(idSchema, 'params'),
    validate(equipmentPartialSchema,'body')
)

equipmentRouter.delete("/:id",
    validate(idSchema, 'params')
)

equipmentRouter.get("/:id/requests",
    validate(idSchema, 'params')
)

equipmentRouter.get("/:id/weather",
    validate(idSchema, 'params')
)

export default equipmentRouter