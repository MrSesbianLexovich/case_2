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
}