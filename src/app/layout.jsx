import { Roboto } from 'next/font/google'
import '../resources/globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap'
})

export const metadata = {
  title: 'textedi',
  description: 'textedi created with next.js',
  icons: [{ rel: 'icon', url: '/logo.svg' }]
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className={`${roboto.className} bg-[#181717] text-neutral-50`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
