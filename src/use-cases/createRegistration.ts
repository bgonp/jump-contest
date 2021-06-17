import { v4 as uuidv4 } from 'uuid'

import { Competition, Registration } from 'models'
import { update } from 'services/competition'

const newRegistration = (
  name: string,
  surname: string,
  clubId: number | null,
  birthDate: Date | null,
  email: string | null
): Registration => ({
  id: uuidv4(),
  finished: false,
  competitor: {
    name,
    surname,
    clubId,
    birthDate,
    email,
  },
  rank: null,
  jumps: {},
  max: 0,
})

const createRegistration = (
  competition: Competition,
  name: string,
  surname: string,
  clubId: number | null,
  birthDate: Date | null,
  email: string | null
): void => {
  const registrations = [
    ...competition.registrations,
    newRegistration(name, surname, clubId, birthDate, email),
  ]

  update({ ...competition, registrations })
}

export default createRegistration
