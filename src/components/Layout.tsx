import Header from './Header'

interface LayoutProps {
  titleAndAction: React.ReactNode
  content: React.ReactNode
}

export default function Layout({ titleAndAction, content }: LayoutProps) {
  return (
    <div>
      <Header />
      <div className='container grid gap-10'>
        <div />
        {titleAndAction}
        {content}
        <div />
      </div>
    </div>
  )
}
