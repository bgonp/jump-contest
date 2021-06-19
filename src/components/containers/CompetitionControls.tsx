import { FC } from 'react'

import Competitor from 'components/containers/Competitor'
import AddHeightForm from 'components/containers/forms/AddHeightForm'
import AddRegistrationForm from 'components/containers/forms/AddRegistrationForm'
import { useCompetitionContext } from 'contexts/CompetitionContext'

const CompetitionControls: FC = () => {
  const {
    competition,
    close,
    finish,
    addHeight,
    addRegistration,
    deleteLastAttempt,
    deleteLastHeight,
  } = useCompetitionContext()

  const closeCompetition = () => {
    if (confirm('Close competition?')) close()
  }

  const deleteHeight = () => {
    if (confirm('Delete last height?')) deleteLastHeight()
  }

  const deleteAttempt = () => {
    if (confirm('Delete last attempt?')) deleteLastAttempt()
  }

  if (!competition || competition.finished) return null

  return (
    <div className="controls">
      {!competition.closed && <AddRegistrationForm callback={addRegistration} />}
      {!competition.closed && <button onClick={closeCompetition}>CLOSE</button>}
      {competition.closed && <AddHeightForm callback={addHeight} />}
      {competition.closed && <button onClick={deleteHeight}>DELETE HEIGHT</button>}
      {competition.closed && <button onClick={deleteAttempt}>DELETE ATTEMPT</button>}
      {competition.closed && <button onClick={finish}>FINISH</button>}
      <Competitor />
    </div>
  )
}

export default CompetitionControls
