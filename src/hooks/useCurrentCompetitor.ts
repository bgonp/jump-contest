import { useCallback, useMemo } from 'react'
import { Registration } from 'models'
import { useCompetitionContext } from 'contexts/CompetitionContext'

const useCurrentCompetitor = () => {
  const { competition, addAttempt } = useCompetitionContext()
  const height = competition === null || competition.heights.length === 0
    ? 0
    : competition.heights[competition.heights.length - 1]

  const registration = useMemo(() => {
    if (competition === null || !competition.closed || height === 0) {
      return null
    }

    return competition.registrations.reduce(
      (current, registration) => {
        const registrationAttempts = registration.jumps[height]
        if (registrationAttempts.includes(true) || registration.finished) return current

        if (current === null) return registration

        const currentAttempts = current.jumps[height]
        if (registrationAttempts.length < currentAttempts.length) return registration

        return current
      },
      null as Registration | null
    )
  }, [competition, height])

  const addSuccess = useCallback(() => {
    if (registration === null) return
    addAttempt(registration.id, height, true)
  }, [registration, height, addAttempt])

  const addFail = useCallback(() => {
    if (registration === null) return
    addAttempt(registration.id, height, false)
  }, [registration, height, addAttempt])

  return {
    competitor: registration && registration.competitor,
    addSuccess,
    addFail,
  }
}

export default useCurrentCompetitor
