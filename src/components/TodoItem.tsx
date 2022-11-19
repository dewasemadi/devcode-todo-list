import Image from 'next/image'

interface todoItemProps {
  dataCy: string
  title: string
  isActive: boolean
  priority: 'very-high' | 'high' | 'normal' | 'low' | 'very-low'
  onClickEdit: () => void
  onClickDelete: () => void
  onCheckboxChange: () => void
}

export default function TodoItem(props: todoItemProps) {
  const { dataCy, title, isActive, priority, onClickEdit, onClickDelete, onCheckboxChange } = props

  const getPriorityColor = () => {
    switch (priority) {
      case 'very-high':
        return 'priority-very-high'
      case 'high':
        return 'priority-high'
      case 'normal':
        return 'priority-normal'
      case 'low':
        return 'priority-low'
      case 'very-low':
        return 'priority-very-low'
    }
  }

  const getIsLineThrough = () => {
    return isActive ? 'text-lg' : 'text-lg todo-item-title-active '
  }

  return (
    <div data-cy={dataCy} className='todo-item-container'>
      <div className='flex items-center gap-6'>
        {/* checkbox */}
        <input
          data-cy='todo-item-checkbox'
          type='checkbox'
          className='checkbox'
          checked={!isActive}
          onChange={onCheckboxChange}
        />

        {/* priority indicator */}
        <div data-cy='todo-item-priority-indicator' className={getPriorityColor()} />

        {/* title */}
        <h1 data-cy='todo-item-title' className={getIsLineThrough()}>
          {title}
        </h1>

        {/* edit */}
        <button data-cy='todo-item-edit-button' type='button' onClick={onClickEdit}>
          <Image src='/edit-icon.svg' width={18} height={18} alt='edit icon' />
        </button>
      </div>
      <button data-cy='todo-item-delete-button' type='button' onClick={onClickDelete}>
        <Image src='/delete-icon.svg' width={24} height={24} alt='delete icon' />
      </button>
    </div>
  )
}
