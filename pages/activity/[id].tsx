import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Show from '../../src/components/Show'
import Layout from '../../src/components/Layout'
import Button from '../../src/components/Button'
import Spinner from '../../src/components/Spinner'
import { truncate } from '../../src/utils/formatter'
import { TUpdateActivity } from '../../src/services/types'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getActivity, updateActivity } from '../../src/services/activityService'

interface baseProps {
  data: any
  isLoading: boolean
}

function TitleAndAction({ data }: baseProps) {
  const [title, setTitle] = useState('')
  const [isEditTitle, setIsEditTitle] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()
  const mutation = useMutation(updateActivity)

  useEffect(() => {
    setTitle(data?.title)
  }, [data])

  const updateData = () => {
    const body: TUpdateActivity = {
      id: data?.id,
      title: title,
    }
    mutation.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries('todo')
      },
    })
  }

  const onClickBack = () => {
    router.back()
  }

  const onClickEdit = () => {
    setIsEditTitle(true)
  }

  const onClickSort = () => {
    alert('sort')
  }

  const onClickAdd = () => {
    alert('add')
  }

  const onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      setIsEditTitle(false)
      updateData()
    }
  }

  const onBlur = (e: any) => {
    e.preventDefault()
    setIsEditTitle(false)
    updateData()
  }

  const onChange = (e: any) => {
    e.preventDefault()
    setTitle(e.target.value)
  }

  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-5'>
        <Button type='icon' onClick={onClickBack} dataCy='todo-back-button'>
          <Image src='/back-icon.svg' width={15} height={15} alt='todo-back-button' />
        </Button>
        <Show when={isEditTitle}>
          <input
            autoFocus
            type='text'
            value={title}
            onBlur={onBlur}
            onChange={onChange}
            onKeyDown={onKeyDown}
            style={{ lineHeight: 'inherit' }}
            className='border-b border-black bg-transparent text-3xl font-bold outline-none'
          />
        </Show>
        <Show when={!isEditTitle}>
          <h1
            onClick={onClickEdit}
            data-cy='todo-title'
            className='text-3xl font-bold'
            style={{ lineHeight: 'unset' }}
          >
            {truncate(title, 30)}
          </h1>
          <Button dataCy='todo-title-edit-button' onClick={onClickEdit} type='icon'>
            <Image src='/edit-icon.svg' width={15} height={15} alt='todo-back-button' />
          </Button>
        </Show>
      </div>
      <div className='flex items-center gap-5'>
        <Show when={data && data?.todo_items.length !== 0}>
          <div className='sort-container'>
            <Button
              dataCy='todo-title-edit-button'
              onClick={onClickSort}
              type='icon'
              className='w-12 h-12'
            >
              <Image src='/sort-icon.svg' width={20} height={20} alt='todo-back-button' />
            </Button>
          </div>
        </Show>
        <Button dataCy='todo-add-button' onClick={onClickAdd} type='add' />
      </div>
    </div>
  )
}

function Content({ data, isLoading }: baseProps) {
  return (
    <div>
      <Show when={isLoading}>
        <Spinner />
      </Show>
      <Show when={data && data?.todo_items.length === 0}>
        <Image
          data-cy='todo-empty-state'
          src='/todo-empty-state.svg'
          width={541}
          height={413}
          alt='todo empty state'
          className='m-auto'
        />
      </Show>
    </div>
  )
}

export default function Activity() {
  const router = useRouter()
  const [id, setId] = useState(-1)

  const { data, isLoading, isError } = useQuery('todo', () => getActivity(id), {
    enabled: id !== -1,
  })

  useEffect(() => {
    if (!router.isReady) return
    const id = parseInt(router.query.id as string, 10)
    setId(id)
  }, [router.query.activity, router.isReady])

  return (
    <Layout
      titleAndAction={<TitleAndAction data={data} isLoading={isLoading} />}
      content={<Content data={data} isLoading={isLoading} />}
    />
  )
}
