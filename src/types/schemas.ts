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