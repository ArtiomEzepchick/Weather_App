import React, { useCallback, useEffect, useState } from 'react'

import useGoogleCalendarAPI from '../../hooks/useGoogleCalendarAPI'
import { setIsLoading } from '../../model/weather/actions/actions'

import './index.scss'

interface EventsItem {
  id: string
  title: string
  start: string
  end: string
}

type Props = {
  isLoading: boolean
}

const GoogleCalendar: React.FC<Props> = ({ isLoading }) => {
  const [events, setEvents] = useState<EventsItem[]>([])
  const {
    handleSignIn,
    handleSignOut
  } = useGoogleCalendarAPI(setEvents)

  return (
    <>
      {!events.length && <button onClick={handleSignIn}>
        Sign In
      </button>}
      {events.length && <button onClick={handleSignOut}>
        Sign Out
      </button>}
      {events.length && <section className='events-container'>
        {events.map(item => (
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