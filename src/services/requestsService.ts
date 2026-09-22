import type { z } from "zod";
import type { RequestsRepository } from "../repos/requestsRepository";
import { requestSchema } from "../types/schemas";
import type { RequestsQuery } from "../types/types";
import { randomUUID } from "crypto";

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
}