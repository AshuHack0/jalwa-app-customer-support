import React from 'react'
import Image from 'next/image'

export default function HeroSectionBanner({ ImageUrl }) {
  return (
    <div className="w-full overflow-hidden">
      <Image
        src={ImageUrl}
        alt="Jalwa Game Self-Service Customer Support Center"
        width={1200}
        height={375}
        priority
        sizes="100vw"
        className="w-full h-auto object-contain"
      />
    </div>
  )
}
