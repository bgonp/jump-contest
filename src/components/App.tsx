import { FC } from 'react'
import { AuthProvider } from 'contexts/AuthContext'
import Header from './Header'

const App: FC = () => {
  return (
    <AuthProvider>
      <Header />
    </AuthProvider>
  )
}

export default App
