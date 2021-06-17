import { useCallback, useEffect, useState } from 'react'

import { Competition } from 'models'
import { createCompetition, fetchCompetitions } from 'use-cases'

const useCompetitions = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [competitions, setCompetitions] = useState<Competition[]>([])

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
    addCompetition,
  }
}

export default useCompetitions
