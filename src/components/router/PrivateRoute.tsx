import { ComponentProps, FC } from 'react'
import { Redirect, Route } from 'wouter'

import Loading from 'components/common/Loading'
import ROUTES from 'constants/routes'
import { useAuthContext } from 'contexts/AuthContext'

const PrivateRoute: FC<ComponentProps<typeof Route>> = (props) => {
  const { isAuthed, isLoading } = useAuthContext()

  if (isLoading) return <Loading />

  if (!isAuthed) return <Redirect href={ROUTES.VIEW} />

  return <Route {...props} />
}

export default PrivateRoute
