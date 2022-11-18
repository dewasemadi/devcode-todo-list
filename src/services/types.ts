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
  priority: 'very-high' | 'high' | 'medium' | 'low' | 'very-low'
}

export interface TUpdateTodo {
  id: number
  is_active: boolean
  priority: 'very-high' | 'high' | 'medium' | 'low' | 'very-low'
}

/**
 * Response Type
 */

export interface TGetActivities {
  id: number
  email: string
  title: string
  created_at: string
  updated_at: string
  deleted_at?: string
}
