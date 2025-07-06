import Image from 'next/image'

export default function HomePage () {
  return (
    <main className='flex flex-col items-center justify-center mt-10 text-xl'>
      <Image src='/logo.svg' alt='textedi logo' width={48} height={48} />
      <h1>textedi</h1>
      <p>A simple rich text editor.</p>
    </main>
  )
}
