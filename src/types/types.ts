import type { z } from "zod";
import { equipmentQuerySchema, equipmentSchema } from "./schemas";

export type EquipmentQuery = z.infer<typeof equipmentQuerySchema>;

export type EquipmentWithId = z.infer<typeof equipmentSchema> & {
    id: string
}


export type Database = {
    equipment: EquipmentWithId[]
}