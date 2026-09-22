import type { z } from "zod";
import { REQUEST_TIMEOUT_MS, WEATHER_API_URL } from "../config/constanses";
import { AppError } from "../types/error";
import { equipmentLocationSchema, forecastSchema } from "../types/schemas";

async function fetchWithTimeout(url:URL, timeout = REQUEST_TIMEOUT_MS){
    const controller = new AbortController()

    const timeoutId = setTimeout(() => controller.abort(), timeout)

    let response;

    try{
        response = await fetch(url, {signal: controller.signal})
        clearTimeout(timeoutId)
    } catch(error:any){
        clearTimeout(timeoutId)
        if (error.name === "AbortError"){
            throw new AppError("REQUEST_TIMEOUT_ERROR","Превышен таймаут при обращении к внешнему сервису")
        }
        if (error.name === "TypeError"){
            throw new AppError("NO_CONNECTION","Нет подключения к сети")
        }
    }
    if (response === undefined){
        return undefined
    }

    if (response.ok != true){
        const status = response.status
        if (status >= 400){
            throw new AppError("WEATHER_API_ERROR","Возникла ошибка при обращении к внешнему сервису", status)
        }
    }

    return response.json()    
}

export async function getForecast(coordinates: z.infer<typeof equipmentLocationSchema>){
    let url = new URL(WEATHER_API_URL)
    url.pathname = '/v1/forecast'
    url.search = `latitude=${coordinates.lat}&longitude=${coordinates.lon}&daily=temperature_2m_min,temperature_2m_max,precipitation_sum,wind_speed_10m_max&forecast_days=1`

    const res = await fetchWithTimeout(url)
    return forecastSchema.parse(res)
    

}