export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false

  // Read token from URL query params and persist to localStorage
  const params = new URLSearchParams(window.location.search)
  const urlToken = params.get('token')
  if (urlToken) {
    localStorage.setItem('authToken', urlToken)
  }

  const token = localStorage.getItem('authToken')
  return !!token
}

export const getToken = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('authToken')
}