import { nanoid } from "nanoid"
import moment from "moment"

import { FormattedEventsItem } from "../../../types/calendar/user"

export const formatEvents = (list: gapi.client.calendar.Event[]): FormattedEventsItem[] => {
    return list.map((item): FormattedEventsItem => ({
        id: nanoid(),
        title: item.summary ? item.summary : 'No title',
        time: moment(item.start.dateTime || item.start.date).format('HH:mm'),
        date: moment(item.start.dateTime || item.start.date).format('DD.MM.YY')
    }))
}