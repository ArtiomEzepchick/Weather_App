import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Empty } from 'antd'
import classNames from 'classnames'

import { State } from '../../types/commonTypes'
import { UserState } from '../../types/calendar/states'

import './index.scss'

type Props = {
  handleUpdateCalendarEvents: React.MouseEventHandler<HTMLButtonElement>;
}

const CalendarEvents: React.FC<Props> = ({ handleUpdateCalendarEvents }) => {
  const {
    userData,
    calendarEvents,
    isCalendarLoading,
    userError
  } = useSelector((state: State): UserState => state.userReducer)

  const emptyEventsDescription = useMemo((): string | null => {
    if (userError) return `${userError}`
    if (!userData) return 'You need to sign in to see your calendar events'
    if (isCalendarLoading) return 'Loading events...'
    if (!calendarEvents?.length) return 'No upcoming events'

    return null
  }, [
    userData,
    isCalendarLoading,
    calendarEvents?.length,
    userError
  ])

  return (
    <section className={classNames('events-container', !calendarEvents?.length && 'justify-content-center')}>
      {!calendarEvents?.length && <Empty description={emptyEventsDescription} />}
      {calendarEvents?.length && <>
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
                {item.time}
                <br />
                <b>{item.date}</b>
              </span>
              <span className='event-title'>{item.title}</span>
            </p>))}
        </>}
    </section>
  )
}

export default CalendarEvents