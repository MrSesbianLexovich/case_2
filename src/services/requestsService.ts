import type { RequestsRepository } from "../repos/requestsRepository";

export class RequestsService{
    constructor(private readonly RequestsRepository: RequestsRepository){
        
    }
}