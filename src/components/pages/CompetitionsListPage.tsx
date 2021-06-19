import { FC } from 'react'

import Loading from 'components/common/Loading'
import CompetitionList from 'components/containers/CompetitionList'
import AddCompetitionForm from 'components/containers/forms/AddCompetitionForm'
import useCompetitions from 'hooks/useCompetitions'

const CompetitionListPage: FC = () => {
  const { isLoading, competitions, noCompetitions, addCompetition } = useCompetitions()

  if (isLoading) return <Loading />

  return (
    <>
      {noCompetitions
        ? <h2>No competitions yet</h2>
        : <CompetitionList competitions={competitions} />
      }
      <AddCompetitionForm callback={addCompetition} />
    </>
  )
}

export default CompetitionListPage
