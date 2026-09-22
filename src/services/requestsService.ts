import type { z } from "zod";
import type { RequestsRepository } from "../repos/requestsRepository";
import { requestSchema } from "../types/schemas";
import type { RequestsQuery } from "../types/types";
import { randomUUID } from "crypto";
import { AppError } from "../types/error";

export class RequestsService{
    constructor(private readonly RequestsRepository: RequestsRepository){}

    async getAll(query: RequestsQuery){
        return await this.RequestsRepository.getAll(query)
    }

    async add(body: z.infer<typeof requestSchema>){
        const date = new Date()
        const id = randomUUID()
        const request = {
            ...body,
            createdAt: date.toISOString(),
            updatedAt: date.toISOString(),
            id: id,
            status: "new" as const
        }
        return await this.RequestsRepository.add(request)
    }

    async getById(id: string){
        const request = await this.RequestsRepository.getById(id)
        if (request === undefined){
            throw new AppError("REQUEST_NOT_FOUND", `Запрос с id ${id} не найден`, 404)
        }
        return 
    }

}