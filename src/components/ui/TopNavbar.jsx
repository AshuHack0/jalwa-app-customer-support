'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Home } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function TopNavbar() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const homeHref = token ? `/?token=${token}` : '/'

  return (
    <nav className="flex items-center justify-between w-full px-8 py-2 bg-[#f7f8ff]">
      <div className="flex items-center">
        <Link
          href={homeHref}
          className="p-2 transition-all hover:bg-blue-100/40 rounded-full"
        >
          <Home size={24} strokeWidth={1.6} />
        </Link>
      </div>

      <div className="flex-1 text-center">
        <h1 className="text-md md:text-2xl font-semibold text-black">
          Self Service Center
        </h1>
      </div>

      <div className="flex items-center gap-3 px-4 py-2 cursor-pointer transition-all hover:bg-blue-100/40 rounded-full">
        <Image
          src="/Main-Navbar-Image-England.png"
          alt="USA Flag"
          width={30}
          height={30}
          className="rounded-full object-cover border border-slate-200"
        />
        <span className="text-lg font-medium text-slate-700">English</span>
      </div>
    </nav>
  )
}
