'use client'

import React, { useState } from 'react'
import {
  ChevronLeft,
  Image as ImageIcon,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import apiClient from '@/lib/utils/apiClient'
import Image from 'next/image'

export default function Page() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    password: ''
  })

  const [depositProof, setDepositProof] = useState(null)
  const [identitySelfie, setIdentitySelfie] = useState(null)
  const [passbookSelfie, setPassbookSelfie] = useState(null)

  const [depositPreview, setDepositPreview] = useState(null)
  const [identityPreview, setIdentityPreview] = useState(null)
  const [passbookPreview, setPassbookPreview] = useState(null)

  const [errors, setErrors] = useState({})

  const handleBack = () => {
    router.back()
  }

  const handleFile = (e, type) => {
    const file = e.target.files[0]
    if (!file) return

    const url = URL.createObjectURL(file)

    if (type === 'deposit') {
      setDepositProof(file)
      setDepositPreview(url)
      setErrors((p) => ({ ...p, deposit: '' }))
    }

    if (type === 'identity') {
      setIdentitySelfie(file)
      setIdentityPreview(url)
      setErrors((p) => ({ ...p, identity: '' }))
    }

    if (type === 'passbook') {
      setPassbookSelfie(file)
      setPassbookPreview(url)
      setErrors((p) => ({ ...p, passbook: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.password.trim())
      newErrors.password = 'Please enter a new password'
    if (!depositProof) newErrors.deposit = 'Upload photo cannot be empty'
    if (!identitySelfie) newErrors.identity = 'Upload photo cannot be empty'
    if (!passbookSelfie) newErrors.passbook = 'Upload photo cannot be empty'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setLoading(true)

    try {
      const data = new FormData()

      data.append('password', formData.password)
      data.append('depositProof', depositProof)
      data.append('identitySelfie', identitySelfie)
      data.append('passbookSelfie', passbookSelfie)

      await apiClient.post('/customer-support/change-login-password', data)

      alert('Submitted successfully')
    } catch (e) {
      alert('Submission failed')
    } finally {
      setLoading(false)
    }
  }

  const UploadBox = ({ preview, type }) => (
    <div className="relative w-32 h-32 bg-white rounded-xl shadow-sm flex items-center justify-center overflow-hidden">
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
      <header className="flex items-center px-3 py-3">
        <button
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft size={28} className="text-slate-600" />
        </button>

        <h1 className="flex-1 text-center text-[20px] font-medium text-slate-800 pr-8">
          Change ID Login Password
        </h1>
      </header>

      <main className="px-5 py-4 space-y-6">
        <div className="space-y-2">
          <label className="text-[16px] text-slate-700">
            New Password<span className="text-red-500">*</span>
          </label>

          <div
            className={`flex items-center bg-white rounded-xl shadow-sm px-4 ${errors.password ? 'ring-1 ring-red-400' : ''}`}
          >
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Please enter a new password"
              className="w-full py-4 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400"
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-[16px] text-slate-700">
            Latest Deposit Receipt Proof<span className="text-red-500">*</span>
          </label>

          <UploadBox preview={depositPreview} type="deposit" />

          {errors.deposit && (
            <p className="text-red-500 text-sm">{errors.deposit}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-[16px] text-slate-700">
            Photo Selfie Hold Identity Card
            <span className="text-red-500">*</span>
          </label>

          <UploadBox preview={identityPreview} type="identity" />

          {errors.identity && (
            <p className="text-red-500 text-sm">{errors.identity}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-[16px] text-slate-700">
            Photo Selfie Hold Passbook Bank
            <span className="text-red-500">*</span>
          </label>

          <UploadBox preview={passbookPreview} type="passbook" />

          {errors.passbook && (
            <p className="text-red-500 text-sm">{errors.passbook}</p>
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
