import { FC } from 'react'

import { useAuthContext } from 'contexts/AuthContext'

const LoginPage: FC = () => {
  const { logIn } = useAuthContext()

  return <button onClick={logIn}>Log in with Google</button>
}

export default LoginPage
