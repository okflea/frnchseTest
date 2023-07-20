import Providers from './components/Providers'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Bharat Lab Franchisee Application',
  description: 'Bharat Lab Franchisee Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          {children}
        </Providers>
        <Toaster/>
      </body>
    </html>
  )
}
