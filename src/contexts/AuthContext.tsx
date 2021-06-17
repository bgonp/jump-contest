import { createContext, FC, useContext, useEffect, useMemo, useState } from 'react'

import { User } from 'models'
import { signIn, signOut, onAuthChange } from 'services/auth'

type AuthData = {
  user: User | null,
  isLoading: boolean,
  isAuthed: boolean,
  logIn: () => void,
  logOut: () => void,
}

const AuthContext = createContext<AuthData | null>(null)

export const useAuthContext = (): AuthData => {
  const context = useContext(AuthContext)
  if (context === null) throw Error('Cannot use context outside of provider')
  return context
}

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const authData: AuthData = useMemo(() => ({
    user,
    isLoading,
    isAuthed: user !== null,
    logIn: () => {
      setIsLoading(true)
      signIn()
    },
    logOut: () => {
      setIsLoading(true)
      signOut()
    },
  }), [user, isLoading])

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user)
      setIsLoading(false)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  )
}
