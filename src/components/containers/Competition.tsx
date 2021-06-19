import { FC } from 'react'

import CompetitionControls from 'components/containers/CompetitionControls'
import Loading from 'components/common/Loading'
import RegistrationsTable from 'components/containers/RegistrationsTable'
import NotFound from 'components/router/NotFound'
import { useCompetitionContext } from 'contexts/CompetitionContext'
import Competitor from './Competitor'
import Title from 'components/common/Title'

const Competition: FC<{ canEdit?: boolean }> = ({ canEdit = false }) => {
  const { isLoading, competition } = useCompetitionContext()

  if (isLoading) return <Loading />

  if (!competition) return <NotFound />

  const showControls = canEdit && !competition.finished

  return (
    <div>
      <Title title={competition.name} subtitle={competition.date.toLocaleString()} />
      {showControls && <CompetitionControls />}
      <RegistrationsTable />
      {showControls && <Competitor />}
    </div>
  )
}

export default Competition
