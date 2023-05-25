import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Empty } from 'antd'
import classNames from 'classnames'

import { getCalendarEvents } from '../../model/calendar/actions/actions'
import { State } from '../../types/commonTypes'
import { UserState } from '../../types/calendar/states'

import './index.scss'

const CalendarEvents: React.FC = () => {
  const {
    userToken,
    userData,
    calendarEvents,
    isCalendarLoading,
    userError
  } = useSelector((state: State): UserState => state.userReducer)

  const dispatch = useDispatch()

  const emptyEventsDescription = useMemo(() => {
    if (userError) return `${userError}`
    if (!userData) return 'You need to sign in to see your calendar events'
    if (isCalendarLoading) return 'Loading events...'
    if (!calendarEvents?.length) return 'No upcoming events'
  }, [
    userData,
    isCalendarLoading,
    calendarEvents?.length,
    userError
  ])

  const handleUpdateCalendarEvents = (): void => {
    if (userToken) {
      dispatch(getCalendarEvents(userToken?.access_token))
    }
  }

  return (
    <section className={classNames('events-container', !calendarEvents?.length && 'justify-content-center')}>
      {!calendarEvents?.length && <Empty description={emptyEventsDescription} />}
      {calendarEvents?.length
        ? <>
          <section className='events-header'>
            <h3>
              <i className="fa-solid fa-calendar-days" />
              Upcoming events
            </h3>
            <button onClick={handleUpdateCalendarEvents} />
          </section>
          {calendarEvents.map(item => (
            <p className='events-item' key={item.id}>
              <span>
                <b>{item.time}</b>
                <br />
                {item.date}
              </span>
              <span className='event-title'>{item.title}</span>
            </p>))}
        </>
        : ''}
    </section>
  )
}

export default CalendarEvents