import Image from 'next/image'

interface ButtonProps {
  dataCy: string
  children?: React.ReactNode
  onClick: () => void
  type?: 'base' | 'add' | 'delete' | 'cancel' | 'icon'
  disabled?: boolean
  className?: string
}

export function Button(props: ButtonProps) {
  const { dataCy, children, onClick, type = 'base', disabled, className } = props

  const buttonStyle = (): string => {
    switch (type) {
      case 'add':
        return 'add-button'
      case 'delete':
        return 'delete-button'
      case 'cancel':
        return 'cancel-button'
      case 'icon':
        return 'icon-button'
      default:
        return 'base-button'
    }
  }

  return (
    <button
      type='button'
      data-cy={dataCy}
      className={buttonStyle() + ' ' + className ?? ''}
      onClick={onClick}
      disabled={disabled ?? false}
    >
      {type === 'add' ? (
        <div className='flex justify-center gap-3'>
          <Image src='/add-icon.svg' width={24} height={24} alt='add icon' />
          <span>Tambah</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}
