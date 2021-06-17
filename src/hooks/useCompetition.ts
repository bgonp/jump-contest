import { useCallback, useEffect, useState } from 'react'

import { Competition } from 'models'
import {
  closeCompetition,
  createAttempt,
  createHeight,
  createRegistration,
  finishCompetition,
  listenCompetition,
  removeLastAttempt,
  removeLastHeight,
  removeRegistration,
} from 'use-cases'

const useCompetition = () => {
  const [id, setId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [competition, setCompetition] = useState<Competition | null>(null)

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
  }, [competition])

  const deleteLastAttempt = useCallback((registrationId: string, height: number) => {
    if (competition === null) return
    setIsLoading(true)
    removeLastAttempt(competition, registrationId, height)
  }, [competition])

  const addHeight = useCallback((height: number) => {
    if (competition === null) return
    setIsLoading(true)
    createHeight(competition, height)
  }, [competition])

  const deleteLastHeight = useCallback(() => {
    if (competition === null) return
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
    if (competition === null) return
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
    setCompetitionId,
    addAttempt,
    deleteLastAttempt,
    addHeight,
    deleteLastHeight,
    addRegistration,
    deleteRegistration,
    close,
    finish,
  }
}

export default useCompetition
