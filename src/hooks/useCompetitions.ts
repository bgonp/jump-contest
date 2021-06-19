import { useCallback, useEffect, useState } from 'react'

import { Competition } from 'models'
import { createCompetition, fetchCompetitions } from 'use-cases'

const useCompetitions = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [competitions, setCompetitions] = useState<Competition[]>([])

  const count = competitions.length
  const noCompetitions = competitions.length === 0
  const lastCompetition = noCompetitions ? null : competitions[count - 1]

  const addCompetition = useCallback(async (name: string, date: Date) => {
    setIsLoading(true)
    await createCompetition(name, date)
    setCompetitions(await fetchCompetitions())
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchCompetitions().then(competitions => {
      setCompetitions(competitions)
      setIsLoading(false)
    })
  }, [])

  return {
    isLoading,
    competitions,
    lastCompetition,
    noCompetitions,
    addCompetition,
  }
}

export default useCompetitions
