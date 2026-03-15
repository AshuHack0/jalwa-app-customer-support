'use client'

import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { problems } from '@/lib/data/problems.js'

export default function ProblemList() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="max-w-md mx-auto bg-[#f7f8ff] min-h-screen flex flex-col">
      <header className="flex items-center px-4 py-2">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
        >
          <ChevronLeft
            size={40}
            className="text-slate-600 cursor-pointer group-active:scale-90 transition-transform"
            strokeWidth={1}
          />
        </button>

        <h2 className="flex-1 text-center text-xl font-medium text-slate-800 pr-10">
          Chatbot
        </h2>
      </header>

      <main className="p-2">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
          <h3 className="text-lg font-bold text-slate-700 mb-6 uppercase tracking-wide">
            DEPOSIT AND WITHDRAW PROBLEM
          </h3>

          <div className="bg-[#F6F7F9] rounded-2xl overflow-hidden">
            {problems.map((problem, index) => (
              <button
                key={index}
                className={`flex items-center w-full p-3 text-left transition-all hover:bg-slate-200/50 active:bg-slate-200 ${
                  index !== problems.length - 1 ? 'border-b border-white' : ''
                }`}
              >
                <span className="w-8 text-lg font-bold text-slate-800">
                  {index + 1}
                </span>

                <span className="text-[17px] text-slate-600 font-normal">
                  {problem}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
