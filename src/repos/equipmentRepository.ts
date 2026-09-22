import type { z } from "zod";
import { getDb, rewriteDb } from "../db";
import { equipmentRepoSchema } from "../types/schemas";
import type { EquipmentQuery } from "../types/types";

export class EquipmentRepository{

    async getAll(query: EquipmentQuery){
        const db = await getDb()

        let equipment = db.equipment

        if (query.status){
            equipment = equipment.filter(equipment => equipment.status == query.status)
        }

        if (query.type){
            equipment = equipment.filter(equipment => equipment.type === query.type)
        }

        const start = (query.page - 1) * query.limit
        const end = start + query.limit

        return equipment.slice(start, end)
    }

    async add(body: z.infer<typeof equipmentRepoSchema>){
        const db = await getDb()
    
        db.equipment.push(body)
        await rewriteDb(db)
        return body    
    }

    async getBySerialNumber(serialNumber: string){
        const db = await getDb()
        return db.equipment.find(equipment => equipment.serialNumber === serialNumber) || null
    }
}