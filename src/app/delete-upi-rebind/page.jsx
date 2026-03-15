'use client'

import React, { useState } from 'react'
import { ChevronLeft, Image as ImageIcon, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({ upi: '' })

  const [registeredUpi, setRegisteredUpi] = useState(null)
  const [depositProof, setDepositProof] = useState(null)
  const [oldUpiSelfie, setOldUpiSelfie] = useState(null)
  const [idSelfie, setIdSelfie] = useState(null)

  const [registeredUpiPreview, setRegisteredUpiPreview] = useState(null)
  const [depositProofPreview, setDepositProofPreview] = useState(null)
  const [oldUpiSelfiePreview, setOldUpiSelfiePreview] = useState(null)
  const [idSelfiePreview, setIdSelfiePreview] = useState(null)

  const [errors, setErrors] = useState({})

  const handleBack = () => {
    router.back()
  }

  const handleFile = (e, type) => {
    const file = e.target.files[0]
    if (!file) return

    const url = URL.createObjectURL(file)

    if (type === 'registeredUpi') {
      setRegisteredUpi(file)
      setRegisteredUpiPreview(url)
      setErrors((p) => ({ ...p, registeredUpi: '' }))
    }

    if (type === 'depositProof') {
      setDepositProof(file)
      setDepositProofPreview(url)
      setErrors((p) => ({ ...p, depositProof: '' }))
    }

    if (type === 'oldUpiSelfie') {
      setOldUpiSelfie(file)
      setOldUpiSelfiePreview(url)
      setErrors((p) => ({ ...p, oldUpiSelfie: '' }))
    }

    if (type === 'idSelfie') {
      setIdSelfie(file)
      setIdSelfiePreview(url)
      setErrors((p) => ({ ...p, idSelfie: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.upi.trim()) newErrors.upi = 'Please enter content'
    if (!registeredUpi) newErrors.registeredUpi = 'Upload photo cannot be empty'
    if (!depositProof) newErrors.depositProof = 'Upload photo cannot be empty'
    if (!oldUpiSelfie) newErrors.oldUpiSelfie = 'Upload photo cannot be empty'
    if (!idSelfie) newErrors.idSelfie = 'Upload photo cannot be empty'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setLoading(true)

    try {
      const data = new FormData()

      data.append('upi', formData.upi)
      data.append('registeredUpi', registeredUpi)
      data.append('depositProof', depositProof)
      data.append('oldUpiSelfie', oldUpiSelfie)
      data.append('idSelfie', idSelfie)

      await axios.post('/api/delete-upi-rebind', data)

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
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={(e) => handleFile(e, type)}
      />

      {preview ? (
        <img src={preview} className="w-full h-full object-cover" />
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
          Delete UPI and Rebind
        </h1>
      </header>

      <main className="px-5 py-4 space-y-6">
        <div className="space-y-2">
          <label className="text-[16px] text-slate-700">
            UPI that has been tied<span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="Please enter content"
            className={`w-full p-4 bg-white rounded-xl shadow-sm outline-none ${
              errors.upi ? 'ring-1 ring-red-400' : ''
            }`}
            onChange={(e) => setFormData({ ...formData, upi: e.target.value })}
          />

          {errors.upi && <p className="text-red-500 text-sm">{errors.upi}</p>}
        </div>

        <div className="space-y-3">
          <label className="text-[16px] text-slate-700">
            Registered UPI Account<span className="text-red-500">*</span>
          </label>

          <UploadBox preview={registeredUpiPreview} type="registeredUpi" />

          {errors.registeredUpi && (
            <p className="text-red-500 text-sm">{errors.registeredUpi}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-[16px] text-slate-700">
            Lastest Deposit Proof<span className="text-red-500">*</span>
          </label>

          <UploadBox preview={depositProofPreview} type="depositProof" />

          {errors.depositProof && (
            <p className="text-red-500 text-sm">{errors.depositProof}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-[16px] text-slate-700">
            Selfie Holding OLD UPI ID linked with game ID
            <span className="text-red-500">*</span>
          </label>

          <UploadBox preview={oldUpiSelfiePreview} type="oldUpiSelfie" />

          {errors.oldUpiSelfie && (
            <p className="text-red-500 text-sm">{errors.oldUpiSelfie}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-[16px] text-slate-700">
            Selfie Holding ID Card<span className="text-red-500">*</span>
          </label>

          <UploadBox preview={idSelfiePreview} type="idSelfie" />

          {errors.idSelfie && (
            <p className="text-red-500 text-sm">{errors.idSelfie}</p>
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
