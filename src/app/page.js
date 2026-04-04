'use client'

import { useEffect, useState } from 'react'
import HomePage from '@/pages/Home'
import HomeUnauthenticated from '@/pages/HomeUnauthenticated'
import { isAuthenticated } from '@/lib/utils/auth.js'

export default function Home() {
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    setAuth(isAuthenticated())
  }, [])

  // Render nothing until client has checked auth — prevents SSR/client mismatch
  if (auth === null) return null

  return <>{auth ? <HomePage /> : <HomeUnauthenticated />}</>
}
