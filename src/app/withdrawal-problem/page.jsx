'use client'

import React, { useState } from 'react'
import {
  ChevronLeft,
  FileText,
  Loader2,
  X,
  Image as ImageIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import apiClient from '@/lib/utils/apiClient'

export default function BankStatementForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({ userId: '', orderId: '' })
  const [pdfFile, setPdfFile] = useState(null)
  const [errors, setErrors] = useState({})

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setPdfFile(file)
      if (errors.pdf) setErrors((prev) => ({ ...prev, pdf: '' }))
    } else if (file) {
      alert('Please upload a valid PDF file.')
    }
  }

  const validate = () => {
    let newErrors = {}
    if (!formData.userId.trim()) newErrors.userId = 'Please enter User ID'
    if (!formData.orderId.trim()) newErrors.orderId = 'Please enter Order ID'
    if (!pdfFile) newErrors.pdf = 'Please upload PDF Bank Statement'

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
      data.append('bankStatement', pdfFile)

      await apiClient.post('/customer-support/submit-statement', data)

      alert('Statement submitted successfully!')
    } catch (err) {
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
      <header className="flex items-center px-2 py-4 bg-[#f7f8ff] sticky top-0 z-20">
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

        <h1 className="flex-1 text-center text-[18px] font-medium text-slate-800 pr-10">
          Bank Statement
        </h1>
      </header>

      <main className="p-5 space-y-5">
        <div className="space-y-2">
          <label className="text-slate-600 text-[15px] ml-1">
            User ID<span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="Please enter User ID"
            className={`w-full p-4 bg-white rounded-2xl shadow-sm border-none outline-none text-[15px] placeholder:text-slate-300 transition-all ${
              errors.userId ? 'ring-1 ring-red-400' : ''
            }`}
            onChange={(e) =>
              setFormData({ ...formData, userId: e.target.value })
            }
          />

          {errors.userId && (
            <p className="text-red-500 text-xs ml-2">{errors.userId}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-slate-600 text-[15px] ml-1">
            Order number<span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="Please enter Order ID"
            className={`w-full p-4 bg-white rounded-2xl shadow-sm border-none outline-none text-[15px] placeholder:text-slate-300 transition-all ${
              errors.orderId ? 'ring-1 ring-red-400' : ''
            }`}
            onChange={(e) =>
              setFormData({ ...formData, orderId: e.target.value })
            }
          />

          {errors.orderId && (
            <p className="text-red-500 text-sm ml-2">{errors.orderId}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-slate-600 text-[15px] ml-1">
            Submit PDF Bank Statement<span className="text-red-500">*</span>
          </label>

          {!pdfFile ? (
            <div
              className={`relative w-28 h-28 bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-all border border-transparent ${
                errors.pdf ? 'border-red-200' : ''
              }`}
            >
              <input
                type="file"
                accept=".pdf"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                onChange={handleFileChange}
              />

              <ImageIcon
                size={35}
                className="text-slate-300"
                strokeWidth={1.2}
              />

              <span className="text-[13px] text-slate-400 mt-1">photo</span>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-blue-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center gap-3 overflow-hidden">
                <FileText size={24} className="text-blue-500" />

                <span className="text-sm font-medium text-slate-600 truncate max-w-[150px]">
                  {pdfFile.name}
                </span>
              </div>

              <button
                onClick={() => setPdfFile(null)}
                className="p-1 hover:bg-slate-100 rounded-full"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>
          )}

          {errors.pdf && (
            <p className="text-red-500 text-xs ml-2">{errors.pdf}</p>
          )}
        </div>

        <div className="pt-8">
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="w-full py-3.5 bg-[#00153D] text-white text-[18px] font-medium rounded-full shadow-lg active:scale-[0.98] transition-all flex justify-center items-center gap-2"
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
