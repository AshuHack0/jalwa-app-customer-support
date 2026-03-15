'use client'

import React, { useState } from 'react'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ProgressQueryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [account, setAccount] = useState('')

  const handleConfirm = () => {
    if (!account.trim()) return

    setLoading(true)
    // Simulating a search delay
    setTimeout(() => {
      setLoading(false)
      setHasSearched(true)
    }, 1500)
  }

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

      <main className="p-5 flex-1 flex flex-col">
        {!hasSearched ? (
          /* Search Input State */
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[16px] text-slate-700 ml-1">Account</label>
              <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] p-4">
                <input
                  type="text"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  placeholder="Please enter ID account / Username"
                  className="w-full bg-transparent outline-none text-[15px] placeholder:text-slate-300"
                />
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={loading || !account}
              className="w-full py-3.5 bg-red-500 text-white text-[18px] font-medium rounded-full shadow-lg active:scale-[0.98] transition-all flex justify-center items-center disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={22} />
              ) : (
                'Confirm'
              )}
            </button>
          </div>
        ) : (
          /* Centered No Data State */
          <div className="flex-1 flex flex-col items-center justify-center -mt-20 animate-in fade-in zoom-in duration-300">
            <div className="relative w-60 h-60 opacity-90">
              <Image
                src="/no-data-image.png"
                alt="No Data"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-[#A0AEC0] text-[16px] mt-2 font-light">
              No Data
            </p>

            <button
              onClick={() => setHasSearched(false)}
              className="mt-8 text-blue-500 text-sm font-medium"
            >
              Try another account
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
