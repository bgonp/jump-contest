import { Competition } from 'models'
import { listen } from 'services/competition'

const listenCompetition = (
  id: string,
  callback: (competition: Competition | null) => void
) => listen(id, callback)

export default listenCompetition
