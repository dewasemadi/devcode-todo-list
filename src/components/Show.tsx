interface showProps {
  when: boolean | undefined
  children: React.ReactNode
}

export function Show({ when, children }: showProps) {
  return <>{when && children}</>
}
