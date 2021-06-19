import { FC } from 'react'

import { Registration } from 'models'
import getEditUserUrl from 'utils/getEditUserUrl'
import { useAuthContext } from 'contexts/AuthContext'

type Props = {
  canEdit: boolean
  heights: number[]
  registration: Registration
  deleteRegistration: () => void
}

const RegistrationRow: FC<Props> = ({
  canEdit,
  heights,
  registration,
  deleteRegistration,
}) => {
  const { isAuthed } = useAuthContext()
  const { id, competitor, jumps, max } = registration
  const competitorName = !isAuthed || competitor.clubId === null
    ? <span>{competitor.name} {competitor.surname}</span>
    : (
      <a
        href={getEditUserUrl(competitor.clubId)}
        target="_blank"
        rel="noreferrer nofollow"
      >
        {competitor.name} {competitor.surname}
      </a>
      )

  return (
    <tr>
      <td>{competitorName}</td>
      <td>{max}</td>
      {heights.map(height =>
        <td key={`${id}-${height}`}>{jumps[height]}</td>
      )}
      {canEdit && <td><button onClick={deleteRegistration}>DELETE</button></td>}
    </tr>
  )
}

export default RegistrationRow
