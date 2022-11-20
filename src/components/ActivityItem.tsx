import Image from 'next/image'

interface activityItemProps {
  dataCy: string
  title: string
  createdAt: string
  onClickActivityCard: () => void
  onClickDelete: () => void
}

export function ActivityItem(props: activityItemProps) {
  const { dataCy, title, createdAt, onClickActivityCard, onClickDelete } = props

  return (
    <div className='activity-item-container p-5 flex flex-col h-full'>
      <div data-cy={dataCy} onClick={onClickActivityCard} className='pb-28 cursor-pointer'>
        <h1 data-cy='activity-item-title' className='activity-item-title'>
          {title}
        </h1>
      </div>

      <div className='flex justify-between mt-auto items-center'>
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
