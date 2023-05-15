import React, { useCallback, useEffect, useState } from 'react'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { useDispatch, useSelector } from 'react-redux'

import { 
  getCalendarEvents, 
  getUserData, 
  setUserError, 
  setUserToken 
} from '../../model/user/actions/actions'
import { FormattedEventsItem } from '../../types/user/user'
import { State } from '../../types/commonTypes'
import { UserState } from '../../types/user/states'

import './index.scss'

const GoogleCalendar: React.FC = () => {
  const { 
    userToken, 
    userData, 
    calendarEvents,
    isLoadingCalendar 
  } = useSelector((state: State): UserState => state.userReducer)
  const dispatch = useDispatch()

  const handleLogin = useGoogleLogin({
    onSuccess: (response) => {
      dispatch(setUserToken(response))
    },
    onError: (error) => dispatch(setUserError(`Login Failed: ${error}`))
  })

  const handleLogout = () => {
    googleLogout()
    // dispatch(setUserProfile(null))
  }

  useEffect(() => {
    if (userToken && userToken.access_token && !userData) {
      dispatch(getUserData(userToken.access_token))
    }

    if (userToken && userToken.access_token && userData) {
      dispatch(getCalendarEvents(userToken.access_token))
    }
  }, [dispatch, userData, userToken])

  console.log({ userToken, userData, calendarEvents })

  return (
    <>
      <button onClick={() => handleLogin()}>
        Sign In
      </button>
      {calendarEvents && calendarEvents.length && <section className='events-container'>
        {calendarEvents.map((item: FormattedEventsItem) => (
          <section className='events-item' key={item.id}>
            <p>{item.title}</p>
            <p>{item.start}</p>
            <p>{item.end}</p>
          </section>
        ))}
      </section>}
    </>
  )
}

export default GoogleCalendar