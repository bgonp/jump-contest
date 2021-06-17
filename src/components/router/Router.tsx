import { FC } from 'react'
import { Redirect, Switch } from 'wouter'

import Competition from 'components/Competition'
import CompetitionList from 'components/CompetitionList'
import LastCompetition from 'components/LastCompetition'
import PrivateRoute from 'components/router/PrivateRoute'
import PublicRoute from 'components/router/PublicRoute'
import ROUTES from 'constants/routes'

const Router: FC = () => (
  <Switch>
    <PublicRoute path={ROUTES.VIEW}>
      <LastCompetition />
    </PublicRoute>
    <PrivateRoute path={ROUTES.LIST}>
      <CompetitionList />
    </PrivateRoute>
    <PrivateRoute path={ROUTES.EDIT}>
      {({ id }) => <Competition id={id} />}
    </PrivateRoute>
    <Redirect href={ROUTES.VIEW} />
  </Switch>
)

export default Router
