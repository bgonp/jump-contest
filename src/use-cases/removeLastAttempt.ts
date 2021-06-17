import { Competition, Registration } from 'models'
import { update } from 'services/competition'
import getMaxHeight from 'utils/getMaxKeyWhichValueContainsTrue'

const registrationWithoutLastAttempt = (
  registration: Registration,
  height: number
): Registration => {
  const attempts = registration.jumps[height]
  if (attempts.length === 0) return registration

  const jumps = {
    ...registration.jumps,
    [height]: attempts.slice(0, attempts.length - 1),
  }
  const max = getMaxHeight(jumps)

  return { ...registration, jumps, max }
}

const removeLastAttempt = (
  competition: Competition,
  registrationId: string,
  height: number
): void => {
  const registrations = competition.registrations.map(registration => {
    if (registration.id !== registrationId) return registration
    return registrationWithoutLastAttempt(registration, height)
  })

  update({ ...competition, registrations })
}

export default removeLastAttempt
