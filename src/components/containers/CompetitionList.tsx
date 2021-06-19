import { FC } from 'react'
import { useLocation } from 'wouter'

import ROUTES from 'constants/routes'
import getRoute from 'utils/getRoute'
import { Competition } from 'models'

const CompetitionList: FC<{ competitions: Competition[] }> = ({ competitions }) => {
  const [, setLocation] = useLocation()

  const navigate = (id: string) => setLocation(getRoute(ROUTES.EDIT, { id }))

  return (
    <div>
      {competitions.length === 0
        ? <h2>No competitions yet</h2>
        : (
          <ul>
            {competitions.map(({ id, date, name }) => (
              <li key={id}>
                <button onClick={() => navigate(id)}>
                  {name} ({date.toLocaleDateString()})
                </button>
              </li>
            ))}
          </ul>
          )}
    </div>
  )
}

export default CompetitionList
