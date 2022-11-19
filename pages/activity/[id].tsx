import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Modal from '../../src/components/Modal'
import Alert from '../../src/components/Alert'
import Show from '../../src/components/Show'
import Layout from '../../src/components/Layout'
import Button from '../../src/components/Button'
import Spinner from '../../src/components/Spinner'
import { truncate } from '../../src/utils/formatter'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { createTodo, deleteTodo, updateTodo } from '../../src/services/todoService'
import { TUpdateActivity, TCreateTodo, TGetAllTodo, TUpdateTodo } from '../../src/services/types'
import { getActivity, updateActivity } from '../../src/services/activityService'
import TodoItem from '../../src/components/TodoItem'
import AddAndEditTodo from '../../src/components/AddAndEditTodo'

interface baseProps {
  data: any
  isLoading: boolean
}

const priorityOptions = [
  { color: '#ed4c5c', title: 'Very High', value: 'very-high' },
  { color: '#ffce31', title: 'High', value: 'high' },
  { color: '#00A790', title: 'Normal', value: 'normal' },
  { color: '#43c4e3', title: 'Low', value: 'low' },
  { color: '#b01aff', title: 'Very Low', value: 'very-low' },
]

function TitleAndAction({ data }: baseProps) {
  const [todoTitle, setTodoTitle] = useState('')
  const [addTitle, setAddTitle] = useState('')
  const [selectedPriority, setSelectedPriority] = useState<any>('very-high')
  const [isShowModal, setIsShowModal] = useState(false)
  const [isEditTitle, setIsEditTitle] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()
  const activityMutation = useMutation(updateActivity)
  const todoMutation = useMutation(createTodo)

  useEffect(() => {
    setTodoTitle(data?.title)
  }, [data])

  const updateData = () => {
    const body: TUpdateActivity = {
      id: data?.id,
      title: todoTitle,
    }
    activityMutation.mutate(body, {
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

  const onShowModal = () => {
    setIsShowModal(true)
    setAddTitle('')
    setSelectedPriority('very-high')
  }

  const onClickConfirm = () => {
    const body: TCreateTodo = {
      title: addTitle,
      activity_group_id: data?.id,
      priority: selectedPriority,
    }
    todoMutation.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries('todo')
        setIsShowModal(false)
      },
    })
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

  const onTodoTitleChange = (e: any) => {
    e.preventDefault()
    setTodoTitle(e.target.value)
  }

  const onAddTitleChange = (e: any) => {
    e.preventDefault()
    setAddTitle(e.target.value)
  }

  return (
    <div className='flex flex-col sm:flex-row max-sm:gap-8 justify-between items-start sm:items-center'>
      <div className='flex items-center gap-5 max-sm:w-full'>
        <Button type='icon' onClick={onClickBack} dataCy='todo-back-button'>
          <Image src='/back-icon.svg' width={15} height={15} alt='todo-back-button' />
        </Button>
        <Show when={isEditTitle}>
          <input
            autoFocus
            type='text'
            value={todoTitle}
            onBlur={onBlur}
            onChange={onTodoTitleChange}
            onKeyDown={onKeyDown}
            style={{ lineHeight: 'inherit' }}
            className='border-b border-gray-400 bg-transparent text-3xl font-bold outline-none'
          />
        </Show>
        <Show when={!isEditTitle}>
          <h1
            onClick={onClickEdit}
            data-cy='todo-title'
            className='text-3xl font-bold'
            style={{ lineHeight: 'unset' }}
          >
            {truncate(todoTitle, 30)}
          </h1>
          <Button dataCy='todo-title-edit-button' onClick={onClickEdit} type='icon'>
            <Image src='/edit-icon.svg' width={18} height={18} alt='todo-back-button' />
          </Button>
        </Show>
      </div>
      <div className='flex items-center gap-5 max-sm:w-full max-sm:justify-end'>
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
        <Button dataCy='todo-add-button' onClick={onShowModal} type='add' />
      </div>
      {/* modal */}
      <AddAndEditTodo
        modalTitle='Tambah List Item'
        addTitle={addTitle}
        confirmText='Simpan'
        isShowModal={isShowModal}
        onAddTitleChange={onAddTitleChange}
        setIsShowModal={setIsShowModal}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        priorityOptions={priorityOptions}
        onClickConfirm={onClickConfirm}
      />
    </div>
  )
}

function Content({ data, isLoading }: baseProps) {
  const isTodoEmpty = data && data?.todo_items.length === 0
  const queryClient = useQueryClient()
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [isShowDeleteAlert, setIsShowDeleteAlert] = useState(false)
  const [selectedTodoId, setSelectedTodoId] = useState(0)
  const [selectedEditTitle, setSelectedEditTitle] = useState('')
  const [selectedPriority, setSelectedPriority] = useState<any>('very-high')
  const [deleteId, setDeleteId] = useState(0)
  const [deleteTitle, setDeleteTitle] = useState('')
  const updateTodoMutation = useMutation(updateTodo)
  const deleteTodoMutation = useMutation(deleteTodo)

  const onCheckboxChange = (data: TGetAllTodo) => {
    const body: TUpdateTodo = {
      id: data?.id,
      is_active: !data?.is_active,
      priority: data?.priority,
    }
    updateTodoMutation.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries('todo')
      },
    })
  }

  const onClickEdit = (data: TGetAllTodo) => {
    setIsShowEditModal(true)
    setSelectedTodoId(data?.id)
    setSelectedEditTitle(data?.title)
    setSelectedPriority(data?.priority)
  }

  const onClickConfirm = () => {
    const body = {
      id: selectedTodoId,
      title: selectedEditTitle,
      priority: selectedPriority,
    }
    updateTodoMutation.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries('todo')
        setIsShowEditModal(false)
      },
    })
  }

  const onClickDelete = () => {
    deleteTodoMutation.mutate(deleteId, {
      onSuccess: () => {
        queryClient.invalidateQueries('todo')
        setIsShowDeleteModal(false)
        setIsShowDeleteAlert(true)
        setTimeout(() => {
          setIsShowDeleteAlert(false)
        }, 2000) // close alert after 2s
      },
    })
  }

  const onSelectedEditTitleChange = (e: any) => {
    e.preventDefault()
    setSelectedEditTitle(e.target.value)
  }

  const onShowModal = (id: number, title: string) => {
    setDeleteId(id)
    setDeleteTitle(title)
    setIsShowDeleteModal(true)
  }

  return (
    <div>
      <Show when={isLoading}>
        <Spinner />
      </Show>
      <Show when={isTodoEmpty}>
        <Image
          data-cy='todo-empty-state'
          src='/todo-empty-state.svg'
          width={541}
          height={413}
          alt='todo empty state'
          className='m-auto'
        />
      </Show>
      <Show when={!isTodoEmpty}>
        <div className='grid gap-3'>
          {data?.todo_items.map((data: TGetAllTodo, idx: number) => (
            <TodoItem
              dataCy='todo-item'
              key={idx}
              title={data?.title}
              priority={data?.priority}
              isActive={data?.is_active}
              onCheckboxChange={() => onCheckboxChange(data)}
              onClickEdit={() => onClickEdit(data)}
              onClickDelete={() => onShowModal(data?.id, data?.title)}
            />
          ))}
        </div>
      </Show>
      <Modal
        dataCy='modal-delete'
        isShowModal={isShowDeleteModal}
        iconPath='/modal-delete-icon.svg'
        title='Apakah anda yakin menghapus list item'
        description={deleteTitle}
        setIsShowModal={setIsShowDeleteModal}
        onClickConfirm={() => onClickDelete()}
      />
      <Alert
        dataCy='modal-information'
        iconPath='/modal-information-icon.svg'
        message='Todo berhasil dihapus'
        isShowAlert={isShowDeleteAlert}
        setIsShowAlert={setIsShowDeleteAlert}
      />
      {/* modal */}
      <AddAndEditTodo
        modalTitle='Edit Item'
        addTitle={selectedEditTitle}
        confirmText='Simpan'
        isShowModal={isShowEditModal}
        onAddTitleChange={onSelectedEditTitleChange}
        setIsShowModal={setIsShowEditModal}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        priorityOptions={priorityOptions}
        onClickConfirm={onClickConfirm}
      />
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.activity, router.isReady])

  return (
    <Layout
      titleAndAction={<TitleAndAction data={data} isLoading={isLoading} />}
      content={<Content data={data} isLoading={isLoading} />}
    />
  )
}
