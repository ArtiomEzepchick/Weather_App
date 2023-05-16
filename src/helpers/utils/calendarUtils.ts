import { nanoid } from "nanoid"
import moment from "moment"

import { FormattedEventsItem } from "../../types/user/user"

export const formatEvents = (list: gapi.client.calendar.Event[]): FormattedEventsItem[] => {
    return list.map((item: gapi.client.calendar.Event): FormattedEventsItem => ({
        id: nanoid(),
        title: item.summary ? item.summary : 'No title',
        time: moment(item.start.dateTime || item.start.date).format('HH:mm'),
        date: moment(item.start.dateTime || item.start.date).format('DD.MM.YY')
    }))
}