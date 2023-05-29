import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Empty } from 'antd'
import classNames from 'classnames'

import { State } from '../../types/commonTypes'
import { UserState } from '../../types/calendar/states'

import './index.scss'

type Props = {
  isLoading: boolean;
  handleUpdateCalendarEvents: React.MouseEventHandler<HTMLButtonElement>;
}

const CalendarEvents: React.FC<Props> = ({ isLoading, handleUpdateCalendarEvents }) => {
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
    <section className={classNames('events-container', !calendarEvents?.length && 'justify-center')}>
      {!calendarEvents?.length && <Empty description={emptyEventsDescription} />}
      {calendarEvents?.length && <>
        <section className='events-header'>
          <h3>
            <i className="fa-solid fa-calendar-days" />
            Upcoming events
          </h3>
          <button onClick={handleUpdateCalendarEvents} disabled={isLoading}/>
        </section>
        <section className='events-items'>
          {calendarEvents.map(item => (
            <p className='events-item' key={item.id}>
              <span>
                <b>{item.date}</b>
                <br />
                {item.startTime}-{item.endTime}
              </span>
              <span className='event-title'>
                {item.title}
              </span>
            </p>))}
        </section>
      </>}
    </section>
  )
}

export default CalendarEvents