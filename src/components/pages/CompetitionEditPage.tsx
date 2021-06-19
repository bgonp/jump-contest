import { FC, useEffect } from 'react'

import Competition from 'components/containers/Competition'
import { useCompetitionContext } from 'contexts/CompetitionContext'

const CompetitionEditPage: FC<{ id: string }> = ({ id }) => {
  const { setCompetitionId } = useCompetitionContext()

  useEffect(() => {
    setCompetitionId(id)
  }, [id, setCompetitionId])

  return <Competition canEdit />
}

export default CompetitionEditPage
