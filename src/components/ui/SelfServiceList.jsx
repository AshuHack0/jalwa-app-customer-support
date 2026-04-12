'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { selfServiceItems } from '@/lib/data/selfServiceItems.js'
import { useSearchParams } from 'next/navigation'

export default function SelfServiceList({ isAuth }) {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const withToken = (path) =>
    token ? `${path}?token=${token}` : path

  return (
    <div className="px-4 py-2 w-full">
      {/* Title */}
      <h2 className="text-lg md:text-xl font-medium text-slate-800 mb-4 px-2">
        Self Service
      </h2>

      {/* List Container */}
      {isAuth && (
        <div className="overflow-hidden">
          {selfServiceItems.map((item, index) => (
            <Link key={item.id} href={withToken(item.link)} className="block">
              <div
                className={`flex items-center justify-between w-full p-3 md:p-4 transition-colors bg-white hover:bg-slate-50 active:bg-slate-100 ${
                  index !== selfServiceItems.length - 1
                    ? 'border-b border-gray-300'
                    : ''
                }`}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  {/* Image in Circle Area */}
                  <div className="relative w-9 h-9 md:w-10 md:h-10 flex-shrink-0 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-slate-700">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>

                  {/* Text Label */}
                  <span className="text-[15px] md:text-[17px] font-normal text-slate-700 text-left">
                    {item.title}
                  </span>
                </div>

                {/* Arrow Icon */}
                <ChevronRight
                  size={28}
                  className="text-slate-400 md:w-8 md:h-8"
                  strokeWidth={1}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
