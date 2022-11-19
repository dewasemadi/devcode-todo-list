import Show from './Show'
import Image from 'next/image'
import OutsideWrapper from './OutsideWrapper'

interface TOption {
  icon: string
  title: string
  value: string
}

interface sortTodoProps {
  isShowDropdown: boolean
  sortOptions: Array<TOption>
  selectedSort: 'sort-latest' | 'sort-oldest' | 'sort-az' | 'sort-za' | 'sort-unfinished'
  setSelectedSort: (value: string) => void
  setIsShowSortTodo: (value: boolean) => void
}

export default function SortTodo(props: sortTodoProps) {
  const { isShowDropdown, sortOptions, selectedSort, setSelectedSort, setIsShowSortTodo } = props

  return (
    <Show when={isShowDropdown}>
      <div className='absolute w-60 dropdown-sort-container rounded-md'>
        <OutsideWrapper callback={() => setIsShowSortTodo(false)}>
          <ul
            data-cy='sort'
            className='z-50 divide-primary relative divide-y rounded-md bg-white border-gray-300 mt-0 flex flex-col border'
          >
            {sortOptions.map((option, idx) => (
              <li
                data-cy='sort-selection'
                key={idx}
                onClick={() => {
                  setSelectedSort(option.value)
                  setIsShowSortTodo(false)
                }}
                className={`h-12 px-5 py-2 flex cursor-pointer justify-between items-center border-gray-300 hover:bg-slate-100 ${
                  idx === 0 && 'rounded-t-md'
                } ${idx === sortOptions.length - 1 && 'rounded-b-md'}`}
              >
                <div className='flex gap-4 items-center'>
                  <Image src={option.icon} width={15} height={15} alt={option.icon} />
                  <p>{option.title}</p>
                </div>
                <Show when={option.value === selectedSort}>
                  <Image src='/check-icon.svg' width={15} height={15} alt='check icon' />
                </Show>
              </li>
            ))}
          </ul>
        </OutsideWrapper>
      </div>
    </Show>
  )
}
