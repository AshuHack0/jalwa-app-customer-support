'use client'

import React, { useState } from 'react'
import { ChevronLeft, FolderOpen, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function GameProblems() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(false)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  const handleSubmit = () => {
    if (!content.trim()) {
      setError(true)
      return
    }
    setError(false)
    setLoading(true)
    // Simulate API call
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="max-w-md mx-auto bg-[#F9FAFF] min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="flex items-center px-4 py-4 bg-[#F9FAFF] sticky top-0 z-20">
        <button onClick={() => router.back()} className="p-1">
          <ChevronLeft size={28} className="text-slate-600" strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center text-[19px] font-normal text-slate-800 pr-8">
          Game Problems
        </h1>
      </header>

      <main className="p-5 space-y-6">
        {/* Text Area Section */}
        <div className="space-y-2">
          <label className="text-[15px] text-[#334155] leading-relaxed">
            Explain the issue happen to you inside the game clear and detail
            <span className="text-red-400 ml-0.5">*</span>
          </label>
          <div className="relative bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] overflow-hidden">
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value.slice(0, 500))
                if (error) setError(false)
              }}
              placeholder="Please enter content"
              className="w-full h-40 p-4 bg-transparent outline-none text-[15px] placeholder:text-slate-300 resize-none"
            />
            <div className="absolute bottom-3 right-4 text-[13px] text-slate-400">
              {content.length}/500
            </div>
          </div>
          {error && (
            <p className="text-[#FF0000] text-[14px] mt-1">
              Please enter content
            </p>
          )}
        </div>

        {/* Upload Section */}
        <div className="space-y-3">
          <p className="text-[15px] text-[#334155]">
            Attach clear screenshot photo/video of the problem (optional)
          </p>
          <div className="relative w-[110px] h-[110px] bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center overflow-hidden border border-transparent">
            <input
              type="file"
              accept="image/*,video/*"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={handleFile}
            />
            {preview ? (
              <Image
                src={preview}
                alt="preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-slate-400">
                <FolderOpen
                  size={32}
                  strokeWidth={1.5}
                  className="text-slate-400"
                />
                <span className="text-[14px] mt-1">Upload</span>
              </div>
            )}
          </div>
        </div>

        {/* Confirm Button */}
        <div className="pt-10">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-[#00153D] text-white text-[17px] font-medium rounded-full shadow-lg active:scale-[0.98] transition-all flex justify-center items-center"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={22} />
            ) : (
              'Confirm'
            )}
          </button>
        </div>
      </main>
    </div>
  )
}
