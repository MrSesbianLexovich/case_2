import type { RequestsRepository } from "../repos/requestsRepository";
import type { RequestsQuery } from "../types/types";

export class RequestsService{
    constructor(private readonly RequestsRepository: RequestsRepository){}

    async getAll(query: RequestsQuery){
        return await this.RequestsRepository.getAll(query)
    }
}