import { FC } from 'react'

import RegistrationRow from 'components/containers/RegistrationRow'
import { VISIBLE_HEIGHTS } from 'constants/competition'
import { useAuthContext } from 'contexts/AuthContext'
import { useCompetitionContext } from 'contexts/CompetitionContext'
import useCurrentCompetitor from 'hooks/useCurrentCompetitor'

const RegistrationsTable: FC = () => {
  const { isAuthed } = useAuthContext()
  const { competition, rankedRegistrations, deleteRegistration } = useCompetitionContext()
  const { competitor, registrationId } = useCurrentCompetitor()

  if (!competition) return null

  const { closed, heights, finished } = competition
  const registrations = finished ? rankedRegistrations : competition.registrations
  const lastHeights = heights.slice(-VISIBLE_HEIGHTS)
  const lastHeight = heights[heights.length - 1]

  return (
    <table className="registrationTable">
      <thead>
        <tr>
          {finished && <th rowSpan={2}>Puesto</th>}
          <th rowSpan={2}>Nombre</th>
          <th rowSpan={2}>Max</th>
          {lastHeights.length > 0 && (
            <th colSpan={lastHeights.length}>Últimas alturas (cm)</th>
          )}
          {!closed && isAuthed && <th rowSpan={2}>BORRAR?</th>}
        </tr>
        <tr>
          {lastHeights.map(height => <th key={height}>{height}</th>)}
        </tr>
      </thead>
      <tbody>
        {registrations.map((registration) => (
          <RegistrationRow
            key={registration.id}
            canRemove={!closed && isAuthed}
            highlighted={!finished && registration.id === registrationId}
            disabled={!finished && registration.finished}
            heights={lastHeights}
            registration={registration}
            withRank={finished}
            deleteRegistration={() => deleteRegistration(registration.id)}
          />
        ))}
      </tbody>
      {!finished && competitor !== null && (
        <tfoot>
          <tr className="current">
            <th colSpan={10}>
              Ahora: {competitor.name} {competitor.surname} | {lastHeight}cm
            </th>
          </tr>
        </tfoot>
      )}
    </table>
  )
}
export default RegistrationsTable
