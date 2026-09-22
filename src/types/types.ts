import type { z } from "zod";
import { equipmentQuerySchema } from "./schemas";

export type EquipmentQuery = z.infer<typeof equipmentQuerySchema>;