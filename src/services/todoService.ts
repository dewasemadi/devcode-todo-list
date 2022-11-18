import api from './api'
import { TCreateTodo, TUpdateTodo } from './types'

export const getAllTodo = async (id: number) =>
  await api.get('/todo-items', { params: { activity_group_id: id } })

export const getTodo = async (id: number) => await api.get(`/todo-items/${id}`)

export const createTodo = async (data: TCreateTodo) => await api.post('/todo-items', data)

export const deleteTodo = async (id: number) => await api.delete(`/todo-items/${id}`)

export const updateTodo = async (data: TUpdateTodo) => {
  const { id, ...body } = data
  return await api.patch(`/todo-items/${id}`, body)
}
