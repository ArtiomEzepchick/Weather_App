import { nanoid } from "nanoid"

import { FormattedEventsItem } from "../../types/user/user"

export const formatEvents = (list: gapi.client.calendar.Event[]): FormattedEventsItem[] => {
    return list.map((item: gapi.client.calendar.Event): FormattedEventsItem => ({
        id: nanoid(),
        title: item.summary,
        start: item.start.dateTime || item.start.date,
        end: item.end.dateTime || item.end.date
    }))
}