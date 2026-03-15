'use client'

import React, { useState } from 'react'
import { ChevronLeft, Image as ImageIcon, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function DepositIssueForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({ userId: '', orderId: '' })
  const [receiptImage, setReceiptImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [errors, setErrors] = useState({})

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setReceiptImage(file)
      setPreview(URL.createObjectURL(file))
      if (errors.receipt) setErrors((prev) => ({ ...prev, receipt: '' }))
    }
  }

  const validate = () => {
    let newErrors = {}

    if (!formData.userId.trim()) newErrors.userId = 'Please enter User ID'
    if (!formData.orderId.trim()) newErrors.orderId = 'Please enter Order ID'
    if (!receiptImage) newErrors.receipt = 'Please upload deposit receipt'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleConfirm = async () => {
    if (!validate()) return

    setLoading(true)

    try {
      const data = new FormData()
      data.append('userId', formData.userId)
      data.append('orderId', formData.orderId)
      data.append('receipt', receiptImage)

      await axios.post('/api/deposit-report', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      alert('Request submitted successfully!')
    } catch (err) {
      console.error(err)
      alert('Submission failed.')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="max-w-md mx-auto bg-[#f7f8ff] min-h-screen flex flex-col font-sans">
      <header className="flex items-center px-4 py-3 bg-[#f7f8ff] sticky top-0 z-20">
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

        <h1 className="flex-1 text-center text-lg font-medium text-slate-800 pr-8">
          Deposit Issue
        </h1>
      </header>

      <main className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-slate-700 text-[16px]">
            User ID<span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="Please enter User ID"
            className={`w-full p-4 bg-white rounded-xl shadow-sm border-none outline-none focus:ring-1 focus:ring-blue-100 transition-all ${
              errors.userId ? 'ring-1 ring-red-400' : ''
            }`}
            onChange={(e) =>
              setFormData({ ...formData, userId: e.target.value })
            }
          />

          {errors.userId && (
            <p className="text-red-500 text-sm ml-1">{errors.userId}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-slate-700 text-[16px]">
            Order number<span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="Please enter Order ID"
            className={`w-full p-4 bg-white rounded-xl shadow-sm border-none outline-none focus:ring-1 focus:ring-blue-100 transition-all ${
              errors.orderId ? 'ring-1 ring-red-400' : ''
            }`}
            onChange={(e) =>
              setFormData({ ...formData, orderId: e.target.value })
            }
          />

          {errors.orderId && (
            <p className="text-red-500 text-sm ml-1">{errors.orderId}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-slate-700 text-[16px]">
            Deposit Receipt Proof<span className="text-red-500">*</span>
          </label>

          <div
            className={`relative w-32 h-32 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:bg-slate-50 transition-all ${
              errors.receipt ? 'border-red-300' : ''
            }`}
          >
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={handleFileChange}
            />

            {preview ? (
              <img
                src={preview}
                alt="Receipt"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-slate-400">
                <ImageIcon size={32} strokeWidth={1.5} />
                <span className="text-xs mt-1 font-medium">photo</span>
              </div>
            )}
          </div>

          {errors.receipt && (
            <p className="text-red-500 text-sm ml-1">{errors.receipt}</p>
          )}
        </div>

        <div className="pt-6">
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="w-full py-4 bg-[#00153D] text-white text-xl font-medium rounded-full shadow-lg active:scale-[0.97] transition-all flex justify-center items-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              'Confirm'
            )}
          </button>
        </div>
      </main>
    </div>
  )
}
