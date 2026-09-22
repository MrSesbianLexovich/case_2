import z, { uuid } from "zod"

const equipmentTypesSchema = z.enum(['turbine', 'inverter', 'sensor', 'subbstation'])

export const equipmentLocationSchema = z.object({
    lat: z.number(),
    lon: z.number()
})

const equipmentStatusSchema = z.enum(['operational','maintenance', 'fault', 'decommissioned'])

export const equipmentSchema = z.object({
    name: z.string().min(3),
    type: equipmentTypesSchema,
    serialNumber: z.string(),
    location: equipmentLocationSchema,
    status: equipmentStatusSchema,
    installedAt :z.iso.datetime().refine(
        (value) => new Date(value).getTime() <= Date.now(),
        { message: 'installedAt не может быть в будущем' },
    ),
});

export const idSchema = z.object({
    id: z.uuid()
})

export const equipmentRepoSchema = equipmentSchema.extend({id: uuid()})

export const equipmentPartialSchema = equipmentSchema.partial()

export const equipmentQuerySchema = z.object({
    status: equipmentStatusSchema.optional(),
    type: equipmentTypesSchema.optional(),
    sortBy: z.enum(['name', 'createdAt', 'status', 'type']).default('createdAt'),
    order: z.enum(['asc', 'desc']).default('desc'),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20)
});

const requestPriorityTypes = z.enum(['low', 'medium', 'high', 'critical'])

const requestStatusTypes = z.enum(['new', 'in_progress', 'done', 'rejected'])

export const requestSchema = z.object({
    equipmentId: z.string(),
    title: z.string().min(5).max(120),
    description: z.string().max(2000),
    priority: requestPriorityTypes,
    plannedAt: z.iso.datetime().optional(),
})



export const requestRepoSchema = requestSchema.extend({
    id: uuid(), 
    status:requestStatusTypes, 
    createdAt: z.iso.datetime(), 
    updatedAt: z.iso.datetime()
})

export const requestQuerySchema = z.object({
    status: requestStatusTypes.optional(),
    priotiry: requestPriorityTypes.optional(),
    sortBy: z.enum(['title', 'createdAt', 'status', 'priority']).default('createdAt'),
    order: z.enum(['asc', 'desc']).default('desc'),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20)
})

export const requestPartialSchema = requestSchema.extend({id: uuid()}).partial()

export const requestRepoPartialSchema = requestRepoSchema.partial()

export const forecastSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
    generationtime_ms: z.number(),
    utc_offset_seconds: z.number(),
    timezone: z.string(),
    timezone_abbreviation: z.string(),
    elevation: z.number(),
    daily_units: z.object({
        time: z.string(),
        temperature_2m_min: z.string(),
        temperature_2m_max: z.string(),
        precipitation_sum: z.string(),
        wind_speed_10m_max: z.string(),
    }),
    daily: z.object({
        time: z.array(z.string()),
        temperature_2m_min: z.array(z.number()),
        temperature_2m_max: z.array(z.number()),
        precipitation_sum: z.array(z.number()),
        wind_speed_10m_max: z.array(z.number()),
    }),
})