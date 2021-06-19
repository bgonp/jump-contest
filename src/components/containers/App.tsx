import { FC } from 'react'

import { AuthProvider } from 'contexts/AuthContext'
import { CompetitionProvider } from 'contexts/CompetitionContext'
import Router from 'components/router/Router'
import Wrapper from 'components/containers/Wrapper'

import 'styles/reset.css'
import 'styles/main.css'

const App: FC = () => {
  return (
    <AuthProvider>
      <CompetitionProvider>
        <Wrapper>
          <Router />
        </Wrapper>
      </CompetitionProvider>
    </AuthProvider>
  )
}

export default App
