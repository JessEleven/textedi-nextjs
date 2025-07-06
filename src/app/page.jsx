import Nav from '@/components/nav'

export default function HomePage () {
  return (
    <main className='main-container'>
      <div className='px-5 md:px-0'>
        <Nav />
        <div className='grid grid-cols-[1fr_2fr]'>
          <h1 className='text-4xl font-bold'>Welcome to textedi</h1>
          <div>
            Content
          </div>
        </div>
      </div>
    </main>
  )
}
