import api from './api'
import { TCreateActivity, TUpdateActivity } from './types'

export const getActivities = async () =>
  await api.get('/activity-groups', { params: { email: 'dewasemadi@apps.ipb.ac.id' } })

export const getActivity = async (id: number) => await api.get(`/activity-groups/${id}`)

export const createActivity = async (data: TCreateActivity) =>
  await api.post('/activity-groups', data)

export const deleteActivity = async (id: number) => await api.delete(`/activity-groups/${id}`)

export const updateActivity = async (data: TUpdateActivity) => {
  const { id, ...body } = data
  return await api.patch(`/activity-groups/${id}`, body)
}
