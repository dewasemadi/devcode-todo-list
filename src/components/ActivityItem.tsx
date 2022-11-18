import Image from 'next/image'
import { truncate } from '../utils/formatter'

interface activityItemProps {
  title: string
  createdAt: string
  onClickTitle: () => void
  onClickDelete: () => void
}

export default function ActivityItem(props: activityItemProps) {
  const { title, createdAt, onClickTitle, onClickDelete } = props

  return (
    <div className='activity-item-container p-5 flex flex-col h-full gap-24'>
      <h1 data-cy='activity-item-title' onClick={onClickTitle} className='activity-item-title'>
        {title}
      </h1>
      <div className='flex justify-between mt-auto'>
        <p data-cy='activity-item-date' className='activity-item-date'>
          {createdAt}
        </p>
        <button data-cy='activity-item-delete-button' type='button' onClick={onClickDelete}>
          <Image src='/delete-icon.svg' width={24} height={24} alt='edit icon' />
        </button>
      </div>
    </div>
  )
}
