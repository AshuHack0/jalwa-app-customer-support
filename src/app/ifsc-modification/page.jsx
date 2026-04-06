'use client'

import React, { useState } from 'react'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import apiClient from '@/lib/utils/apiClient'

export default function IFSCModification() {
  const router = useRouter()

  // Form State
  const [formData, setFormData] = useState({ ifsc: '', bankNumber: '' })
  // Error State
  const [errors, setErrors] = useState({})
  // Loading State
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Typing karte waqt error hatane ke liye
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    let newErrors = {}
    if (!formData.ifsc.trim()) newErrors.ifsc = 'Please enter IFSC'
    if (!formData.bankNumber.trim())
      newErrors.bankNumber = 'Please enter Bank Card Number'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleConfirm = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await apiClient.post('/customer-support/modify-ifsc', formData)
      console.log('Success:', response.data)
      alert('Modified Successfully!')
    } catch (error) {
      console.error('API Error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  const handleBack = () => {
    router.back() // Ye user ko pichle page par le jayega
  }

  return (
    <div className="max-w-md mx-auto bg-[#f7f8ff] min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center px-4 py-3 bg-[#f7f8ff]">
        <button
          onClick={handleBack} // Back logic integrated here
          className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
        >
          <ChevronLeft
            size={40}
            className="text-slate-600 cursor-pointer group-active:scale-90 transition-transform"
            strokeWidth={1}
          />
        </button>
        <h1 className="flex-1 text-center text-[20px] font-medium text-slate-800 pr-8">
          IFSC Modification
        </h1>
      </header>

      {/* Form Content */}
      <main className="p-6 space-y-6">
        {/* IFSC Code Input */}
        <div className="space-y-2">
          <label className="block text-[17px] text-slate-700">
            Correct IFSC Code<span className="text-red-500 ml-0.5">*</span>
          </label>
          <input
            type="text"
            name="ifsc"
            value={formData.ifsc}
            onChange={handleInputChange}
            placeholder="Please enter IFSC"
            className={`w-full p-5 bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border-none outline-none text-slate-600 transition-all ${errors.ifsc ? 'ring-1 ring-red-400' : ''}`}
          />
          {errors.ifsc && (
            <p className="text-red-500 text-sm ml-1 animate-in fade-in slide-in-from-top-1">
              {errors.ifsc}
            </p>
          )}
        </div>

        {/* Bank Number Input */}
        <div className="space-y-2">
          <label className="block text-[17px] text-slate-700">
            Bank number<span className="text-red-500 ml-0.5">*</span>
          </label>
          <input
            type="text"
            name="bankNumber"
            value={formData.bankNumber}
            onChange={handleInputChange}
            placeholder="Please enter Bank Card Number"
            className={`w-full p-5 bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border-none outline-none text-slate-600 transition-all ${errors.bankNumber ? 'ring-1 ring-red-400' : ''}`}
          />
          {errors.bankNumber && (
            <p className="text-red-500 text-sm ml-1 animate-in fade-in slide-in-from-top-1">
              {errors.bankNumber}
            </p>
          )}
        </div>

        {/* Confirm Button */}
        <div className="pt-4">
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="w-full py-4 bg-[#00153D] text-white text-xl font-medium rounded-full shadow-lg active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Confirm'}
          </button>
        </div>
      </main>
    </div>
  )
}
