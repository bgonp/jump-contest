import { Registration } from 'models'

export type Competition = {
  id: string,
  name: string,
  date: Date,
  closed: boolean,
  finished: boolean,
  heights: number[],
  registrations: Registration[],
}
