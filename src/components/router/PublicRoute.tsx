import { ComponentProps, FC } from 'react'
import { Redirect, Route } from 'wouter'

import Loading from 'components/Loading'
import ROUTES from 'constants/routes'
import { useAuthContext } from 'contexts/AuthContext'

const PublicRoute: FC<ComponentProps<typeof Route>> = (props) => {
  const { isAuthed, isLoading } = useAuthContext()

  if (isLoading) return <Loading />

  if (isAuthed) return <Redirect href={ROUTES.LIST} />

  return <Route {...props} />
}

export default PublicRoute
