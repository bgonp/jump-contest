import { Competition, Registration } from 'models'
import { update } from 'services/competition'

const registrationWithPassedHeight = (
  registration: Registration,
  height: number
): Registration => {
  const prevAttempts = registration.jumps[height]
  if (prevAttempts?.length) throw new Error('Competitor has attempts')
  const jumps = { ...registration.jumps, [height]: null }
  return { ...registration, jumps }
}

const passHeight = (
  competition: Competition,
  registrationId: string,
  height: number
): void => {
  const registrations = competition.registrations.map(registration => {
    if (registration.id !== registrationId) return registration
    return registrationWithPassedHeight(registration, height)
  })

  update({ ...competition, registrations })
}

export default passHeight
