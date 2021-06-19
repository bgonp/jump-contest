import { FC } from 'react'

import { CrossIcon, MinusIcon, TickIcon } from 'components/common/icons'
import AddHeightForm from 'components/containers/forms/AddHeightForm'
import AddRegistrationForm from 'components/containers/forms/AddRegistrationForm'
import { useCompetitionContext } from 'contexts/CompetitionContext'
import useCurrentCompetitor from 'hooks/useCurrentCompetitor'

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
  const { attempts, competitor, addSuccess, addFail, pass } = useCurrentCompetitor()

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
      {!competitor && <AddHeightForm callback={addHeight} />}
      {competition.closed && <button onClick={deleteHeight}>DELETE HEIGHT</button>}
      {competition.closed && <button onClick={deleteAttempt}>DELETE ATTEMPT</button>}
      {competition.closed && <button onClick={finish}>FINISH</button>}
      {competitor && (
        <div className="competitor">
          <h3>{competitor.name}</h3>
          <h4>{competitor.surname}</h4>
          <div className="buttons">
            <button onClick={addSuccess}><TickIcon /></button>
            <button onClick={addFail}><CrossIcon /></button>
            {attempts.length === 0 && <button onClick={pass}><MinusIcon /></button>}
          </div>
        </div>
      )}
    </div>
  )
}

export default CompetitionControls
