import { useAuth } from 'contexts/AuthContext'
import { FC } from 'react'

const Header: FC = () => {
  const { user, isAuthed, isLoading, logIn, logOut } = useAuth()

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
   </>
  )
}

export default Header
