import Head from 'next/head'

export default function Custom404() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <h1>Halaman tidak ditemukan</h1>
    </div>
  )
}
