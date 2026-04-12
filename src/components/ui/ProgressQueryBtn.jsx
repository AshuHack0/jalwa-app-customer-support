'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ProgressButton({ isAuth }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const handleNavigation = () => {
    const base = isAuth ? '/Progress-Query' : '/Progress-Query-UnAuth'
    router.push(token ? `${base}?token=${token}` : base)
  }

  return (
    <div className="flex justify-center w-full">
      <button
        onClick={handleNavigation}
        className={`
          w-[80%] 
          mt-8 mb-8 py-4 px-6 
          ${isAuth ? 'bg-[#00153D]' : 'bg-red-400'} 
          text-white text-xl font-medium 
          rounded-full 
          transition-all duration-300 
          active:scale-[0.95] 
          shadow-lg 
          flex justify-center items-center
        `}
      >
        Progress Query
      </button>
    </div>
  )
}
