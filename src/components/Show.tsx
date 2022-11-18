interface showProps {
  when: boolean | undefined
  children: React.ReactNode
}

export default function Show({ when, children }: showProps) {
  return <>{when && children}</>
}
