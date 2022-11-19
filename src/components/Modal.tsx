import Image from 'next/image'
import Button from './Button'
import Show from './Show'

interface modalProps {
  dataCy: string
  iconPath: string
  title: string
  description?: string
  isShowModal: boolean
  setIsShowModal: (value: boolean) => void
  onClickConfirm: () => void
}

export default function Modal(props: modalProps) {
  const { dataCy, iconPath, title, description, isShowModal } = props
  const { onClickConfirm, setIsShowModal } = props

  return (
    <Show when={isShowModal}>
      <div data-cy={dataCy} className='floating-container' onClick={() => setIsShowModal(false)}>
        <div className='relative container max-w-2xl' onClick={(e) => e.stopPropagation()}>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            <div className='flex px-16 py-10 flex-col gap-10 max-sm:px-8 max-sm:py-10'>
              {/* icon */}
              <Image
                data-cy='modal-delete-icon'
                src={iconPath}
                width={90}
                height={90}
                alt={title}
                style={{ margin: 'auto' }}
              />

              {/* title */}
              <div data-cy='modal-delete-title'>
                <p className='text-black text-lg leading-relaxed text-center'>{title}</p>
                <p className='text-black text-lg leading-relaxed font-bold text-center'>
                  &quot;{description}&quot;
                </p>
              </div>

              {/*action*/}
              <div className='flex gap-5 justify-center max-sm:flex-col-reverse'>
                <Button
                  dataCy='modal-delete-cancel-button'
                  type='cancel'
                  onClick={() => setIsShowModal(false)}
                >
                  Batal
                </Button>

                <Button dataCy='modal-delete-confirm-button' type='delete' onClick={onClickConfirm}>
                  Hapus
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </Show>
  )
}
