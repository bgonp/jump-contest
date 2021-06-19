import { Competition, Registration } from 'models'
import { update } from 'services/competition'
import getMaxHeight from 'utils/getMaxKeyWhichValueContainsTrue'

const registrationWithoutHeight = (
  registration: Registration,
  removedHeight: number,
  lastHeight: number
): Registration => {
  const { [removedHeight]: last, ...jumps } = registration.jumps
  const max = getMaxHeight(jumps)
  const finished = registration.finished && max < lastHeight
  return { ...registration, finished, jumps, max }
}

const removeLastHeight = (competition: Competition): void => {
  if (competition.heights.length === 0) return
  const heights = competition.heights.slice(0, -1)
  const removedHeight = competition.heights[competition.heights.length - 1]
  const lastHeight = heights[heights.length - 1]
  const registrations = competition.registrations.map(registration =>
    registrationWithoutHeight(registration, removedHeight, lastHeight)
  )

  update({ ...competition, heights, registrations })
}

export default removeLastHeight
