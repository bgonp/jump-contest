import { FC } from 'react'

import useCurrentCompetitor from 'hooks/useCurrentCompetitor'
import { CrossIcon, MinusIcon, TickIcon } from 'components/common/icons'

const Competitor: FC = () => {
  const { attempts, competitor, addSuccess, addFail, pass } = useCurrentCompetitor()

  if (competitor === null) return null

  return (
    <div className="competitor">
      <h3>{competitor.name}</h3>
      <h4>{competitor.surname}</h4>
      <div className="buttons">
        <button onClick={addSuccess}><TickIcon /></button>
        <button onClick={addFail}><CrossIcon /></button>
        {attempts.length === 0 && <button onClick={pass}><MinusIcon /></button>}
      </div>
    </div>
  )
}

export default Competitor
