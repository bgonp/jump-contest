import { FC } from 'react'
import { Redirect } from 'wouter'

import ROUTES from 'constants/routes'
import { useAuthContext } from 'contexts/AuthContext'

const NotFound: FC = () => {
  const { isAuthed } = useAuthContext()

  const route = isAuthed ? ROUTES.LIST : ROUTES.VIEW

  return <Redirect href={route} />
}

export default NotFound
