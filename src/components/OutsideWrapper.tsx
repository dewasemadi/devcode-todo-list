import { useOutside } from '../hooks/useOutside'
import { useRef } from 'react'

interface outsideWrapperProps {
  children: React.ReactNode
  callback: () => void
}

export default function OutsideWrapper({ children, callback }: outsideWrapperProps) {
  const wrapperRef = useRef(null)
  useOutside(wrapperRef, callback)

  return <div ref={wrapperRef}>{children}</div>
}
