/**
 * Request Type
 */

export interface TCreateActivity {
  title: string
  email: string
}

export interface TUpdateActivity {
  id: number
  title: string
}

export interface TCreateTodo {
  title: string
  activity_group_id: number
  priority: 'very-high' | 'high' | 'normal' | 'low' | 'very-low'
}

export interface TUpdateTodo {
  id: number
  is_active: boolean
  priority: 'very-high' | 'high' | 'normal' | 'low' | 'very-low'
}

/**
 * Response Type
 */

interface TDate {
  created_at: string
  updated_at: string
  deleted_at?: string
}

export interface TGetActivities extends TDate {
  id: number
  email: string
  title: string
}

export interface TGetAllTodo extends TUpdateTodo, TDate {
  title: string
  activity_group_id: number
}
