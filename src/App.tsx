import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'

import HomePage from './pages/Home/HomePage'

import { getUserLocation } from './helpers/requests/weather/weather'
import { setIsLoading, setInputCityValue } from './model/weather/actions/actions'

const App: React.FC = () => {
  const dispatch: Dispatch = useDispatch()

  const fetchUserLocation = useCallback(async (): Promise<void> => {
    try {
      dispatch(setIsLoading(true))
      const userLocation: string = await getUserLocation()
      dispatch(setInputCityValue(userLocation))
      dispatch(setIsLoading(false))
    } catch (error: any) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(setIsLoading(true))

    const timer = setTimeout(() => fetchUserLocation(), 500)

    return () => clearTimeout(timer)
  }, [fetchUserLocation, dispatch])

  return (
    <HomePage />
  )
}

export default App