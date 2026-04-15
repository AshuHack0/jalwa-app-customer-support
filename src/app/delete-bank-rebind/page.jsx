'use client'

import React, { useState, Suspense } from 'react'
import { ChevronLeft, Image as ImageIcon, Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import apiClient from '@/lib/utils/apiClient'
import Image from 'next/image'

function DeleteBankForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({ bankAccount: '' })
  const [selfie, setSelfie] = useState(null)
  const [passbook, setPassbook] = useState(null)
  const [receipt, setReceipt] = useState(null)

  const [selfiePreview, setSelfiePreview] = useState(null)
  const [passbookPreview, setPassbookPreview] = useState(null)
  const [receiptPreview, setReceiptPreview] = useState(null)

  const [errors, setErrors] = useState({})

  const handleBack = () => {
    router.back()
  }

  const handleFile = (e, type) => {
    const file = e.target.files[0]
    if (!file) return

    const url = URL.createObjectURL(file)

    if (type === 'selfie') {
      setSelfie(file)
      setSelfiePreview(url)
      setErrors((p) => ({ ...p, selfie: '' }))
    }

    if (type === 'passbook') {
      setPassbook(file)
      setPassbookPreview(url)
      setErrors((p) => ({ ...p, passbook: '' }))
    }

    if (type === 'receipt') {
      setReceipt(file)
      setReceiptPreview(url)
      setErrors((p) => ({ ...p, receipt: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.bankAccount.trim())
      newErrors.bankAccount = 'Please enter Bank Card Number'

    if (!selfie) newErrors.selfie = 'Upload photo cannot be empty'
    if (!passbook) newErrors.passbook = 'Upload photo cannot be empty'
    if (!receipt) newErrors.receipt = 'Upload photo cannot be empty'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setLoading(true)

    try {
      const data = new FormData()

      data.append('bankAccount', formData.bankAccount)
      data.append('selfie', selfie)
      data.append('passbook', passbook)
      data.append('receipt', receipt)

      await apiClient.post('/customer-support/delete-withdraw-bank', data)

      alert('Submitted successfully')
      router.push(token ? `/?token=${token}` : '/')
    } catch (e) {
      alert('Submission failed')
    } finally {
      setLoading(false)
    }
  }

  const UploadBox = ({ preview, type }) => (
    <div className="relative w-36 h-36 bg-white rounded-xl shadow flex items-center justify-center overflow-hidden">
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer z-10"
        onChange={(e) => handleFile(e, type)}
      />

      {preview ? (
        <Image src={preview} alt="preview" fill className="object-cover" />
      ) : (
        <div className="flex flex-col items-center text-gray-400">
          <ImageIcon size={32} />
          <span className="text-sm mt-1">photo</span>
        </div>
      )}
    </div>
  )

  return (
    <div className="max-w-md mx-auto bg-[#f7f8ff] min-h-screen flex flex-col font-sans">
      <header className="flex items-center px-2 py-3 bg-[#f7f8ff]">
        <button
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft size={32} className="text-slate-600" />
        </button>
        <h1 className="flex-1 text-center text-[20px] font-medium text-slate-800 pr-8">
          Delete Withdraw Bank Account
        </h1>
      </header>

      <main className="px-5 py-4 space-y-6">
        <div className="space-y-2">
          <label className="text-[16px] text-slate-700">
            Bank account<span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="Please enter Bank Card Number"
            className={`w-full p-4 bg-white rounded-xl shadow-sm outline-none ${
              errors.bankAccount ? 'ring-1 ring-red-400' : ''
            }`}
            onChange={(e) =>
              setFormData({ ...formData, bankAccount: e.target.value })
            }
          />

          {errors.bankAccount && (
            <p className="text-red-500 text-sm">{errors.bankAccount}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-[16px] text-slate-700">
            Selfie holding your ID card<span className="text-red-500">*</span>
          </label>

          <UploadBox preview={selfiePreview} type="selfie" />

          {errors.selfie && (
            <p className="text-red-500 text-sm">{errors.selfie}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-[16px] text-slate-700">
            Old Passbook Bank<span className="text-red-500">*</span>
          </label>

          <UploadBox preview={passbookPreview} type="passbook" />

          {errors.passbook && (
            <p className="text-red-500 text-sm">{errors.passbook}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-[16px] text-slate-700">
            Latest Deposit Receipt Proof<span className="text-red-500">*</span>
          </label>

          <UploadBox preview={receiptPreview} type="receipt" />

          {errors.receipt && (
            <p className="text-red-500 text-sm">{errors.receipt}</p>
          )}
        </div>

        <div className="pt-8">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-[#00153D] text-white text-[18px] rounded-full flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Confirm'}
          </button>
        </div>
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense>
      <DeleteBankForm />
    </Suspense>
  )
}
