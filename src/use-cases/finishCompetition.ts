import { Competition } from 'models'
import { update } from 'services/competition'

const finishCompetition = (competition: Competition): void => {
  const ranks = competition.registrations
    .map(({ max }) => max)
    .sort((a, b) => b - a)
    .reduce((ranks, max, index) => {
      if (ranks[max] !== undefined) return ranks
      return { ...ranks, [max]: index + 1 }
    }, {} as Record<number, number>)

  const registrations = competition.registrations.map(
    registration => ({ ...registration, rank: ranks[registration.max] })
  )

  update({ ...competition, finished: true, registrations })
}

export default finishCompetition
