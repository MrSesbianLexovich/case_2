import type { z } from "zod";
import { getDb, rewriteDb } from "../db/index.ts";
import { requestPartialSchema, requestRepoSchema, requestStatusSchema } from "../types/schemas.ts";
import type { RequestsQuery } from "../types/types.ts";

export class RequestsRepository{
    async getAll(query: RequestsQuery){
        const db = await getDb()
        
        let requests = db.requests

        if (query.status){
            requests = requests.filter(request => request.status === query.status)
        }

        if (query.priotiry){
            requests = requests.filter(request => request.priority === query.priotiry)
        }

        const start = (query.page - 1) * query.limit
        const end = start + query.limit

        return requests.slice(start, end)
    }

    async add(request: z.infer<typeof requestRepoSchema>){
        const db = await getDb()
        const equipmentid = db.equipment.findIndex(equipment => equipment.id === request.equipmentId)
        if (equipmentid === -1){
            return undefined
        }
        db.requests.push(request)
        await rewriteDb(db)
        return request
    }

    async getById(id: string){
        const db = await getDb()
        const request = db.requests.find(request => request.id === id)

        return request
    }

    async patch(id:string, body: z.infer<typeof requestPartialSchema>){
        const db = await getDb()

        const requestIndex = db.requests.findIndex(request => request.id === id)
        if (requestIndex === -1){
            return undefined
        }
        const currentRequest = db.requests[requestIndex]
        if (!currentRequest){
            return undefined
        }
        const updatedRequest = {
            ...currentRequest,
            ...body
        }
        db.requests[requestIndex] = updatedRequest
        return await rewriteDb(db)
    }

    async statusPatch(id: string, status: z.infer<typeof requestStatusSchema>){
        const db = await getDb()

        const date = new Date()

        const requestIndex = db.requests.findIndex(request => request.id === id)

        if (requestIndex === -1){
            return undefined
        }


        const currentRequest = db.requests[requestIndex]

        if (!currentRequest){
            return undefined
        }

        const updatedRequest = {...currentRequest, status: status.status, updatedAt: date.toISOString()}

        db.requests[requestIndex] = updatedRequest
        await rewriteDb(db)
        return updatedRequest
    }

    async del(id:string){
        const db = await getDb()
        const requestIndex = db.requests.findIndex(request => request.id === id)

        db.requests.splice(requestIndex, 1)
        await rewriteDb(db)
        return requestIndex
    }
}