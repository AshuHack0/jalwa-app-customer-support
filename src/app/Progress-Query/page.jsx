'use client'

import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ProgressQuery() {
  const router = useRouter()

  return (
    <div className="max-w-md mx-auto bg-[#f7f8ff] min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="flex items-center px-4 py-4 bg-[#f7f8ff] sticky top-0 z-20">
        <button onClick={() => router.back()} className="p-1">
          <ChevronLeft size={28} className="text-slate-600" strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center text-[19px] font-normal text-slate-800 pr-8">
          Progress Query
        </h1>
      </header>

      {/* Main Content - Centered No Data State */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 -mt-20">
        <div className="relative w-64 h-64 opacity-80">
          <Image
            src="/no-data-image.png"
            alt="No Data"
            fill
            className="object-contain"
            priority
          />
        </div>

        <p className="text-[#A0AEC0] text-[16px] mt-2 font-light">No Data</p>
      </main>
    </div>
  )
}
