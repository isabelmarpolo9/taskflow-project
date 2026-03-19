export interface Task {
  id: string
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  category: 'trabajo' | 'estudio' | 'personal'
  createdAt: string
  completedAt?: string
}

export type CreateTaskInput = Omit<Task, 'id' | 'createdAt' | 'completedAt'>
export type UpdateTaskInput = Partial<Omit<Task, 'id' | 'createdAt'>>