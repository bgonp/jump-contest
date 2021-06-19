import { FC } from 'react'

import useCurrentCompetitor from 'hooks/useCurrentCompetitor'

const Competitor: FC = () => {
  const { competitor, addSuccess, addFail } = useCurrentCompetitor()

  if (competitor === null) return null

  return (
    <div>
      <h3>{competitor.name}</h3>
      <h4>{competitor.surname}</h4>
      <button onClick={addSuccess}>SUCCESS</button>
      <button onClick={addFail}>FAIL</button>
    </div>
  )
}

export default Competitor
