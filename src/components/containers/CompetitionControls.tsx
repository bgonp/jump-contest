import { FC } from 'react'

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
    deleteLastHeight,
  } = useCompetitionContext()

  if (!competition || competition.finished) return null

  return (
    <div>
      {!competition.closed && <AddRegistrationForm callback={addRegistration} />}
      {!competition.closed && <button onClick={close}>CLOSE</button>}
      {competition.closed && <AddHeightForm callback={addHeight} />}
      {competition.closed && <button onClick={deleteLastHeight}>REMOVE HEIGHT</button>}
      {competition.closed && <button onClick={finish}>FINISH</button>}
    </div>
  )
}

export default CompetitionControls
