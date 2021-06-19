import { FC, useEffect } from 'react'

import Loading from 'components/common/Loading'
import Competition from 'components/containers/Competition'
import { useCompetitionContext } from 'contexts/CompetitionContext'
import useCompetitions from 'hooks/useCompetitions'

const CompetitionViewPage: FC = () => {
  const { isLoading, lastCompetition } = useCompetitions()
  const { setCompetitionId } = useCompetitionContext()

  useEffect(() => {
    if (lastCompetition === null) return
    setCompetitionId(lastCompetition.id)
  }, [lastCompetition, setCompetitionId])

  if (isLoading) return <Loading />

  if (lastCompetition === null) return <h2>No competitions yet</h2>

  return <Competition />
}

export default CompetitionViewPage
