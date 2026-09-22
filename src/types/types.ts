import type { z } from "zod";
import { equipmentQuerySchema, equipmentSchema, requestQuerySchema, requestRepoSchema } from "./schemas";

export type EquipmentQuery = z.infer<typeof equipmentQuerySchema>;

export type EquipmentWithId = z.infer<typeof equipmentSchema> & {
    id: string
}


export type RequestsQuery = z.infer<typeof requestQuerySchema>

export type RequestRepo = z.infer<typeof requestRepoSchema>

export type Database = {
    equipment: EquipmentWithId[],
    requests: RequestRepo[]
}