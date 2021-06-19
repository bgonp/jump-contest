import { FC } from 'react'
import { Redirect, Switch } from 'wouter'

import LoginPage from 'components/pages/AuthPage'
import CompetitionEditPage from 'components/pages/CompetitionEditPage'
import CompetitionsListPage from 'components/pages/CompetitionsListPage'
import CompetitionViewPage from 'components/pages/CompetitionViewPage'
import PrivateRoute from 'components/router/PrivateRoute'
import PublicRoute from 'components/router/PublicRoute'
import ROUTES from 'constants/routes'

const Router: FC = () => (
  <Switch>
    <PublicRoute path={ROUTES.LOGIN}>
      <LoginPage />
    </PublicRoute>
    <PublicRoute path={ROUTES.VIEW}>
      <CompetitionViewPage />
    </PublicRoute>
    <PrivateRoute path={ROUTES.LIST}>
      <CompetitionsListPage />
    </PrivateRoute>
    <PrivateRoute path={ROUTES.EDIT}>
      {({ id }) => <CompetitionEditPage id={id} />}
    </PrivateRoute>
    <Redirect href={ROUTES.VIEW} />
  </Switch>
)

export default Router
