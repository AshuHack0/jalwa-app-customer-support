'use client'

import { useEffect, useState } from 'react'
import HomePage from '@/pages/Home'
import HomeUnauthenticated from '@/pages/HomeUnauthenticated'
import { isAuthenticated } from '@/lib/utils/auth.js'

export default function Home() {
  const auth = isAuthenticated()

  return <>{auth ? <HomePage /> : <HomeUnauthenticated />}</>
}
