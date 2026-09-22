import { getDb } from "../db";
import type { RequestsQuery } from "../types/types";

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
}