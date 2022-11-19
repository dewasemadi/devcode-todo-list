import { useEffect } from 'react'

export const useOutside = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    // event when click outside of element
    const onClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback()
      }
    }

    // bind the event listener
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      // unbind the event listener on clean up
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [ref])
}
