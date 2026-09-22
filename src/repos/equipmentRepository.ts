import { getDb } from "../db";
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
}