import type { z } from "zod";
import type { RequestsRepository } from "../repos/requestsRepository";
import { requestPartialSchema, requestSchema, requestStatusSchema } from "../types/schemas";
import type { RequestsQuery } from "../types/types";
import { randomUUID } from "crypto";
import { AppError } from "../types/error";
import type { EquipmentRepository } from "../repos/equipmentRepository";

export class RequestsService{
    constructor(
        private readonly RequestsRepository: RequestsRepository,
        private readonly EquipmentRepository: EquipmentRepository
    ){}

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

    async patch(id:string, body: z.infer<typeof requestPartialSchema>){
        const date = new Date()
        const updatedBody = {
            ...body,
            updatedAt: date.toISOString()
        }
        const currentRequest = await this.RequestsRepository.getById(id)

        if (currentRequest === undefined){
            throw new AppError("REQUEST_NOT_FOUND", `Запрос с id ${id} не найден`, 404)
        }

        const equipmentId = currentRequest.equipmentId

        const equipment = await this.EquipmentRepository.getById(equipmentId)
        if (equipment === undefined){
            throw new AppError("EQUIPMENT_NOT_FOUND", `Оборудование с id ${equipmentId} не найдено`, 404)
        }

        const patch = await this.RequestsRepository.patch(id, updatedBody)
        return patch
    }

    async statusPatch(id:string, body: z.infer<typeof requestStatusSchema>){
        const request = await this.RequestsRepository.getById(id)
        
        if (request === undefined){
            throw new AppError("REQUEST_NOT_FOUND", `Запрос с id ${id} не найден`, 404)
        }

        if (request.status === "done" || request.status === "rejected"){
            throw new AppError("UNABLE_TO_CHANGE_STATUS",`Невозможно изменение статуса запроса, запрос был выполнен или отклонен`,409)
        }

        if (request.status === "new" && (body.status === 'in_progress' || body.status === "rejected")){
            const statusPatch = this.RequestsRepository.statusPatch(id, body)
            return statusPatch
        }

        if (request.status === "in_progress" && (body.status === "done" || body.status === "rejected")){
            const statusPatch = this.RequestsRepository.statusPatch(id, body)
            return statusPatch
        }else{
            throw new AppError("UNABLE_TO_CHANGE_STATUS", `Невозможно сменить статус с ${request.status} на ${body.status}`, 409)
        }
    }

    async del(id: string){
        const request = await this.RequestsRepository.getById(id)

        if (request === undefined){
            throw new AppError("REQUEST_NOT_FOUND", `Запрос с id ${id} не найден`, 404)
        }

        const del = await this.RequestsRepository.del(id)
        return del
    }

}