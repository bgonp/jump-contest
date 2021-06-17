import { Competition } from 'models'
import { update } from 'services/competition'

const closeCompetition = (competition: Competition): void =>
  update({ ...competition, closed: true })

export default closeCompetition
