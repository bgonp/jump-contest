import { FC } from 'react'

import RegistrationRow from 'components/containers/RegistrationRow'
import { useAuthContext } from 'contexts/AuthContext'
import { useCompetitionContext } from 'contexts/CompetitionContext'

const RegistrationsTable: FC = () => {
  const { isAuthed } = useAuthContext()
  const { competition, deleteRegistration } = useCompetitionContext()

  if (!competition) return null

  const { heights, registrations } = competition

  return (
    <table>
      <thead>
        <tr>
          <th rowSpan={2}>Name</th>
          <th rowSpan={2}>Max</th>
          <th colSpan={heights.length}>Heights</th>
          {isAuthed && <th></th>}
        </tr>
        <tr>
          {heights.map(height => <th key={height}>{height}</th>)}
        </tr>
      </thead>
      <tbody>
        {registrations.map((registration) => (
          <RegistrationRow
          key={registration.id}
          canEdit={isAuthed}
          heights={heights}
          registration={registration}
          deleteRegistration={() => deleteRegistration(registration.id)}
        />
        ))}
      </tbody>
    </table>
  )
}
export default RegistrationsTable
