import type { EquipmentService } from "../services/equipmentService";
import type {Request,Response} from 'express'
import { equipmentQuerySchema } from "../types/schemas";

export class EquipmentController{
    constructor(private readonly EquipmentService: EquipmentService){}

    getAll = async (req:Request, res:Response) => {
        const query = equipmentQuerySchema.parse(req.query)
        const equipment = await this.EquipmentService.getAll(query)
        res.status(200).json({equipment})
    }

    add = async (req: Request, res:Response) => {
            const equipment = await this.EquipmentService.add(req.body)
            res.status(201).json({equipment})
    }

    getById = async (req: Request, res:Response) => {
        const id = String(req.params.id)
        const equipment = await this.EquipmentService.getById(id)
        res.status(200).json({equipment})
    }

    patch = async (req:Request, res:Response) => {
        const id = String(req.params.id)
        const patch = await this.EquipmentService.patch(id, req.body)
        res.status(201).json({patch}) 
    }

    del = async (req:Request, res:Response) => {
        const id = String(req.params.id)
        const del = await this.EquipmentService.delete(id)
        res.status(200).json({del})
    }
}