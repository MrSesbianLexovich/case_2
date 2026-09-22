import type { RequestsService } from "../services/requestsService";
import { requestQuerySchema } from "../types/schemas";
import type { Request, Response } from 'express'

export class RequestsController{
    constructor(private readonly RequestsService: RequestsService){}

    getAll = async (req:Request, res: Response) => {
        const query = requestQuerySchema.parse(req.query)
        const requests = await this.RequestsService.getAll(query)
        res.status(200).json({requests})
    }

    add = async (req:Request, res:Response) => {
        const {equipmentId, title, description, priority, plannedAt } = req.body
        const data = {
            equipmentId: equipmentId,
            title: title,
            description: description,
            priority: priority,
            plannedAt: plannedAt
        }
        const request = await this.RequestsService.add(data)
        
        res.status(201).json({request})
    }

    getById = async (req:Request, res:Response) => {
        const id = String(req.params.id)
        const request = await this.RequestsService.getById(id)
        res.status(200).json({request: request})
    }

    patch = async (req:Request, res:Response) => {
        const id = String(req.params.id)
        const patch = await this.RequestsService.patch(id,req.body)
        res.status(201).json({patch})
    }

    statusPatch = async (req:Request, res:Response) => {
        const id = String(req.params.id)
        const status = req.body
        const patch = await this.RequestsService.statusPatch(id, status)
        res.status(201).json({patch})
    }
}