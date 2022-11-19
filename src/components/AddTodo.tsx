import Image from 'next/image'
import { useState, useEffect } from 'react'
import Button from './Button'
import Show from './Show'

interface TOption {
  color: string
  title: string
  value: string
  dataCy: string
}

interface addTodoProps {
  modalTitle: string
  addTitle: string
  confirmText: string
  isShowModal: boolean
  selectedPriority: 'very-high' | 'high' | 'normal' | 'low' | 'very-low'
  priorityOptions: Array<TOption>
  setSelectedPriority: (value: string) => void
  onAddTitleChange: (e: any) => void
  setIsShowModal: (value: boolean) => void
  onClickConfirm: () => void
}

export default function AddTodo(props: addTodoProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [previewSelectedTitle, setPreviewSelectedTitle] = useState<string | undefined>('')
  const [previewSelectedColor, setPreviewSelectedColor] = useState<string | undefined>('')
  const { modalTitle, addTitle, confirmText, priorityOptions, isShowModal } = props
  const { selectedPriority, setIsShowModal, onAddTitleChange, onClickConfirm } = props
  const { setSelectedPriority } = props

  const onClickPriority = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const selected = priorityOptions.find((item) => item.value === selectedPriority)
    setPreviewSelectedTitle(selected?.title)
    setPreviewSelectedColor(selected?.color)
  }, [selectedPriority])

  return (
    <Show when={isShowModal}>
      <div data-cy='modal-add' className='floating-container' onClick={() => setIsShowModal(false)}>
        <div className='relative max-w-4xl container' onClick={(e) => e.stopPropagation()}>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex justify-between p-5 border-b border-solid border-slate-200 rounded-t items-center'>
              <h3 data-cy='modal-add-title' className='text-lg font-semibold'>
                {modalTitle}
              </h3>
              <Button
                dataCy='modal-add-close-button'
                type='icon'
                onClick={() => setIsShowModal(false)}
              >
                <Image src='/close-icon.svg' width={15} height={15} alt={modalTitle} />
              </Button>
            </div>
            {/*body*/}
            <div className='relative p-6 flex flex-col gap-8'>
              <div>
                <h6 data-cy='modal-add-name-title' className='text-md font-medium'>
                  NAMA LIST ITEM
                </h6>

                <input
                  data-cy='modal-add-name-input'
                  value={addTitle}
                  onChange={(e) => onAddTitleChange(e)}
                  type='text'
                  placeholder='Tambahkan nama List Item'
                  className='mt-2 h-12 w-full p-2 bg-inherit border-x border-y border-solid border-gray-300 rounded-md text-md text-black focus:outline-none focus:border-blue-300'
                />
              </div>

              <div>
                <h6 data-cy='modal-add-priority-title' className='text-md font-medium'>
                  PRIORITY
                </h6>
                <div className='mt-2'>
                  {/* dropdown */}
                  <button
                    onClick={onClickPriority}
                    className={isOpen ? 'button-dropdown-open' : 'button-dropdown'}
                  >
                    <Show when={isOpen}>
                      <div className='flex gap-2 justify-center items-center'>
                        <span>Pilih priority</span>
                      </div>
                    </Show>
                    <Show when={!isOpen}>
                      <div className='flex gap-2 justify-center items-center'>
                        <div
                          className='w-3 h-3 rounded-full'
                          style={{ background: previewSelectedColor }}
                        ></div>
                        <span>{previewSelectedTitle}</span>
                      </div>
                    </Show>
                    <Image
                      width={15}
                      height={15}
                      alt={modalTitle}
                      src={isOpen ? '/chevron-up-icon.svg' : '/chevron-down-icon.svg'}
                    />
                  </button>
                  {/* dropdown list */}
                  <Show when={isOpen}>
                    <div
                      data-cy='modal-add-priority-dropdown'
                      className='absolute w-52 max-sm:w-full dropdown-list-container'
                    >
                      <ul className='divide-primary relative divide-y rounded-md bg-white border-gray-300 mt-0 flex flex-col rounded-t-none border border-t-0'>
                        {priorityOptions.map((option, idx) => (
                          <li
                            key={idx}
                            data-cy={option.dataCy}
                            onClick={() => {
                              setSelectedPriority(option.value)
                              setIsOpen(false)
                            }}
                            className='h-12 px-3 py-2 flex cursor-pointer justify-between items-center border-gray-300'
                          >
                            <div className='flex gap-4 items-center'>
                              <div
                                className='w-3 h-3 rounded-full'
                                style={{ background: option.color }}
                              ></div>
                              <p>{option.title}</p>
                            </div>
                            <Show when={option.value === selectedPriority}>
                              <Image
                                src='/check-icon.svg'
                                width={15}
                                height={15}
                                alt='check icon'
                              />
                            </Show>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Show>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
              <Button
                type='base'
                dataCy='modal-add-save-button'
                onClick={onClickConfirm}
                disabled={addTitle === ''}
              >
                {confirmText}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </Show>
  )
}
