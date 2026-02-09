// react
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
// context
import { AuthContext } from './AuthContext'
// firebase
import { auth } from '../firebase/firebase'
// services
import { getUserRole } from '../services/auth.service' // <--- 1. ДОДАЛИ ІМПОРТ

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user)

        console.log('Context: User logged in, fetching role...')
        const role = await getUserRole(user.uid)

        setUserRole(role)
        console.log('Context: Role set to:', role)
      } else {
        setCurrentUser(null)
        setUserRole(null)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    userRole,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
