import { Competitor } from 'models'

export type Registration = {
  id: string,
  finished: boolean,
  competitor: Competitor,
  rank: number | null,
  jumps: Record<number, boolean[] | null>
  max: number
}
