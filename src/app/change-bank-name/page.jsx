'use client'

import React, { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Loader2, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { bankOptions } from '@/lib/data/bankOptions.js'
import apiClient from '@/lib/utils/apiClient'

export default function ChangeBankName() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showBankPicker, setShowBankPicker] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedInPicker, setSelectedInPicker] = useState('')

  const [formData, setFormData] = useState({
    bankName: '',
    bankNumber: ''
  })

  const [errors, setErrors] = useState({
    bankName: false,
    bankNumber: false
  })

  const filteredBanks = useMemo(() => {
    return bankOptions.filter((bank) =>
      bank.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const handleSubmit = async () => {
    const newErrors = {
      bankName: !formData.bankName,
      bankNumber: !formData.bankNumber
    }
    setErrors(newErrors)
    if (newErrors.bankName || newErrors.bankNumber) return

    setLoading(true)
    try {
      await apiClient.post('/customer-support/change-bank-name', formData)
      alert('Submitted successfully')
    } catch {
      alert('Submission failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-[#f7f8ff] min-h-screen flex flex-col font-sans relative overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center px-4 py-4 bg-[#f7f8ff] sticky top-0 z-20">
        <button onClick={() => router.back()} className="p-1">
          <ChevronLeft size={28} className="text-slate-600" strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center text-[19px] font-normal text-slate-800 pr-8">
          Change bank name
        </h1>
      </header>

      <main className="p-5 space-y-6">
        {/* Bank Name Field */}
        <div className="space-y-2">
          <label className="text-[16px] text-slate-700">
            Correct bank name<span className="text-red-400">*</span>
          </label>
          <div
            onClick={() => setShowBankPicker(true)}
            className="flex items-center justify-between bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-4 cursor-pointer active:bg-slate-50 transition-colors"
          >
            <span
              className={`text-[15px] ${formData.bankName ? 'text-slate-800' : 'text-slate-300'}`}
            >
              {formData.bankName || 'Please select a bank card name'}
            </span>
            <ChevronRight size={20} className="text-slate-300" />
          </div>
          {errors.bankName && (
            <p className="text-[#FF0000] text-[14px] mt-1">
              Please select a bank card name
            </p>
          )}
        </div>

        {/* Bank Number Field */}
        <div className="space-y-2">
          <label className="text-[16px] text-slate-700">
            Bank number<span className="text-red-400">*</span>
          </label>
          <div className="bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-4">
            <input
              type="text"
              value={formData.bankNumber}
              placeholder="Please enter Bank Card Number"
              className="w-full bg-transparent outline-none text-[15px] placeholder:text-slate-300"
              onChange={(e) => {
                setFormData({ ...formData, bankNumber: e.target.value })
                if (errors.bankNumber)
                  setErrors({ ...errors, bankNumber: false })
              }}
            />
          </div>
          {errors.bankNumber && (
            <p className="text-[#FF0000] text-[14px] mt-1">
              Please enter Bank Card Number
            </p>
          )}
        </div>

        <div className="pt-8">
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

      {/* Bank Picker UI from Screenshot */}
      {showBankPicker && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/20 animate-in fade-in duration-200">
          <div className="bg-white w-full animate-in slide-in-from-bottom duration-300 shadow-2xl">
            {/* Search Section */}
            <div className="p-4 border-b border-slate-100">
              <div className="relative flex items-center bg-white border border-slate-200 rounded-md px-3 py-2">
                <Search size={18} className="text-slate-400 mr-2" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Please enter search keywords"
                  className="w-full bg-transparent outline-none text-[15px] text-slate-600 placeholder:text-slate-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex justify-between items-center px-4 py-3 bg-white">
              <button
                onClick={() => setShowBankPicker(false)}
                className="text-slate-400 text-[16px]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedInPicker) {
                    setFormData({ ...formData, bankName: selectedInPicker })
                    setErrors({ ...errors, bankName: false })
                  }
                  setShowBankPicker(false)
                }}
                className="text-blue-500 text-[16px]"
              >
                Confirm
              </button>
            </div>

            {/* Bank List */}
            <div className="max-h-[300px] overflow-y-auto pb-10">
              {filteredBanks.map((bank) => (
                <div
                  key={bank}
                  onClick={() => setSelectedInPicker(bank)}
                  className={`py-4 text-center text-[17px] transition-colors cursor-pointer ${
                    selectedInPicker === bank
                      ? 'text-slate-900 font-medium bg-slate-50'
                      : 'text-slate-400 font-normal'
                  }`}
                >
                  {bank}
                </div>
              ))}
              {filteredBanks.length === 0 && (
                <div className="py-10 text-center text-slate-400">
                  No banks found
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
