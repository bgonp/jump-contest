import { Competition } from 'models'
import { update } from 'services/competition'

const createHeight = (
  competition: Competition,
  height: number
): void => {
  const heights = [...competition.heights, height]
  const registrations = competition.registrations.map(registration => {
    const jumps = { ...registration.jumps, [height]: [] }
    return { ...registration, jumps }
  })
  update({ ...competition, heights, registrations })
}

export default createHeight
