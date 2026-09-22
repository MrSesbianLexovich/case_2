import type { z } from "zod";
import type { EquipmentRepository } from "../repos/equipmentRepository";
import { equipmentSchema } from "../types/schemas";
import type { EquipmentQuery } from "../types/types";

export class EquipmentService{
    constructor(private readonly EquipmentRepository: EquipmentRepository){}

    async getAll(query: EquipmentQuery){
        return await this.EquipmentRepository.getAll(query)
    }
}