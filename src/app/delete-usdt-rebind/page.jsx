'use client'

import React, { useState } from 'react'
import { ChevronLeft, Image as ImageIcon, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// Moved outside to prevent "Cannot create components during render" error
const UploadBox = ({ type, label, hasError, previews, handleFile }) => (
  <div className="space-y-2">
    <label className="text-[16px] text-[#334155] font-normal">
      {label}
      <span className="text-red-400 ml-0.5">*</span>
    </label>
    <div
      className={`relative w-[120px] h-[120px] bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center overflow-hidden border transition-all ${hasError ? 'border-red-100' : 'border-transparent'}`}
    >
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer z-10"
        onChange={(e) => handleFile(e, type)}
      />
      {previews[type] ? (
        <Image
          src={previews[type]}
          alt="preview"
          fill
          className="object-cover"
        />
      ) : (
        <div className="flex flex-col items-center text-slate-300">
          <ImageIcon size={35} strokeWidth={1.2} />
          <span className="text-[14px] mt-1">photo</span>
        </div>
      )}
    </div>
    {hasError && (
      <p className="text-[#FF0000] text-[14px] mt-1">
        Upload photo cannot be empty
      </p>
    )}
  </div>
)

export default function DeleteUSDTAddress() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [previews, setPreviews] = useState({
    selfieUsdt: null,
    selfieId: null,
    receipt: null
  })

  const [errors, setErrors] = useState({
    selfieUsdt: false,
    selfieId: false,
    receipt: false
  })

  const handleFile = (e, type) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreviews((prev) => ({ ...prev, [type]: url }))
    setErrors((prev) => ({ ...prev, [type]: false }))
  }

  const handleSubmit = () => {
    const newErrors = {
      selfieUsdt: !previews.selfieUsdt,
      selfieId: !previews.selfieId,
      receipt: !previews.receipt
    }
    setErrors(newErrors)

    if (Object.values(newErrors).some((v) => v)) return

    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="max-w-md mx-auto bg-[#f7f8ff] min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="flex items-center px-4 py-4 bg-[#F9FAFF] sticky top-0 z-20">
        <button onClick={() => router.back()} className="p-1">
          <ChevronLeft size={28} className="text-slate-600" strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center text-[19px] font-normal text-slate-800 pr-8 truncate">
          Delete Old USDT Addres...
        </h1>
      </header>

      <main className="p-6 space-y-6">
        <UploadBox
          type="selfieUsdt"
          label="Photo Selfie Hold USDT Address"
          hasError={errors.selfieUsdt}
          previews={previews}
          handleFile={handleFile}
        />

        <UploadBox
          type="selfieId"
          label="Photo Selfie Holding Identity Card"
          hasError={errors.selfieId}
          previews={previews}
          handleFile={handleFile}
        />

        <UploadBox
          type="receipt"
          label="Deposit Receipt Proof"
          hasError={errors.receipt}
          previews={previews}
          handleFile={handleFile}
        />

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
