import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio').max(120, 'Máximo 120 caracteres'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  category: z.enum(['trabajo', 'estudio', 'personal']),
  completed: z.boolean().default(false),
})

export const updateTaskSchema = createTaskSchema.partial()

export type CreateTaskSchema = z.infer<typeof createTaskSchema>
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>