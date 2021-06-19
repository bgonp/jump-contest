import { Competition, Competitor, Registration } from 'models'
import { firestore } from 'utils/firebase'

const competitionsRef = firestore.collection('competitions')

const normalizeCompetitor = (data: Record<string, any>): Competitor => ({
  clubId: data.clubId,
  name: data.name,
  surname: data.surname,
  birthDate: data.birthDate?.toDate() || null,
  email: data.email || null,
})

const normalizeJumps = (data: Record<string, any>): Registration['jumps'] =>
  Object.entries(data).reduce((jumps, [height, attempts]) => ({
    ...jumps,
    [parseInt(height)]: Array.isArray(attempts)
      ? attempts.map(attempt => Boolean(attempt))
      : null,
  }), {} as Registration['jumps'])

const normalizeRegistration = (data: Record<string, any>): Registration => ({
  id: data.id,
  finished: Boolean(data.finished),
  competitor: normalizeCompetitor(data.competitor),
  rank: parseInt(data.rank) || null,
  jumps: normalizeJumps(data.jumps),
  max: parseInt(data.max),
})

const normalizeHeights = (data: any[]) =>
  data.map(height => {
    if (typeof height !== 'number') throw Error()
    return height
  })

const normalizeCompetition = (data: Record<string, any>): Competition => ({
  id: data.id,
  name: data.name,
  date: data.date.toDate(),
  closed: Boolean(data.closed),
  finished: Boolean(data.finished),
  heights: normalizeHeights(data.heights),
  registrations: data.registrations.map(normalizeRegistration),
})

const fetchAll = async (): Promise<Competition[]> => {
  const snapshot = await competitionsRef.orderBy('date').get()
  if (snapshot.empty) return []

  try {
    return snapshot.docs.map(doc => normalizeCompetition({ id: doc.id, ...doc.data() }))
  } catch (error) {
    throw new Error('Wrong firebase response')
  }
}

const create = (competition: Omit<Competition, 'id'>): Promise<Competition> =>
  competitionsRef
    .add(competition)
    .then((doc) => doc.get().then(snapshot => {
      const data = snapshot.data()
      if (data === undefined) throw new Error('Error trying to store competition')
      return normalizeCompetition(data)
    }))

const update = (competition: Competition) => {
  const { id, ...rest } = competition
  competitionsRef.doc(id).update(rest)
}

const listen = (
  id: string,
  callback: (competition: Competition | null) => void
): () => void => {
  return competitionsRef
    .doc(id)
    .onSnapshot(doc => {
      const data = doc.data()

      if (!data) return callback(null)

      try {
        callback(normalizeCompetition({ id, ...data }))
      } catch (error) {
        throw new Error('Wrong firebase response')
      }
    })
}

export {
  fetchAll,
  create,
  update,
  listen,
}
