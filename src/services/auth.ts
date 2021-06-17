import { User } from 'models'
import { auth, firebase } from 'utils/firebase'

const normalizeUser = (user: firebase.User | null): User | null => {
  if (!user) return null

  return {
    uid: user.uid,
    name: user.displayName || '',
    email: user.email || '',
  }
}

export const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  return auth.signInWithPopup(provider)
}

export const signOut = () => auth.signOut()

export const onAuthChange = (callback: (user: User | null) => void) =>
  auth.onAuthStateChanged(user => callback(normalizeUser(user)))
