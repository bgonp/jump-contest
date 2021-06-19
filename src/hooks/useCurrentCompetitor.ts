import { useCallback, useMemo } from 'react'
import { Registration } from 'models'
import { useCompetitionContext } from 'contexts/CompetitionContext'

const decideNextTurnFactory = (height: number) => (
  registration1: Registration | null,
  registration2: Registration
): Registration | null => {
  const registrationAttempts = registration2.jumps[height]
  if (
    registrationAttempts === null ||
    registrationAttempts.includes(true) ||
    registration2.finished
  ) { return registration1 }

  if (registration1 === null) return registration2

  const currentAttempts = registration1.jumps[height] || []
  if (registrationAttempts.length < currentAttempts.length) return registration2

  return registration1
}

const useCurrentCompetitor = () => {
  const { competition, addAttempt, passAttempt } = useCompetitionContext()
  const height = competition === null || competition.heights.length === 0
    ? 0
    : competition.heights[competition.heights.length - 1]

  const decideNextTurn = decideNextTurnFactory(height)

  const currentRegistration = useMemo(() => {
    if (competition === null || !competition.closed || height === 0) {
      return null
    }
    return competition.registrations.reduce(decideNextTurn, null as Registration | null)
  }, [competition, height, decideNextTurn])

  const addSuccess = useCallback(() => {
    if (currentRegistration === null) return
    addAttempt(currentRegistration.id, height, true)
  }, [currentRegistration, height, addAttempt])

  const addFail = useCallback(() => {
    if (currentRegistration === null) return
    addAttempt(currentRegistration.id, height, false)
  }, [currentRegistration, height, addAttempt])

  const pass = useCallback(() => {
    if (currentRegistration === null) return
    passAttempt(currentRegistration.id, height)
  }, [currentRegistration, height, passAttempt])

  return {
    competitor: currentRegistration && currentRegistration.competitor,
    attempts: currentRegistration?.jumps[height] ?? [],
    registrationId: currentRegistration?.id,
    addSuccess,
    addFail,
    pass,
  }
}

export default useCurrentCompetitor
