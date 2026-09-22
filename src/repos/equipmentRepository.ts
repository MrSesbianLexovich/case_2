import type { z } from "zod";
import { getDb, rewriteDb } from "../db";
import { equipmentPartialSchema, equipmentRepoSchema } from "../types/schemas";
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

    async getById(id: string){
        const db = await getDb()
        return db.equipment.find(equipment => equipment.id === id)
    }

    async patch(id: string, body: z.infer<typeof equipmentPartialSchema>){
        const db = await getDb()
        const equipmentIndex = db.equipment.findIndex(equipment => equipment.id === id)
        if (equipmentIndex === -1){
            return undefined
        }
        const currentEquipment = db.equipment[equipmentIndex]
        if (!currentEquipment){
            return undefined
        }
        const updatedEquipment = {
            ...currentEquipment,
            ...body,
            id: currentEquipment.id
        }
        db.equipment[equipmentIndex] = updatedEquipment
        await rewriteDb(db)
        return updatedEquipment
    }

    async delete(id: string){
        const db = await getDb()
        const equipmentIndex = db.equipment.findIndex(equipment => equipment.id === id)

        db.equipment.splice(equipmentIndex, 1)
        await rewriteDb(db)
        return equipmentIndex
    }

    async getRequests(id: string){
        const db = await getDb()

        const requests = db.requests.filter(request => request.equipmentId === id)
        return requests
    }


}