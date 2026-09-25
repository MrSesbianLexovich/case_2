import type { RequestsService } from "../services/requestsService.ts";
import { requestQuerySchema } from "../types/schemas.ts";
import type { Request, Response } from 'express'

export class RequestsController{
    private readonly RequestsService: RequestsService;

    constructor(RequestsService: RequestsService){
        this.RequestsService = RequestsService;}

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

    del = async (req:Request, res:Response) => {
        const id = String(req.params.id)
        const del = await this.RequestsService.del(id)
        res.status(200).json({del})
    }
}