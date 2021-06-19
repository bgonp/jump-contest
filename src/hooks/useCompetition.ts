import { useCallback, useEffect, useMemo, useState } from 'react'

import { Competition } from 'models'
import {
  closeCompetition,
  createAttempt,
  createHeight,
  createRegistration,
  finishCompetition,
  listenCompetition,
  passHeight,
  removeLastAttempt,
  removeLastHeight,
  removeRegistration,
} from 'use-cases'

const useCompetition = () => {
  const [id, setId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [competition, setCompetition] = useState<Competition | null>(null)
  const [lastRegistrationId, setLastRegistrationId] = useState<string | null>(null)
  const [lastHeight, setLastHeight] = useState<number | null>(null)

  const setCompetitionId = useCallback((newId: string) => {
    if (newId === id) return
    setIsLoading(true)
    setId(newId)
    setCompetition(null)
  }, [id])

  const addAttempt = useCallback((
    registrationId: string,
    height: number,
    success: boolean
  ) => {
    if (competition === null) return
    setIsLoading(true)
    createAttempt(competition, registrationId, height, success)
    setLastRegistrationId(registrationId)
    setLastHeight(height)
  }, [competition])

  const passAttempt = useCallback((registrationId: string, height: number) => {
    if (competition === null) return
    setIsLoading(true)
    passHeight(competition, registrationId, height)
    setLastRegistrationId(registrationId)
    setLastHeight(height)
  }, [competition])

  const deleteLastAttempt = useCallback(() => {
    if (competition === null || !lastRegistrationId || !lastHeight) return
    setIsLoading(true)
    removeLastAttempt(competition, lastRegistrationId, lastHeight)
  }, [competition, lastRegistrationId, lastHeight])

  const addHeight = useCallback((height: number) => {
    if (competition === null) return
    setIsLoading(true)
    createHeight(competition, height)
  }, [competition])

  const deleteLastHeight = useCallback(() => {
    if (competition === null || competition.heights.length === 0) return
    setIsLoading(true)
    removeLastHeight(competition)
  }, [competition])

  const addRegistration = useCallback((
    name: string,
    surname: string,
    clubId: number | null,
    birthDate: Date | null,
    email: string | null
  ) => {
    if (competition === null) return
    setIsLoading(true)
    createRegistration(competition, name, surname, clubId, birthDate, email)
  }, [competition])

  const deleteRegistration = useCallback((registrationId: string) => {
    if (competition === null || competition.closed) return
    setIsLoading(true)
    removeRegistration(competition, registrationId)
  }, [competition])

  const close = useCallback(() => {
    if (competition === null) return
    setIsLoading(true)
    closeCompetition(competition)
  }, [competition])

  const finish = useCallback(() => {
    if (competition === null) return
    setIsLoading(true)
    finishCompetition(competition)
  }, [competition])

  const rankedRegistrations = useMemo(() => {
    if (!competition || !competition.finished) return []
    return ([...competition.registrations]).sort(
      (a, b) => (a.rank ?? 0) - (b.rank ?? 0)
    )
  }, [competition])

  useEffect(() => {
    if (id === null) return
    const unsubscribe = listenCompetition(id, (competition) => {
      setCompetition(competition)
      setIsLoading(false)
    })
    return unsubscribe
  }, [id])

  return {
    isLoading,
    competition,
    rankedRegistrations,
    setCompetitionId,
    addAttempt,
    deleteLastAttempt,
    passAttempt,
    addHeight,
    deleteLastHeight,
    addRegistration,
    deleteRegistration,
    close,
    finish,
  }
}

export default useCompetition
