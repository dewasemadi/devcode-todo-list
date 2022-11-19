import Image from 'next/image'
import Show from './Show'

interface alertProps {
  dataCy: string
  type?: 'success' | 'error'
  iconPath: string
  isShowAlert: boolean
  setIsShowAlert: (value: boolean) => void
  message: string
}

export default function Alert(props: alertProps) {
  const { dataCy, type = 'success', iconPath, message, isShowAlert, setIsShowAlert } = props

  return (
    <Show when={isShowAlert}>
      <div data-cy={dataCy} className='floating-container' onClick={() => setIsShowAlert(false)}>
        <div className='relative container max-w-xl' onClick={(e) => e.stopPropagation()}>
          {/* content */}
          <div className='alert-container'>
            <Image
              data-cy='modal-information-icon'
              src={iconPath}
              width={20}
              height={20}
              alt={iconPath}
            />
            <p data-cy='modal-information-title'>{message}</p>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </Show>
  )
}
