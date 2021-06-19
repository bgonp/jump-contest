import { FC } from 'react'
import { useLocation } from 'wouter'

import { useAuthContext } from 'contexts/AuthContext'
import ROUTES from 'constants/routes'

const Header: FC = () => {
  const [, setLocation] = useLocation()
  const { user, isAuthed, isLoading, logIn, logOut } = useAuthContext()

  return (
    <>
      {isAuthed && `Hello, ${user?.name}`}
      {isLoading
        ? 'Loading...'
        : (isAuthed
            ? <button onClick={logOut}>Log Out</button>
            : <button onClick={logIn}>Log In</button>
          )
      }
      {isAuthed && <button onClick={() => setLocation(ROUTES.LIST)}>COMPETITIONS</button>}
    </>
  )
}

export default Header
