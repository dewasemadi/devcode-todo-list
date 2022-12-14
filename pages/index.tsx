import Image from 'next/image'
import { useState } from 'react'
import { formatDate } from '@utils'
import { useRouter } from 'next/router'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { TGetActivities, TCreateActivity } from '@src/services/types'
import { getActivities, createActivity, deleteActivity } from '@services'
import { Show, Modal, Alert, Layout, Button, Spinner, ActivityItem } from '@components'

function TitleAndAction() {
  const queryClient = useQueryClient()
  const mutation = useMutation(createActivity)

  const onAddClicked = () => {
    const data: TCreateActivity = {
      title: 'New Activity',
      email: process.env.EMAIL,
    }
    mutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries('activities')
      },
    })
  }

  return (
    <div className='flex flex-col w-fit gap-3 sm:flex-row sm:w-full sm:justify-between'>
      <h1 data-cy='activity-title' className='text-3xl font-bold'>
        Activity
      </h1>
      <Button dataCy='activity-add-button' onClick={onAddClicked} type='add'></Button>
    </div>
  )
}

function Content() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowAlert, setIsShowAlert] = useState(false)
  const [deleteId, setDeleteId] = useState(0)
  const [deleteTitle, setDeleteTitle] = useState('')
  const mutation = useMutation(deleteActivity)
  const { data, isLoading } = useQuery('activities', getActivities)
  const isActivityEmpty = data && data?.data.length === 0

  const onClickDelete = () => {
    mutation.mutate(deleteId, {
      onSuccess: () => {
        queryClient.invalidateQueries('activities')
        setIsShowModal(false)
        setIsShowAlert(true)
        setTimeout(() => {
          setIsShowAlert(false)
        }, 2000) // close alert after 2s
      },
    })
  }

  const onShowModal = (id: number, title: string) => {
    setDeleteId(id)
    setDeleteTitle(title)
    setIsShowModal(true)
  }

  return (
    <div>
      <Show when={isLoading}>
        <Spinner />
      </Show>
      <Show when={isActivityEmpty}>
        <Image
          data-cy='activity-empty-state'
          src='/activity-empty-state.svg'
          width={700}
          height={470}
          alt='activity empty state'
          className='m-auto'
        />
      </Show>
      <Show when={!isActivityEmpty}>
        <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-4'>
          {data?.data.map((data: TGetActivities, idx: number) => (
            <ActivityItem
              dataCy='activity-item'
              key={idx}
              title={data?.title}
              createdAt={formatDate(data?.created_at)}
              onClickActivityCard={() => router.push(`/activity/${data?.id}`)}
              onClickDelete={() => onShowModal(data?.id, data?.title)}
            />
          ))}
        </div>
      </Show>
      <Modal
        dataCy='modal-delete'
        isShowModal={isShowModal}
        iconPath='/modal-delete-icon.svg'
        title='Apakah anda yakin menghapus activity'
        description={deleteTitle}
        setIsShowModal={setIsShowModal}
        onClickConfirm={() => onClickDelete()}
      />
      <Alert
        dataCy='modal-information'
        iconPath='/modal-information-icon.svg'
        message='Activity berhasil dihapus'
        isShowAlert={isShowAlert}
        setIsShowAlert={setIsShowAlert}
      />
    </div>
  )
}

export default function Home() {
  return <Layout titleAndAction={<TitleAndAction />} content={<Content />} />
}
