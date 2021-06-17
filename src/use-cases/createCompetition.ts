import { Competition } from 'models'
import { create } from 'services/competition'

const createCompetition = (name: string, date: Date): Promise<Competition> =>
  create({
    name,
    date,
    closed: false,
    finished: false,
    heights: [],
    registrations: [],
  })

export default createCompetition
