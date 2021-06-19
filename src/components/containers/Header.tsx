import { FC } from 'react'
import { useLocation } from 'wouter'

import Title from 'components/common/Title'
import { useAuthContext } from 'contexts/AuthContext'
import ROUTES from 'constants/routes'

const Header: FC = () => {
  const [, setLocation] = useLocation()
  const { user, isAuthed, isLoading, logOut } = useAuthContext()

  return (
    <header>
      <Title title="Competición de salto" />
      {isAuthed && `${user?.name}`}
      {!isLoading && isAuthed && <button onClick={logOut}>Log Out</button>}
      {isAuthed && <button onClick={() => setLocation(ROUTES.LIST)}>COMPETITIONS</button>}
    </header>
  )
}

export default Header
