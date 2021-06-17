import { FC, createContext, useContext } from 'react'

import useCompetition from 'hooks/useCompetition'

type CompetitionContextData = ReturnType<typeof useCompetition>

const CompetitionContext = createContext<CompetitionContextData | null>(null)

export const useCompetitionContext = (): CompetitionContextData => {
  const context = useContext(CompetitionContext)
  if (context === null) throw Error('Cannot use context outside of provider')
  return context
}

export const CompetitionProvider: FC = ({ children }) => {
  const competitionData = useCompetition()
  return (
    <CompetitionContext.Provider value={competitionData}>
      {children}
    </CompetitionContext.Provider>
  )
}
