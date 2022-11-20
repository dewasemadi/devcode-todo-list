import { useRef } from 'react'
import { useOutside } from '@hooks'

interface outsideWrapperProps {
  children: React.ReactNode
  callback: () => void
}

export function OutsideWrapper({ children, callback }: outsideWrapperProps) {
  const wrapperRef = useRef(null)
  useOutside(wrapperRef, callback)

  return <div ref={wrapperRef}>{children}</div>
}
