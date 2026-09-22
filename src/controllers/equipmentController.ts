import type { EquipmentService } from "../services/equipmentService";
import type Request from 'express'

export class EquipmentController{
    constructor(private readonly EquipmentService: EquipmentService){}

    getAll = async (req:Request, res:Response) => {
        
    }
}