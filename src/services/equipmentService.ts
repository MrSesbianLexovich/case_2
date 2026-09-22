import type { EquipmentRepository } from "../repos/equipmentRepository";

export class EquipmentService{
    constructor(private readonly EquipmentRepository: EquipmentRepository){}
}