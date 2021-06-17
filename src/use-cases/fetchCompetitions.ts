import { Competition } from 'models'
import { fetchAll } from 'services/competition'

const fetchCompetitions = (): Promise<Competition[]> => {
  return fetchAll()
}

export default fetchCompetitions
