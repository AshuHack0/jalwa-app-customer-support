import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata = {
  title: 'Jalwa App Customer Support',
  description:
    'Get help with your Jalwa App account, payments, and services. Our customer support team is here to assist you quickly and efficiently.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f7f8ff] text-black`}
      >
        <div className="max-w-md mx-auto">{children}</div>
      </body>
    </html>
  )
}
