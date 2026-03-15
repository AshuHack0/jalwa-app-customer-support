'use client'
import React from 'react'
import { auth_tips, unauth_tips } from '@/lib/data/tips.js'

export default function KindTipsText({ isAuth }) {
  const final_tips = isAuth ? auth_tips : unauth_tips
  return (
    <div className="space-y-4 px-4">
      <h3 className="text-[22px] font-medium text-slate-800">Kind tips</h3>

      <div className="">
        {final_tips.map((tip, index) => (
          <p key={index} className="text-[15px] text-slate-600">
            <span className="mr-1">{index + 1}.</span>
            {tip}
          </p>
        ))}
      </div>
    </div>
  )
}
