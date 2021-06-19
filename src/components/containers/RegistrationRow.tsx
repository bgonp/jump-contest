import { FC } from 'react'

import Attempts from 'components/containers/Attempts'
import { Registration } from 'models'

type Props = {
  canRemove: boolean
  disabled: boolean
  highlighted: boolean
  heights: number[]
  registration: Registration
  withRank: boolean
  deleteRegistration: () => void
}

const RegistrationRow: FC<Props> = ({
  canRemove,
  disabled,
  highlighted,
  heights,
  registration,
  withRank,
  deleteRegistration,
}) => {
  const { id, competitor, jumps, max } = registration

  const className = `${disabled ? 'disabled' : ''} ${highlighted ? 'highlighted' : ''}`

  const { rank } = registration

  return (
    <tr className={className}>
      {withRank && <td className={`rank rank-${rank}`}>{rank}</td>}
      <td className="left">{competitor.name}</td>
      <td>{max}</td>
      {heights.map(height =>
        <td
          key={`${id}-${height}`}
          className={'stretch'}
        >
          <Attempts attempts={jumps[height]} />
        </td>
      )}
      {canRemove && <td><button onClick={deleteRegistration}>BORRAR</button></td>}
    </tr>
  )
}

export default RegistrationRow
