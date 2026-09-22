import type { z } from "zod";
import type { EquipmentRepository } from "../repos/equipmentRepository";
import { equipmentPartialSchema, equipmentSchema } from "../types/schemas";
import type { EquipmentQuery } from "../types/types";
import { randomUUID } from "crypto";
import { AppError } from "../types/error";

export class EquipmentService{
    constructor(private readonly EquipmentRepository: EquipmentRepository){}

    async getAll(query: EquipmentQuery){
        return await this.EquipmentRepository.getAll(query)
    }

    async add(body: z.infer<typeof equipmentSchema>){
        const id = randomUUID()
        const data = {
            id,
            ...body
        }
        const equipment = await this.EquipmentRepository.getBySerialNumber(body.serialNumber)
        if (equipment !== null){
            throw new AppError("EQUIPMENT_ALREADY_EXISTS", `Оборудование с серийным номером ${body.serialNumber} уже существует`, 409)
        }
        return await this.EquipmentRepository.add(data)
    }

    async getById(id: string){
        const equipment = await this.EquipmentRepository.getById(id)
        if (equipment === undefined){
            throw new AppError("EQUIPMENT_NOT_FOUND",`Оборудование с id ${id} не найдено`, 404)
        }
        return equipment
    }

    async patch(id: string, body: z.infer<typeof equipmentPartialSchema>){
        const patch = await this.EquipmentRepository.patch(id, body)
        if (patch === undefined){
            throw new AppError("EQUIPMENT_NOT_FOUND",`Оборудование с id ${id} не найдено`, 404)
        }
        return patch
    }
}