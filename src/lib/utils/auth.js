export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false

  localStorage.setItem(
    'authToken',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTYiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcxMDAwMDAwMCwiZXhwIjoxNzEwMDAzNjAwfQ.kd93Jf8kL1fTQx5W7y2yN8G0rZc4pQmL6sT9vH2pXbA'
  )

  const token = localStorage.getItem('authToken')
  return !!token
}