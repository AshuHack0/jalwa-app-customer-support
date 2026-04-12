export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false
  const params = new URLSearchParams(window.location.search)
  return !!params.get('token')
}

export const getToken = () => {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  return params.get('token')
}