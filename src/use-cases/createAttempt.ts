import { MAX_ATTEMPTS } from 'constants/competition'
import { Competition, Registration } from 'models'
import { update } from 'services/competition'
import getMaxHeight from 'utils/getMaxKeyWhichValueContainsTrue'

const registrationWithNewAttempt = (
  registration: Registration,
  height: number,
  success: boolean
): Registration => {
  const attempts = [...registration.jumps[height], success]
  const jumps = { ...registration.jumps, [height]: attempts }
  const max = success ? getMaxHeight(jumps) : registration.max
  const finished = Boolean(!success && attempts.length >= MAX_ATTEMPTS)
  return { ...registration, finished, jumps, max }
}

const createAttempt = (
  competition: Competition,
  registrationId: string,
  height: number,
  success: boolean
): void => {
  const registrations = competition.registrations.map(registration => {
    if (registration.id !== registrationId) return registration
    return registrationWithNewAttempt(registration, height, success)
  })

  update({ ...competition, registrations })
}

export default createAttempt
