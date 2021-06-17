import { Competition } from 'models'
import { update } from 'services/competition'

const removeRegistration = (competition: Competition, registrationId: string) => {
  const registrations = competition.registrations.filter(
    (registration) => registration.id !== registrationId
  )
  update({ ...competition, registrations })
}

export default removeRegistration
