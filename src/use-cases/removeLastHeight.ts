import { Competition, Registration } from 'models'
import { update } from 'services/competition'
import getMaxHeight from 'utils/getMaxKeyWhichValueContainsTrue'

const registrationWithoutHeight = (
  registration: Registration,
  height: number
): Registration => {
  const { [height]: last, ...jumps } = registration.jumps
  const max = getMaxHeight(jumps)
  return { ...registration, jumps, max }
}

const removeLastHeight = (competition: Competition): void => {
  if (competition.heights.length === 0) return
  const heights = competition.heights.slice(0, -1)
  const lastHeight = competition.heights[heights.length]
  const registrations = competition.registrations.map(registration =>
    registrationWithoutHeight(registration, lastHeight)
  )

  update({ ...competition, heights, registrations })
}

export default removeLastHeight
